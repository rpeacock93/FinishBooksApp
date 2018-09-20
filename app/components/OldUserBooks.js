import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  AsyncStorage,
  ToastAndroid,
} from 'react-native'

export default class OldUserBooks extends Component {
  constructor() {
    super() 
    this.state = {
      dataSource: [],
      isLoading: true
    }
  }
  renderItem = ({ project }) => {
    return(
      <TouchableOpacity style={{ flex: 1, flexDirection: 'row', marginBottom: 3}}
        onPress={this.BookPage}>
        <Image style= {{width: 50, height: 80, margin: 5}}
          source={{ uri: project.thumbnail}} />
        <View style={{ flex: 1, justifyContent: 'center', marginLeft: 5}}>
          <Text style={{ fontSize: 16, color: 'black', marginBottom: 15}}>
            {project.title}
          </Text>
          <Text style={{ fontSize: 14, color: 'grey'}}>
            {project.subtitle}
          </Text>
        </View>
        </TouchableOpacity>
    )
  }

  renderSeparator = () => {
    return (
      <View 
        style={{ height: 1, width: '100%', backgroundColor: 'black'}}>
      </View>
    )
  }

  componentDidMount() {
    AsyncStorage.getItem('books').then((value) => {
      if(value == undefined) {
        console.log("No Projects")
      } else {
        let books = JSON.parse(value)
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(books)
        });
      }
      
    })
  }

  BookPage = (project) => {
    this.props.navigation.navigate('BookDetail', {project: project})
  }

  newBook = () => {
    this.props.navigation.navigate('SearchBooks')
  }

  render() {
    return (
      this.state.isLoading
      ?
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#330066" animating />
      </View>
      :
      <View style={{flex: 1, backgroundColor: '#F5FCFF' }}>
        <FlatList
          data={this.state.dataSource}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index}
          ItemSeparatorComponent={this.renderSeparator}
        />
      <TouchableOpacity
              style={styles.btn}
              onPress={this.newBook}>
              <Text>Add Book</Text>
            </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  btn: {
    alignSelf: 'stretch',
    backgroundColor: "#01c853",
    padding: 20,
    alignItems: 'center',
  }
})





