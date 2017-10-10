import React, { Component, PropTypes } from 'react'
import {
  View,
  Text,
  Platform,
  StyleSheet
} from 'react-native'

class Quote extends Component {
  render() {
    return (
      <View style={styles.quoteWrap}>
        <Text style={styles.quote}>{this.props.quoteText}</Text>
        <Text style={styles.source}>{this.props.quoteSource}</Text>
      </View>
    )
  }
}
Quote.propTypes = {
  quoteText: PropTypes.string.isRequired,
  quoteSource: PropTypes.string.isRequired,
}

const styles = StyleSheet.create({
  quoteWrap : {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#00000000',
    paddingHorizontal: 10
  },
  quote : {
    fontFamily: (Platform.OS === 'ios') ? 'AvenirNext-Bold' : 'Roboto',
    fontSize: 36,
    color: '#ffffcc',
    marginVertical: 30,
  },
  source : {
    fontFamily: (Platform.OS === 'ios') ? 'AvenirNext-Italic' : 'Roboto',
    fontSize: 20,
    color: '#ffdd77',
    textAlign: 'right',
    fontStyle: 'italic'
  }
})


export default Quote
