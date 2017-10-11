import firebase from 'firebase'
import { reset } from '../services/navigator.js'

import { AsyncStorage } from 'react-native'
import { connect } from 'react-redux'
import { signout, updateDrawers } from '../actions'

const mapStateToProps = (state) => ({
  user: state.profile.user
})

const mapDispatchToProps = (dispatch) => ({
  onSignout: ({email, password}) => {
    firebase.auth().signOut()
      .then(function() {
        dispatch(signout())
        dispatch(updateDrawers('close'))
        reset('Signin')
        AsyncStorage.multiSet([['email', ''],['password', '']])
      })
      .catch((error) => {
        throw error
      })
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)
