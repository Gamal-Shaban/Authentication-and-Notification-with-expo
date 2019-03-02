import React, { Component } from 'react'
import { View, TextInput, StyleSheet } from 'react-native'
import * as firebase from 'firebase'
import Button from '../components/Button'
import { StackActions, NavigationActions } from 'react-navigation'
import Input from '../components/Input'
export default class SignupScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      loading: false
    }
  }
  static navigationOptions = ({ navigation }) => ({
    title: 'Sign Up'
  })

  OnPress = () => {
    if (this.state.password !== this.state.confirmPassword) {
      alert('password not matched')
    } else {
      this.setState({ loading: true })
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(i => {
          this.setState({ loading: false })
        })
        .catch(e => {
          this.setState({ loading: false })
          alert(e)
        })
    }
  }

  OnPressBackToLogin = () => {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'Login' })]
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
        <Input
          placeholder='confirm password'
          onChangeText={i => this.setState({ confirmPassword: i })}
        />
        <Button
          buttonStyle={styles.signup}
          title='SignUP'
          loading={this.state.loading}
          onPress={this.OnPress}
        />
        <Button
          buttonStyle={styles.backToLogin}
          title='Back To Login'
          onPress={this.OnPressBackToLogin}
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
  input: {
    height: 30,
    alignSelf: 'stretch',
    backgroundColor: 'yellow',
    color: 'red',
    margin: 20
  },
  signup: {
    backgroundColor: 'yellow'
  },
  backToLogin: {
    backgroundColor: 'green'
  }
})
