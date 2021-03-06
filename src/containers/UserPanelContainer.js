import firebase from 'firebase'
import { navigate, reset } from '../services/navigator.js'

import { AsyncStorage } from 'react-native'
import { connect } from 'react-redux'
import { signout, updateDrawers, selectGroup } from '../actions'

const mapStateToProps = (state) => ({
  user: state.profile.user,
  groups: state.profile.user.mygroups,
  selected: state.profile.selected,
})

const mapDispatchToProps = (dispatch) => ({
  onCreateOrganization: () => {
    navigate('CreateOrganization')
  },
  onAddGroup: () => {
    navigate('CreateGroup')
  },
  onEditGroup: (group, currentUser) => {
    navigate('EditGroup', {admin: group.created_by == currentUser.id})
  },
  onSignout: ({email, password}) => {
    firebase.auth().signOut().then(function() {
        dispatch(signout())
        dispatch(updateDrawers('close'))
        reset('Signin')
        AsyncStorage.multiSet([['email', ''],['password', '']])
      })
      .catch((error) => {
        throw error
      })
  },
  onSelectGroup: (group) => {
    dispatch(selectGroup(group.id))
    reset('Posts', {group})
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)
