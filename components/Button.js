import React, { Component } from 'react'
import { TouchableOpacity, Text , StyleSheet} from 'react-native';

export default class Button extends Component {
  render() {
    return (
      <TouchableOpacity style={[styles.button, this.props.style]} {...this.props} >
      <Text>
          {this.props.title}
      </Text>
        
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
        marginVertical: 10,
    }
})
