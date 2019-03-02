import React, { Component, Fragment } from 'react'
import { TextInput, StyleSheet, View } from 'react-native'

export default class Input extends Component {
  render () {
    return (
      <View style={styles.container}>
        <TextInput style={styles.input} autoCapitalize='none' {...this.props} />
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
    height: 40,
    alignSelf: 'stretch',
    margin: 20,
    marginVertical: 10,
    borderColor: 'grey',
    borderWidth: 0.5,
    padding: 5
  }
})
