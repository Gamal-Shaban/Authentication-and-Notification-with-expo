import React, { Component } from 'react'
import { View, Button, TextInput, StyleSheet } from 'react-native'
import * as firebase from 'firebase'
import { StackActions, NavigationActions } from 'react-navigation';
import Input from '../components/Input'
export default class SignupScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      loading: false
    }
    
  }

  OnPress = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(i => {
        console.log('iii', i)
        alert('congratulation')
      })
      .catch(e => alert(e))
  }

  OnPressBackToLogin = () =>{
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'Login' })],
    });
    this.props.navigation.dispatch(resetAction);
  }

  render () {
    return (
      <View>
        <Input
          onChangeText={i => this.setState({ email: i })}
          
        />
        <Input
          onChangeText={i => this.setState({ password: i })}
        />
        <Button title='SignUP' onPress={this.OnPress} />
        <Button title='Back To Login' onPress={this.OnPressBackToLogin} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  input: {
    height: 30,
    alignSelf: 'stretch',
    backgroundColor: 'yellow',
    color: 'red',
    margin: 20
  }
})
