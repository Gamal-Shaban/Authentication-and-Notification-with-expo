import React from 'react'
import { ScrollView, StyleSheet, View, Alert } from 'react-native'
import { WebBrowser } from 'expo'
import * as firebase from 'firebase'
import registerForPushNotificationsAsync from './Service'
import Input from '../components/Input'
import Button from '../components/Button'

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  }
  constructor (props) {
    super(props)
    this.state = {
      changePasswordLoading: false,
      currentPassword: '',
      newPassword: '',
      newEmail: ''
    }
  }

  componentWillMount () {
    registerForPushNotificationsAsync()
  }

  signOut = () => {
    firebase
      .auth()
      .signOut()
      .catch(e => alert(e))
  }

  reauthenticate = currentPassword => {
    const user = firebase.auth().currentUser
    const cred = firebase.auth.EmailAuthProvider.credential(
      user.email,
      currentPassword
    )
    return user.reauthenticateWithCredential(cred)
  }

  changePassword = () => {
    if (
      this.state.newPassword.length < 1 ||
      this.state.currentPassword.length < 1
    ) {
      Alert.alert('empty input')
    } else {
      this.setState({ changePasswordLoading: true })
      this.reauthenticate(this.state.currentPassword)
        .then(() => {
          firebase
            .auth()
            .currentUser.updatePassword(this.state.newPassword)
            .then(res => {
              this.setState({ changePasswordLoading: false })
              Alert.alert('Password was change')
            })
            .catch(err => {
              this.setState({ changePasswordLoading: false })
              alert(err.message)
            })
        })
        .catch(err => {
          this.setState({ changePasswordLoading: false })
          Alert.alert(err.message)
        })
    }
  }

  changeEmail = () =>{
    if (
      this.state.newEmail.length < 1 
    ) {
      Alert.alert('empty input')
    } else {
      this.setState({ changeEmailLoading: true })
      this.reauthenticate(this.state.currentPassword)
        .then(() => {
          firebase
            .auth()
            .currentUser.updateEmail(this.state.newEmail)
            .then(res => {
              this.setState({ changeEmailLoading: false })
              Alert.alert('Email was change')
            })
            .catch(err => {
              this.setState({ changeEmailLoading: false })
              alert(err.message)
            })
        })
        .catch(err => {
          this.setState({ changeEmailLoading: false })
          Alert.alert(err.message)
        })
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <Button
            title='SignOut'
            onPress={this.signOut}
            buttonStyle={styles.signoutButton}
          />

          <Input
            placeholder='Current Password'
            secureTextEntry
            onChangeText={i => this.setState({ currentPassword: i })}
            inputContainer={styles.passwordInputContainer}
          />
          <Input
            placeholder='New Password'
            secureTextEntry
            onChangeText={i => this.setState({ newPassword: i })}
            inputContainer={styles.passwordInputContainer}
          />
          <Button
            title='Change Password'
            buttonStyle={styles.changePasswordButton}
            onPress={this.changePassword}
            loading={this.state.changePasswordLoading}
          />
          <Input
            placeholder='New Email'
            keyboardType='email-address'
            onChangeText={i => this.setState({ newEmail: i })}
            inputContainer={styles.passwordInputContainer}
          />
          <Button
            title='Change Email'
            buttonStyle={styles.changePasswordButton}
            onPress={this.changeEmail}
            loading={this.state.changeEmailLoading}
          />
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  signoutButton: {
    backgroundColor: 'grey'
  },
  passwordInputContainer: {},
  changePasswordButton: {
    backgroundColor: 'yellow'
  }
})
