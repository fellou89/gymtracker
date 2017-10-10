import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native'

import Quote from '../Quote'
import NextQuoteButton from '../NextQuoteButton'

class UserPanel extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.logoutButton}>
          <Text>Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton}>
          <Text>My Gym</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton}>
          <Text>My Groups</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton}>
          <Text>Log out</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column'
  },
  logoutButton: {
    height: 30,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 30,
    marginVertical: 10,
    backgroundColor: '#ccc'
  }
})

export default UserPanel
