import firebase from 'firebase'
import React, { Component, PropTypes } from 'react'
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native'

import { reset } from '../../services/navigator.js'
import Rate from 'react-native-rate'
import { signout } from '../../actions'

let options = {
	AppleAppID:"",
	GooglePackageName:"com.mywebsite.myapp",
	//AmazonPackageName:"com.mywebsite.myapp",
	preferGoogle:true,
	//preferInApp:false,
	//fallbackPlatformURL:"http://www.mywebsite.com/myapp.html",
}

import UserPanelContainer from '../../containers/UserPanelContainer'
class UserPanel extends Component {
  _renderVerified() {
    if (firebase.auth().currentUser && firebase.auth().currentUser.emailVerified) {
      return null
    } else {
      return (<Text style={styles.verified}> (un-verified)</Text>)
    }
  }

  _flattenedStyle(group, groupStyle, additionalStyle) {
    return StyleSheet.flatten([styles.group, groupStyle, additionalStyle])
  }

  _onSelectPress(group) {
    this.props.onSelectGroup(group)
  }

  _onRatePress() {
    Rate.rate(options, (success) => {
      if (success) {
	// this technically only tells us if the user successfully went to the Review Page. Whether they actually did anything, we do not know.
      }
    })
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

          <View>
            <ScrollView>
              { this.props.groups.map((g,i) => 
                <TouchableOpacity key={i} 
                  onPress={this._onSelectPress.bind(this, g)}
                  onLongPress={ () => this.props.onEditGroup(g) }
                  style={this._flattenedStyle(g, styles.group, {backgroundColor: ((g.name == this.props.selected) ? '#000' : '#fff')})}>
                  <Text style={this._flattenedStyle(g, styles.groupText, {color: ((g.name == this.props.selected) ? '#fff' : '#000')})}>
                    {g.name}
                  </Text>
                </TouchableOpacity>
              )}
            </ScrollView>
          </View>

          <TouchableOpacity style={styles.group}
                            onPress={this.props.onAddGroup}>
            <Text style={styles.groupAdd}>+ Add Group</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.appButtons}>
          <TouchableOpacity style={styles.appButton}
                            onPress={this._onRatePress.bind(this)}>
            <Text>Rate us!</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.appButton}>
            <Text>Share App</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.appButton}>
            <Text>Help & Feedback</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.appButton}>
            <Text>User Agreement</Text>
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
  groups: PropTypes.array,
  selected: PropTypes.string,
  onAddGroup: PropTypes.func.isRequired,
  onEditGroup: PropTypes.func.isRequired,
  onSignout: PropTypes.func.isRequired,
  onSelectGroup: PropTypes.func.isRequired,
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

export default UserPanelContainer(UserPanel)
