import moment from 'moment'
import firebase from 'firebase'
import { goBack } from '../services/navigator.js'
import { updatePostsWithSelected } from '../services/data.js'

import { AsyncStorage } from 'react-native'
import { connect } from 'react-redux'
import { updateDrawers, updateGroupName, groupNameError, selectGroup, updateUser } from '../actions'

const mapStateToProps = (state) => ({
  groupName: state.createGroup.name,
  user: state.profile.user,
  nameError: state.createGroup.error
})

const mapDispatchToProps = (dispatch) => ({
  onGroupNameUpdate: (value) => {
    dispatch(updateGroupName(value))
  },
  onCreateGroup: ({user, groupName}) => {
    if (user.mygroups.map((g,i) => g.name).indexOf(groupName) < 0) {
      const groupsRef = firebase.database().ref('groups')

      // listen for created group
      groupsRef.orderByChild('name').equalTo(groupName).on('value', function(snapshot) {
        const result = snapshot.val()
        if (result) {
          const groups = Object.values(result)
          const keys = Object.keys(result)
          groups.map(function(g,i) {
            // if group has current user as memeber, it's the right group
            if (g.members.map((m,i) => m.email).indexOf(user.email) >= 0) {

              // listen for change to user (mygroups)
              firebase.database().ref().child('users').child(user.id).on('value', function(snapshot) {
                dispatch(updateUser({...snapshot.val(), id: user.id}))
                dispatch(selectGroup(groupName))
                updatePostsWithSelected(groupName, dispatch)
              })

              // add group to mygroups for current user
              firebase.database().ref().child('users').child(user.id).child('mygroups').push()
                .set({id: keys[i], name: groupName})

              dispatch(updateDrawers('close'))
              dispatch(updateGroupName(''))
              groupsRef.off()
              goBack()
            }
          })
        }
      })

      // create group with current user as member and initial post
      groupsRef.push().set({
        name: groupName,
        members: [{id: user.id, email: user.email}],
        organization: false,
        posts: [{
          user: user.firstName + user.lastName,
          message: 'welcome to ' + groupName + '!',
          timestamp: moment().format(),
        }]
      })
    } else {
      dispatch(groupNameError())
    }
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)
