import firebase from 'firebase'
import { goBack } from '../services/navigator.js'
import { updateUserService } from '../services/data.js'

import { connect } from 'react-redux'
import { 
  signinSuccess, updateEmail, 
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
  onBackToSignin: (value) => {
    dispatch({type: "SHOW_SIGNIN"})
    goBack()
  },
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

      firebase.auth().createUserWithEmailAndPassword(email, password).then(user => {
        firebase.database().ref('users').push().set({
          email: email,
          firstName: fName,
          lastName: lName
        })

        // moves flow into Posts
        updateUserService(email, password, dispatch)

        user.sendEmailVerification()
        dispatch(signinSuccess())
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
