
import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  AsyncStorage,
  Image
} from 'react-native'

import { Container, Header, Content, Input, Item } from 'native-base';
export default class Login extends Component{

  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
    }
  }

  componentDidMount() {
    this._loadInitialState().done()
  }

  _loadInitialState = async () => {
    var value = await AsyncStorage.getItem('user')
    if (value !== null) {
      this.props.navigation.navigate('Library')
  }
}

  render() {
    return (
       <KeyboardAvoidingView  style={styles.wrapper}>
        <View style={styles.container}>
            <Image 
            // source={require('../Images/2.png')}
            // style={{width: 365, height: 92}}
            // source={require('../Images/finishbs.png')}
            // source={require('../Images/finishw.png')}
            // style={{width: 348, height: 134}}
            source={require('../Images/logo3.png')}
            style={{width: 326, height: 100}}
            
            />
            <Text style={styles.header2}>~ LOGIN ~</Text>
            <TextInput 
              style={styles.textInput} placeholder='Email'
              onChangeText={ (username) => this.setState({username}) }
              underlineColorAndroid='transparent'
              />
            <TextInput 
              style={styles.textInput} placeholder='Password'
              onChangeText={ (password) => this.setState({password}) }
               secureTextEntry={true} underlineColorAndroid='transparent'
              />

            <TouchableOpacity
              style={styles.btn}
              onPress={this.login}>
              <Text>Log in</Text>
            </TouchableOpacity>
            <TouchableOpacity
            onPress={this.signup}
            >
              <Text style={styles.signup}>No Account? Sign Up</Text>
            </TouchableOpacity>
        </View>
       </KeyboardAvoidingView>
    )
  }

  login = () => {

   //this.props.navigation.navigate('SearchBooks')


    fetch('https://finishbooks.herokuapp.com/api/Users/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: this.state.username.toLowerCase(),
        password: this.state.password,
      })
    })

    //.then(response => response.JSON())
    .then(response => response.text())
    .then(JSON.parse)
    .then(res => {
      //this.props.navigation.navigate('UserBooks')

        if (res.userId) {
          
          //AsyncStorage.setItem('token', res.userId)
          this.props.navigation.navigate('UserBooks')
        }
        else {
           alert("Incorrect Username or password");
         }
     })
     .done();
  }

//}

signup = () => {

  this.props.navigation.navigate('SignUp')

}

}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2F8EB2',
    paddingLeft: 40,
    paddingRight: 40,
  },
  header1: {
    fontSize: 40,
    marginBottom: 40,
    color: '#fff',
    fontWeight: 'bold',
  },
  header2: {
    fontSize: 24,
    marginBottom: 50,
    color: '#fff',
    fontWeight: 'bold',
  },
  textInput: {
    alignSelf: 'stretch',
    padding: 8,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  btn: {
    alignSelf: 'stretch',
    backgroundColor: "#ffa544",
    padding: 10,
    margin: 5,
    alignItems: 'center',
  },
  signup: {
    padding: 40,
    color: 'white'
  }

})


