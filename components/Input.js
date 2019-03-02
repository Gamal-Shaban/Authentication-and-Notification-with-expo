import React, { Component, Fragment } from 'react'
import { TextInput, StyleSheet, View } from 'react-native'

export default class Input extends Component {
  render () {
    return (
      <View style={styles.container}>
        <TextInput style={styles.input} {...this.props} />
        {this.props.error ? <Text>this.props.error</Text> : <Fragment />}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch'
  },
  input: {
    height: 30,
    alignSelf: 'stretch',
    backgroundColor: 'yellow',
    color: 'red',
    margin: 20
  }
})
