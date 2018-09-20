import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  AsyncStorage,
  Image
} from 'react-native';

export default class BookDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.navigation.state.params.project.id,
            book: this.props.navigation.state.params.project.book,
            dailyGoal: this.props.navigation.state.params.project.dailyGoal,
            daysWeek: this.props.navigation.state.params.project.daysWeek,
            endDate: this.props.navigation.state.params.project.endDate,
            onPage: this.props.navigation.state.params.project.onPage,
            pagesLeft: this.props.navigation.state.params.project.pagesLeft
        }

    }
    onEdit() {
        let book = {
            id: this.state.id,
            book: this.state.book,
            dailyGoal: this.state.dailyGoal,
            daysWeek: this.state.daysWeek,
            endDate: this.state.endDate,
            onPage: this.state.onPage,
            pagesLeft: this.state.pagesLeft
        }

        this.props.navigation.push('UpdateProgress', {project: book})
    }

    httpToHttps(text){
        return text.toString().replace("http", "https");
      }

    onDelete() {
        AsyncStorage.getItem('books').then((value) => {
            let books = JSON.parse(value)

            for(let i = 0; i < books.length; i++) {
                if(books[i].id == this.state.id) {
                    books.splice(i, 1)
                }
            }
            AsyncStorage.setItem('books', JSON.stringify(books))

            this.props.navigation.push('UserBooks')
        })

    }

    goBack() {
        this.props.navigation.push('UserBooks')
    }
    
  render() {
    var imageURI = (typeof this.state.book.volumeInfo.imageLinks !== 'undefined') ? this.state.book.volumeInfo.imageLinks.thumbnail : 'http://www.epl.ca/wp-content/themes/bibliocommons/images/icon-book.png'
    return (
      <View style={styles.container}>
      <Text style={styles.endDate} onPress={this.goBack.bind(this)}>Back</Text>
      <Image
      style={{width: 150, height: 190, alignSelf: 'center', padding: 10}}
      source={{uri: this.httpToHttps(imageURI)}}/>
        <View style={styles.info}>
            <Text style={styles.text}>Pages: {this.state.book.volumeInfo.pageCount}</Text>
            <Text style={styles.text}>Daily Page Goal: {this.state.dailyGoal}</Text>
            <Text style={styles.text}>Days Per Week: {this.state.daysWeek}</Text>
            <Text style={styles.text}>On Page: {this.state.onPage}</Text>
            <Text style={styles.text}>Pages Left: {this.state.pagesLeft}</Text>
            <Text style={styles.endDate}>End Date: {this.state.endDate}</Text>
        </View>
        <TouchableOpacity 
        style={styles.btn}
        onPress={this.onEdit.bind(this)}>
        <Text>Update Progress</Text>
        </TouchableOpacity>
        <TouchableOpacity 
        style={styles.btn}
        onPress={this.onDelete.bind(this)}>
        <Text>Delete Schedule</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
      padding: 15,
      backgroundColor: '#2F8EB2'
  },
  text: {
      color: 'black',
      textAlign: 'center'
  },
  endDate: {
     backgroundColor: '#333333',
     color: 'white',
     padding: 5,
     textAlign: 'center',
     margin: 10
  },
  btn: {
    alignSelf: 'stretch',
    backgroundColor: "#ffa544",
    padding: 10,
    margin: 5,
    alignItems: 'center',
  },
  title: {
      fontSize: 20,
      textAlign: 'center',
      color: 'black',
      fontWeight: 'bold',
      padding: 10
  }
});

