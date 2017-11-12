import moment from 'moment'
import firebase from 'firebase'
import { reset, goBack } from '../services/navigator.js'

import { AsyncStorage } from 'react-native'
import { connect } from 'react-redux'
import { updateDrawers, updateGroupName, groupNameError, selectGroup, updateUser } from '../actions'

const mapStateToProps = (state) => ({
  groupName: state.groupForm.name,
  user: state.profile.user,
  nameError: state.groupForm.error
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
          groups.map(function(group,i) {
            // if group has current user as memeber, it's the right group
            if (group.members.map((m,i) => m.email).indexOf(user.email) >= 0) {

              // listen for change to user (mygroups)
              firebase.database().ref().child('users').child(user.id).on('value', function(snapshot) {
                dispatch(updateUser({...snapshot.val(), id: user.id}))
                dispatch(selectGroup(groupName))
                group.id = keys[i]
                reset('Posts', {group})
              })

              // add group to mygroups for current user
              firebase.database().ref().child('users').child(user.id).child('mygroups').push()
                .set({id: keys[i], name: groupName, created_by: user.id})

              dispatch(updateDrawers('close'))
              dispatch(updateGroupName(''))
              groupsRef.off()
              goBack()
            }
          })
        }
      })

      creator = {id: user.id, email: user.email}
      groupsRef.push().set({
        name: groupName,
        created_by: creator.id,
        members: [creator],
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
