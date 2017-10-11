import React, { Component, PropTypes } from 'react'
import { 
  View,
  Text,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
  StyleSheet
} from 'react-native'

import SignupContainer from '../../containers/SignupContainer'
class SignupScreen extends Component {
  _onSignupPress() {
    this.props.onSignup({
      email: this.props.email, 
      fName: this.props.firstName, 
      lName: this.props.lastName, 
      password: this.props.password,
      confirmation: this.props.confirmation,
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.formWrap}>
          <Text style={styles.formTitle}>New User</Text>

          <TextInput style={styles.textBox} 
                     value={this.props.email}
                     placeholder='Email'
                     onChangeText={this.props.onEmailUpdate}
                     underlineColorAndroid={'transparent'} />

          <TextInput style={styles.textBox} 
                     value={this.props.firstName}
                     placeholder='First Name'
                     onChangeText={this.props.onFirstNameUpdate}
                     underlineColorAndroid={'transparent'} />

          <TextInput style={styles.textBox} 
                     value={this.props.lastName}
                     placeholder='Last Name'
                     onChangeText={this.props.onLastNameUpdate}
                     underlineColorAndroid={'transparent'} />

          <TextInput style={styles.textBox}
                     value={this.props.password}
                     placeholder='Password'
                     secureTextEntry={true}
                     onChangeText={this.props.onPasswordUpdate}
                     underlineColorAndroid={'transparent'} />

          <TextInput style={styles.textBox}
                     value={this.props.confirmation}
                     placeholder='Confirm Password'
                     secureTextEntry={true}
                     onChangeText={this.props.onConfirmationUpdate}
                     underlineColorAndroid={'transparent'} />

          <Text style={styles.errorText}>{this.props.error}</Text>

          <TouchableOpacity style={styles.actionButton}
                            onPress={this._onSignupPress.bind(this)}>
            <Text style={styles.buttonText}>Sign Up!</Text>
          </TouchableOpacity>

        </View>
      </View>
    )
  }
}

SignupScreen.propTypes = {
  email: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  password: PropTypes.string,
  confirmation: PropTypes.string,
  onFirstNameUpdate: PropTypes.func.isRequired,
  onLastNameUpdate: PropTypes.func.isRequired,
  onEmailUpdate: PropTypes.func.isRequired,
  onPasswordUpdate: PropTypes.func.isRequired,
  onSignup: PropTypes.func.isRequired,
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
  errorText: {
    alignSelf: 'center',
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

export default SignupContainer(SignupScreen)
