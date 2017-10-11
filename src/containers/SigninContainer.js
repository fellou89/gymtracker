import firebase from 'firebase'
import { reset, navigate } from '../services/navigator.js'

import { AsyncStorage } from 'react-native'
import { connect } from 'react-redux'
import { updateEmail, updatePassword, updateUser} from '../actions'

const mapStateToProps = (state) => ({
  email: state.email,
  password: state.password,
  error: state.signin.error,
  loading: state.signin.loading
})

const mapDispatchToProps = (dispatch) => ({
  onEmailUpdate: (value) => {
    dispatch(updateEmail(value))
  },
  onPasswordUpdate: (value) => {
    dispatch(updatePassword(value))
  },
  onSignin: ({email, password}) => {
    dispatch({type: 'SIGNIN_UPDATE'})
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(user => {
        firebase.database().ref('users').orderByChild('email').equalTo(email)
          .once('value', function(snapshot) {
            const me = Object.values(snapshot.val())[0]
            dispatch(updateUser(me))
          })
        AsyncStorage.multiSet([['email', email],['password', password]])
        reset('Posts')
      })
      .catch((error) => {
        if (!firebase.auth().currentUser) {
          navigate('Signup')

        } else {
          // user was logged in, but errors will be caught here and stack trace won't pop up, so throw error
          // TODO: this could handle all unexpected crashes gracefully, right?
          throw error
        }
      })
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)
