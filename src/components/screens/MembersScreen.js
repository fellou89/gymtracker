import firebase from 'firebase'
import React, { Component, PropTypes } from 'react'
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Platform
} from 'react-native'

import { navigate } from '../../services/navigator.js'
import KeyboardSpacer from 'react-native-keyboard-spacer'
import MemberItem from '../MemberItem.js'

import MembersContainer from '../../containers/MembersContainer.js'
class MembersScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Members',
    headerRight:
      <TouchableOpacity onPress={ () => 
        navigate('AddMember', { groupId: navigation.state.params.group.id })
      }>
        <Text style={styles.addButton}>+  </Text>
      </TouchableOpacity>,
    headerStyle: {
      backgroundColor: '#fff',
    }
  })

  componentWillMount() {
    this.props.onGetMembers(this.props.navigation.state.params.group.id)
  }

  _keyboardSpacer() {
    if (Platform.OS === 'ios') {
      return <KeyboardSpacer />
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scroll}>
          { this.props.members.map((m,i) => 
            <MemberItem key={i} {...m}
              creator={this.props.navigation.state.params.group.created_by==m.id}/>
          ) }
        </ScrollView>
        { this._keyboardSpacer() }
      </View>
    )
  }
}

MembersScreen.propTypes = {
  members: PropTypes.array
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dde',
  },
  scroll: {
    marginVertical: 2
  },
  addButton: {
    fontSize: 30
  }
})

export default MembersContainer(MembersScreen)
