import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  Linking,
  ScrollView
} from 'react-native';


export default class BookDetials extends Component{

    constructor(props) {
        super(props)
        this.state = {
            book: this.props.navigation.state.params.book
        }
    }

    goBack() {
      this.props.navigator.pop()
    }

    buttonPress(link) {
        Linking.canOpenURL(link).then(supported => {
          if(supported) {
            Linking.openURL(link)
          } else {
            alert('Can Not Go To Link')
          }
        })
    }

  render() {
    return (
    <ScrollView>
      <View style={styles.detailsContainer}>
      <Button
        title="Go Back"
        color="#666666"
        onPress={this.goBack.bind(this)}
      />
      <Image
        style={{width: 350, height: 200}}
        source={{uri: this.state.book.volumeInfo.imageLinks.smallThumbnail}}
      />
      <View style={styles.titles}>
        <Text style={styles.title}>
            {this.state.book.volumeInfo.title}
        </Text>
        <Text style={styles.title}>
            {this.state.book.volumeInfo.subtitle}
        </Text>
      </View>
      <View style={styles.body}>
        <Text numberOfLines={10} style={styles.description}>{this.state.book.volumeInfo.description}</Text>
        <Text style={styles.info}>Publisher: {this.state.book.volumeInfo.publisher}</Text>
        <Text style={styles.info}>Publish Date: {this.state.book.volumeInfo.publishedDate}</Text>
        <Text style={styles.info}>Page Count: {this.state.book.volumeInfo.pageCount}</Text>
        <Text style={styles.info}>Average Rating: {this.state.book.volumeInfo.averageRating}</Text>
        <Button
        onPress={() => this.buttonPress(this.state.book.volumeInfo.previewLink)}
        title="Preview Book"
        color="#841584"
        />
      </View>
      </View>
    </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  detailsContainer: {
    padding: 30
  },
  titles: {
    backgroundColor: "#666666",
    padding: 10,
    marginBottom: 10
  },
  title: {
    color: 'white'
  },
  description: {
    marginBottom: 10
  },
  info: {
    padding: 5,
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: '#333333',
    color: '#ffffff'
  }
});
