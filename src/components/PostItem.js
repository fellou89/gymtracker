import React, { PropTypes } from 'react'
import {
  Text,
  View,
  StyleSheet
} from 'react-native'

const PostItem = (props) => (
  <View style={styles.container}>
    <Text>
      { props.user }
    </Text>
    <Text>
      { props.message }
    </Text>
  </View>
)

PostItem.propTypes = {
  message: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
  timestamp: PropTypes.string.isRequired
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

export default PostItem
