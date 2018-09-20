import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  AsyncStorage,
  TouchableOpacity
} from 'react-native';

export default class UpdateProgress extends Component {
  constructor(props) {
    super(props)
    this.state = {
        id: this.props.navigation.state.params.project.id,
        book: this.props.navigation.state.params.project.book,
        dailyGoal: this.props.navigation.state.params.project.dailyGoal,
        daysWeek: this.props.navigation.state.params.project.daysWeek,
        endDate: this.props.navigation.state.params.project.endDate,
        onPage: this.props.navigation.state.params.project.onPage,
        pagesLeft: this.props.navigation.state.params.project.pagesLeft,
        beforeUpdate: this.props.navigation.state.params.onPage,
        updateValidate: true
    }
  }

  validate(text) {
    var limit = this.state.book.volumeInfo.pageCount
    num=/^[0 - {limit}]/
    if (num.test(text)) {
      this.setState({
        updateValidate: true,
      })

    } else {

      this.setState({
        updateValidate: false,
      })

    }
  }

  addDays(days) {
    var today = new Date();
    today.setDate(today.getDate() + days)
    date=parseInt(today.getMonth()+1) + "/" + today.getDate() + "/"+ today.getFullYear();
    return date;
  }

  onSubmit() {
        AsyncStorage.getItem('books').then((value) => {
            let books = JSON.parse(value)

            for(let i = 0; i < books.length; i++) {
                if(books[i].id == this.state.id) {
                    books.splice(i, 1)
                }

            }
            var left = Number.parseInt(this.state.book.volumeInfo.pageCount, 10) - Number.parseInt(this.state.onPage, 10)
            var pagesPerWeek = Number.parseInt(this.state.dailyGoal, 10) * Number.parseInt(this.state.daysWeek, 10)
            var pagesRead = this.state.pagesLeft - left
            if (left == 0 ) {
              alert('You Finished A Book!')
            }
            else if (pagesRead == Number.parseInt(this.state.dailyGoal, 10)) {
              alert('You reached your goal!')
            }
            else if(pagesRead > Number.parseInt(this.state.dailyGoal, 10)) {
              alert('You went above your goal!')
            }
            else {
              alert("You're under your goal. Any progress counts!")
            }
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
        })
  }

  render() {
    return (
      <View style={styles.addForm}>
      <Text style={styles.date}>Today: {this.addDays(0)}</Text>
        <Text style={styles.text}>Stopped on Page: </Text>
          <TextInput 
          placeholder={this.state.onPage}
          onChangeText = {(value) => this.validate({onPage:value})}
          style={[styles.textIn, !this.state.updateValidate ? styles.error:null]}
          selectionColor={'white'}
          /> 
          <View style={styles.submit}>
            <TouchableOpacity
              style={styles.btn}
              onPress={this.onSubmit.bind(this)}>
              <Text>Submit</Text>
            </TouchableOpacity>
            </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  addForm: {
    backgroundColor: "#2F8EB2",
    padding: 20
  },
  date: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    paddingBottom: 10,
  },
  btn: {
    alignSelf: 'stretch',
    backgroundColor: "#ffa544",
    padding: 10,
    margin: 5,
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 15
  },
  textIn: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'stretch',
    padding: 8,
    marginBottom: 20,
    marginTop: 15,
    backgroundColor: "#fff",
  },
  error: {
    borderWidth: 2,
    borderColor: 'red'
  },
});

