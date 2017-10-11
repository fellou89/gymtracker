import firebase from 'firebase'
import { reset } from '../services/navigator.js'

import { AsyncStorage } from 'react-native'
import { connect } from 'react-redux'
import { 
  signinSuccess, updateUser,updateEmail, 
  updateFirstName, updateLastName, 
  updatePassword, updateConfirmation
} from '../actions'

const mapStateToProps = (state) => ({
  email: state.email,
  firstName: state.firstName,
  lastName: state.lastName,
  password: state.password,
  confirmation: state.confirmation,
})

const mapDispatchToProps = (dispatch) => ({
  onEmailUpdate: (value) => {
    dispatch(updateEmail(value))
  },
  onFirstNameUpdate: (value) => {
    dispatch(updateFirstName(value))
  },
  onLastNameUpdate: (value) => {
    dispatch(updateLastName(value))
  },
  onPasswordUpdate: (value) => {
    dispatch(updatePassword(value))
  },
  onConfirmationUpdate: (value) => {
    dispatch(updateConfirmation(value))
  },
  onSignup: ({email, fName, lName, password, confirmation}) => {
    if (email.length > 0 && fName.length > 0 && lName.length > 0 &&
        password.length > 0 && confirmation.length > 0 && password == confirmation) {

      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(user => {
          const me = {
            email: email,
            firstName: fName,
            lastName: lName
          }

          dispatch(updateUser(me))
          const usersPush = firebase.database().ref('users').push()
          usersPush.set(me)

          user.sendEmailVerification()
          try {
            AsyncStorage.multiSet([['email', email],['password', password]])
          } catch (e) {
            console.log(e)
          }
          dispatch(signinSuccess())
          reset('Posts')
        })
        .catch((error) => {
          throw error
        })
    }
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)
