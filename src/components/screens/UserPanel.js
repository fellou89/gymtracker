import firebase from 'firebase'
import React, { Component, PropTypes } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native'

import { reset } from '../../services/navigator.js'
import { signout } from '../../actions'

import UserContainer from '../../containers/UserContainer'
class UserPanel extends Component {
  _renderVerified() {
    if (firebase.auth().currentUser.emailVerified) {
      return null
    } else {
      return (<Text style={styles.verified}> (un-verified)</Text>)
    }
  }

  render() {
    let user = this.props.user || {}
    return (
      <View style={styles.container}>
        <View style={styles.profile}>
          <Text style={styles.profileText}>{user.firstName + " " + user.lastName}</Text>
          <View style={styles.email}>
            <Text style={styles.profileText}>{user.email}</Text>
            { this._renderVerified() }
          </View>
        </View>

        <View style={styles.groups}>
          <Text style={styles.groupTitle}>Groups</Text>

          <TouchableOpacity style={styles.group}>
            <Text style={styles.groupText}>Group</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.group}>
            <Text style={styles.groupAdd}>Add Group</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.appButtons}>
          <TouchableOpacity style={styles.appButton}>
            <Text>Help & Feedback</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.appButton}>
            <Text>Rate us!</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.appButton}
                            onPress={this.props.onSignout}>
            <Text>Log out</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

UserPanel.propTypes = {
  user: PropTypes.object,
  onSignout: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column'
  },
  profile: {
    height: 150,
    padding: 10,
    justifyContent: 'flex-end',
    backgroundColor: '#aab'
  },
  profileText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  email: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginRight: 5
  },
  verified: {
    color: '#fff',
  },
  groups: {
    backgroundColor: '#fff',
    flex: 1
  },
  groupTitle: {
    padding: 10,
    fontSize: 17,
    fontWeight: 'bold'
  },
  group: {
    paddingVertical: 5,
    paddingLeft: 20,
  },
  groupText: {
    fontWeight: 'bold'
  },
  groupAdd: {
    paddingLeft: 10
  },
  appButtons: {
    backgroundColor: '#eee'
  },
  appButton: {
    borderTopWidth: 1,
    borderColor: '#bbb',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10
  }
})

export default UserContainer(UserPanel)
