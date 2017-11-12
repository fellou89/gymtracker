import React, { Component, PropTypes } from 'react'
import { 
  View,
  Text,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
  StyleSheet
} from 'react-native'

import AddMemberContainer from '../../containers/AddMemberContainer'
class AddMemberScreen extends Component {
  _onAddMemberPress() {
    this.props.onAddMember({
      groupId: this.props.navigation.state.params.groupId,
      memberEmail: this.props.memberEmail
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.formWrap}>
          <Text style={styles.formTitle}>Add Member</Text>

          <TextInput style={styles.textBox} 
                     value={this.props.memberEmail}
                     placeholder='Member Email'
                     onChangeText={this.props.onMemberEmailUpdate}
                     underlineColorAndroid={'transparent'} />

          <Text style={styles.emailError}>{this.props.emailError}</Text>

          <TouchableOpacity style={styles.actionButton}
                            onPress={this._onAddMemberPress.bind(this)}>
            <Text style={styles.buttonText}>Add Member</Text>
          </TouchableOpacity>

        </View>
      </View>
    )
  }
}

AddMemberScreen.propTypes = {
  memberEmail: PropTypes.string,
  emailError: PropTypes.string,
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
  emailError: {
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

export default AddMemberContainer(AddMemberScreen)
