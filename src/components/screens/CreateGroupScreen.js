import React, { Component, PropTypes } from 'react'
import { 
  View,
  Text,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
  StyleSheet
} from 'react-native'

import CreateGroupContainer from '../../containers/CreateGroupContainer'
class CreateGroupScreen extends Component {
  _onCreateGroupPress() {
    this.props.onCreateGroup({
      groupName: this.props.groupName,
      user: this.props.user
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.formWrap}>
          <Text style={styles.formTitle}>New Group</Text>

          <TextInput style={styles.textBox} 
                     value={this.props.groupName}
                     placeholder='Group Name'
                     onChangeText={this.props.onGroupNameUpdate}
                     underlineColorAndroid={'transparent'} />

          <Text style={styles.nameError}>{this.props.nameError}</Text>

          <TouchableOpacity style={styles.actionButton}
                            onPress={this._onCreateGroupPress.bind(this)}>
            <Text style={styles.buttonText}>Create Group</Text>
          </TouchableOpacity>

        </View>
      </View>
    )
  }
}

CreateGroupScreen.propTypes = {
  groupName: PropTypes.string,
  nameError: PropTypes.string,
  onGroupNameUpdate: PropTypes.func.isRequired,
  onCreateGroup: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#eee'
  },
  formWrap: {
    justifyContent: 'center',
    marginLeft: 80,
    marginRight: 80,
  },
  formTitle: {
    height: 40,
    fontSize: 20,
    textAlign: 'center',
  },
  textBox: {
    height: 35,
    paddingBottom: 2,
    paddingHorizontal: 5,
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#999',
    backgroundColor: '#fff'
  },
  nameError: {
    color: '#f00'
  },
  buttonText: {
    alignSelf: 'center',
  },
  actionButton: {
    padding: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#999',
    backgroundColor: '#ddd'
  }
})

export default CreateGroupContainer(CreateGroupScreen)
