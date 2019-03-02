import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import * as firebase from 'firebase'
import { StackActions, NavigationActions } from 'react-navigation'
import Input from '../components/Input'
import Button from '../components/Button'

export default class LoginScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      loading: false
    }
  }

  static navigationOptions = ({ navigation }) => ({
    title: 'Log in'
  })

  OnPress = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(i => {
        console.log('iii', i)
        alert('congratulation')
      })
      .catch(e => alert(e))
  }

  OnPressSignUp = () => {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'SignUp' })]
    })
    this.props.navigation.dispatch(resetAction)
  }

  render () {
    return (
      <View style={styles.container}>
        <Input
          placeholder='email'
          onChangeText={i => this.setState({ email: i })}
        />
        <Input
          placeholder='password'
          onChangeText={i => this.setState({ password: i })}
        />
        <Button
          title='Login'
          buttonStyle={styles.loginButton}
          textStyle={styles.loginText}
          onPress={this.OnPress}
        />
        <Button
          title='SignUp'
          buttonStyle={styles.signupButton}
          onPress={this.OnPressSignUp}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    marginHorizontal: 20,
    marginTop: '20%'
  },
  loginButton: {
    backgroundColor: 'yellow',
    marginTop: 24
  },
  signupButton: {
    backgroundColor: 'green'
  }
})
