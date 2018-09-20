
import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  AsyncStorage
} from 'react-native'

export default class SignUp extends Component{

  constructor(props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
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
            <Text style={styles.header2}>- Sign Up -</Text>
            <TextInput 
              style={styles.textInput} placeholder='First Name'
              onChangeText={ (firstName) => this.setState({firstName}) }
              underlineColorAndroid='transparent'
              />
            <TextInput 
              style={styles.textInput} placeholder='Last Name'
              onChangeText={ (lastName) => this.setState({lastName}) }
              underlineColorAndroid='transparent'
              />
            <TextInput 
              style={styles.textInput} placeholder='Your Email Address'
              onChangeText={ (email) => this.setState({email}) }
              underlineColorAndroid='transparent'
            />
            <TextInput 
              style={styles.textInput} placeholder='Password'
              onChangeText={ (password) => this.setState({password}) }
               secureTextEntry={true} underlineColorAndroid='transparent'
              />

            <TouchableOpacity
              style={styles.btn}
              onPress={this.signUp}>
              <Text>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity
            onPress={this.logIn}
            >
              <Text style={styles.signup}>Have an Account? Login</Text>
            </TouchableOpacity>
        </View>
       </KeyboardAvoidingView>
    )
  }

  signUp = () => {

    //this.props.navigation.navigate('UserBooks')

    fetch('https://finishbooks.herokuapp.com/api/Users/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.state.email.toLocaleLowerCase(),
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        username: this.state.email.toLowerCase(),
        password: this.state.password,

      })
    })

    //.then(response => response.JSON())
    .then(response => response.text())
    .then(JSON.parse)
    .then(res => {
      //this.props.navigation.navigate('UserBooks')

        if (!res.error) {
          //AsyncStorage.setItem('token', res.userId)
          alert("Thanks for signing up! Now its time to login.");
          this.props.navigation.navigate('Home');
        }
        else {
           alert("Error: " + res.error.message);
         }
     })
     .done();
}

logIn = () => {

  this.props.navigation.navigate('Home')

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
    backgroundColor: '#008CB2',
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


