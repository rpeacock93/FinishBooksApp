import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableHighlight,
  AsyncStorage,
  Image
} from 'react-native';

export default class UserBooks extends Component {
  constructor(){
    super();
    let ds = new ListView.DataSource({rowHasChanged:(r1, r2) => r1 != r2});
    this.state = {
      projDataSource: ds
    }

    this.renderRow = this.renderRow.bind(this);
  }

  componentWillMount(){
    this.getSchedule()
  }

  componentDidMount(){
    this.getSchedule()
  }

  httpToHttps(text){
    return text.toString().replace("http", "https");
  }

  getSchedule(){

    AsyncStorage.getItem('books').then((value) => {
      if(value == undefined) {
        console.log("No Projects")
      } else {
        let books = JSON.parse(value)
        this.setState({
          projDataSource: this.state.projDataSource.cloneWithRows(books)
        });
      }
      
    })

    
  }

  pressRow(project){
    this.props.navigation.push('BookDetail', {project: project})
  }

  pressButton(){
    this.props.navigation.navigate('SearchBooks')
  }

  renderRow(project){
    var imageURI = (typeof project.book.volumeInfo.imageLinks !== 'undefined') ? project.book.volumeInfo.imageLinks.thumbnail : 'http://www.epl.ca/wp-content/themes/bibliocommons/images/icon-book.png'
    return (
      <TouchableHighlight onPress={() => {
        this.pressRow(project);
      }}
      >
        <View style={styles.row}>
        <Image 
          style={{width: 80, height: 100, padding: 10}}
          source={{uri: this.httpToHttps(imageURI)}}/>
          <Text style={styles.textTitle}>{project.book.volumeInfo.title}</Text>
          <Text style={styles.text}>End: {project.endDate}</Text>
          <Text style={styles.text}>Pages Left: {project.pagesLeft}</Text>
        </View>
      </TouchableHighlight>
    )
  }

  render() {
    return (
    <View style={styles.container}>
      <ListView
      enableEmptySections={true}
        dataSource={this.state.projDataSource}
        renderRow={this.renderRow}
      />
      <TouchableHighlight onPress={() => {
        this.pressButton()
      }}
      style={styles.btn}>
        <Text style={styles.textBtn}>Add Book</Text>
      </TouchableHighlight>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20
  },
  row: {
    flexDirection:'row',
    // justifyContent: 'center',
    padding:12,
    backgroundColor:'white',
    marginBottom: 3
  },
  text: {
    flex:1,
    padding: 3,
    fontSize: 14
  },
  textTitle: {
    flex:1,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 16,
    fontStyle: 'italic',
  },
  btn: {
    alignSelf: 'stretch',
    backgroundColor: "#ffa544",
    padding: 10,
    margin: 5,
    alignItems: 'center',
  }
});