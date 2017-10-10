import React, { Component, PropTypes } from 'react'
import {
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

class NextQuoteButton extends Component {
  render() {
    return (
      <TouchableOpacity style={styles.button} onPress={this.props.onPress}>
        <Text style={styles.buttonText}>Next Thought </Text>
        <Icon name={'chevron-right'} size={25}
              style={styles.buttonIcon}/>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: '#ffffff',
    padding: 10,
    marginBottom: 20
  },
  buttonText: {
    backgroundColor: '#00000000',
    color: '#ffffff',
    fontSize: 18
  },
  buttonIcon: {
    backgroundColor: '#00000000',
    color: '#ffffff',
  }
})

NextQuoteButton.propTypes = {
  onPress: PropTypes.func.isRequired
}

export default NextQuoteButton
