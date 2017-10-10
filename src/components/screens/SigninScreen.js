import React, { Component, PropTypes } from 'react'
import { 
  View,
  Text,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
  StyleSheet
} from 'react-native'

import SigninContainer from '../../containers/SigninContainer'

class SigninScreen extends Component {
  componentWillMount() {
    AsyncStorage.multiGet(['email','password'])
      .then((storedValues) => {
        const email = storedValues[0][1]
        const pass = storedValues[1][1]
        if (email && pass) {
          this.props.onEmailUpdate(email)
          this.props.onPasswordUpdate(pass)
          this._onSigninPress()
        }
      })
  }

  _onSigninPress() {
    this.props.onSignin({
      email: this.props.email, 
      password: this.props.password,
    })
  }

  _renderButton() {
    if (!this.props.loading) {
      return (
        <TouchableOpacity style={styles.actionButton}
                          onPress={this._onSigninPress.bind(this)}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
      )
    } else {
      return null
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.formWrap}>
          <TextInput style={styles.textBox} 
                     value={this.props.email}
                     placeholder='Email'
                     onChangeText={this.props.onEmailUpdate}
                     underlineColorAndroid={'transparent'} />
          <TextInput style={styles.textBox}
                     value={this.props.password}
                     placeholder='Password'
                     secureTextEntry={true}
                     onChangeText={this.props.onPasswordUpdate}
                     underlineColorAndroid={'transparent'} />
          <Text style={styles.errorText}>{this.props.error}</Text>
          { this._renderButton() }
        </View>
      </View>
    )
  }
}

SigninScreen.propTypes = {
  email: PropTypes.string,
  password: PropTypes.string,
  error: PropTypes.string,
  loading: PropTypes.bool,
  onEmailUpdate: PropTypes.func.isRequired,
  onPasswordUpdate: PropTypes.func.isRequired,
  onSignin: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#eee'
  },
  formWrap: {
    justifyContent: 'center',
    marginLeft: 100,
    marginRight: 100,
  },
  textBox: {
    height: 37,
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

export default SigninContainer(SigninScreen)
