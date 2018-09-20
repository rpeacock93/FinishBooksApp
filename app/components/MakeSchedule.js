import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  AsyncStorage,
  Image
} from 'react-native';

export default class MakeSchedule extends Component {
  constructor(props) {
    super(props)
    this.state = {
        id:'',
        book: this.props.navigation.state.params.book,
        dailyGoal: '',
        daysWeek: '',
        endDate: this.addDays(0),
        onPage: '0',
        pagesLeft: '0',
        books: []
    }
  }

   addDays(days) {
    var today = new Date();
    today.setDate(today.getDate() + days)
    date=parseInt(today.getMonth()+1) + "/" + today.getDate() + "/"+ today.getFullYear();
    return date;
  }

  componentDidMount() {
    this.getBooks()
    this.generateId()
  }

  getBooks() {
    AsyncStorage.getItem('books').then((value) => { 
      console.log(value)
      if(value != undefined) {
        this.setState({books: JSON.parse(value)})
      }
    })
  }

  generateId() {
    let id = Math.floor(Math.random() * 1000000000)
    this.setState({id})
  }


  httpToHttps(text){
    return text.toString().replace("http", "https");
  }

  onSubmit() {

    let books = this.state.books
    var left = Number.parseInt(this.state.book.volumeInfo.pageCount, 10) - Number.parseInt(this.state.onPage, 10)
    var pagesPerWeek = Number.parseInt(this.state.dailyGoal, 10) * Number.parseInt(this.state.daysWeek, 10)

    books.push({
        id: this.state.id,
        book: this.state.book,
        dailyGoal: this.state.dailyGoal,
        daysWeek: this.state.daysWeek,
        endDate: this.addDays((left / pagesPerWeek) * 7),
        onPage: this.state.onPage,
        pagesLeft: left
    })

    AsyncStorage.setItem('books', JSON.stringify(books))

    this.props.navigation.push('UserBooks')
  }

  render() {
    var imageURI = (typeof this.state.book.volumeInfo.imageLinks !== 'undefined') ? this.state.book.volumeInfo.imageLinks.thumbnail : 'http://www.epl.ca/wp-content/themes/bibliocommons/images/icon-book.png'
    return (
      <View style={styles.addForm}>
      <Image
        style={{width: 130, height: 165, alignSelf: 'center'}}
        source={{uri:  this.httpToHttps(imageURI)}}
      />
        <Text>
          {this.state.book.volumeInfo.title}
        </Text>
        <Text>
          {this.state.book.volumeInfo.authors[0]}
        </Text>
        <Text>
          {this.state.book.volumeInfo.pageCount}
        </Text>
          <TextInput 
          value={this.state.dailyGoal}
          placeholder="Daily Page Goal"
          onChangeText = {(value) => this.setState({dailyGoal:value})}
          /> 
          <TextInput 
          value={this.state.daysWeek}
          placeholder="Days Per Week"
          onChangeText = {(value) => this.setState({daysWeek:value})}
          /> 
          <Text>
          Starting on Page:
        </Text>
          <TextInput 
          value={this.state.onPage}
          placeholder={this.state.onPage}
          onChangeText = {(value) => this.setState({onPage:value})}
          /> 
          <View style={styles.submit}>
            <Button
              title="Submit"
              style={styles.btn}
              onPress={this.onSubmit.bind(this)}
            />
            </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  addForm: {
    backgroundColor: "#B0d4ff",
    padding: 20
  }
});

