import React, { PropTypes } from 'react'
import {
  Text,
  View,
  StyleSheet
} from 'react-native'

const MemberItem = (props) => (
  <View style={styles.container}>
    <Text>
      { props.name + (props.creator ? ' (Admin)' : '')}
    </Text>
    <Text>
      { props.email }
    </Text>
  </View>
)

MemberItem.propTypes = {
  email: PropTypes.string.isRequired,
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 10,
    padding: 10,
    height: undefined,
    width: undefined,
    backgroundColor: '#fff'
  }
})

export default MemberItem
