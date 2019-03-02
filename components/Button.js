import React, { Component } from 'react'
import { TouchableOpacity, Text , StyleSheet, ActivityIndicator } from 'react-native';

export default class Button extends Component {
  render() {
    return (
      <TouchableOpacity style={[styles.button, this.props.buttonStyle]} {...this.props} >
      {this.props.loading ?
        <ActivityIndicator size= 'small' style={this.props.styleLoading} />
      :
      <Text style={[styles.text, this.props.textStyle]} >
          {this.props.title}
      </Text>
      }
        
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
    button:{
        height: 40,
        justifyContent: 'center',
        alignItems: 'center', 
        borderWidth: 0.5,
        borderColor: 'black',
        alignSelf: 'stretch',
        marginHorizontal: 16,
        marginVertical: 15,
    },
    text:{
      fontSize: 18
    }
})
