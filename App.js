
import React, { Component } from 'react';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';

import { StackNavigator } from 'react-navigation'
import Login from './app/components/Login'
import OldUserBooks from './app/components/OldUserBooks'
import BookDetail from './app/components/BookDetail'
import SearchBooks from './app/components/SearchBooks'
import MakeSchedule from './app/components/MakeSchedule'
import UserBooks from './app/components/UserBooks'
import UpdateProgress from './app/components/UpdateProgress'
import TempPage from'./app/components/TempPage'
import SignUp from './app/components/SignUp'
import LoginNew from './app/components/LoginNew'




const Application = StackNavigator({
  Home: { screen: UserBooks},
  OldUserBooks: {screen: OldUserBooks},
  SearchBooks: {screen: SearchBooks},
  BookDetail: {screen: BookDetail},
  MakeSchedule: {screen: MakeSchedule},
  UserBooks: {screen: UserBooks},
  UpdateProgress: {screen: UpdateProgress},
  TempPage: {screen: TempPage},
  SignUp: {screen: SignUp},
  LoginNew: {screen:LoginNew}

  }, {
    navigationOptions: {
      header: null
    }
  }
)

export default class App extends Component {
  render() {
    return (
        <Application />
    );
  }
}


