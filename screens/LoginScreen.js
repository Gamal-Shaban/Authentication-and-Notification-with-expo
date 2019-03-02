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
    title: 'Log in',
    headerStyle: {
      backgroundColor: 'white'
    },
    headerTitleStyle: {
      fontWeight: '400'
    }
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
          onChangeText={i => this.setState({ email: i })}
        />
        <Input
          onChangeText={i => this.setState({ password: i })}
        />
        <Button title='Login' onPress={this.OnPress} />
        <Button title='SignUp' onPress={this.OnPressSignUp} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
