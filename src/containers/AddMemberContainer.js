import moment from 'moment'
import firebase from 'firebase'
import { goBack } from '../services/navigator.js'
import { updateMembersForGroup } from '../services/data.js'

import { AsyncStorage } from 'react-native'
import { connect } from 'react-redux'
import { updateMemberEmail, addMemberError } from '../actions'

const mapStateToProps = (state) => ({
  memberEmail: state.memberForm.email,
  emailError: state.memberForm.error
})

const mapDispatchToProps = (dispatch) => ({
  onMemberEmailUpdate: (value) => {
    dispatch(updateMemberEmail(value))
  },
  onAddMember: ({groupId, memberEmail}) => {
    const groupRef = firebase.database().ref('groups/'+groupId)
    const usersRef = firebase.database().ref('users')

    groupRef.on('value', function(snapshot) {
      group = snapshot.val()

      usersRef.orderByChild('email').equalTo(memberEmail).on('value', function(userSnapshot) {
        user = userSnapshot.val()
        if (user) {
          id = Object.keys(user)[0]
          email = user[id].email

          if (typeof user.mygroups != 'undefined' && Object.keys(user.mygroups).map( (x) => x.id).indexOf(groupId) < 0) {
            dispatch(addMemberError('User is already part of this group'))
          } else {
            usersRef.off()
            userPush = usersRef.child(id).child('mygroups').push()
            userPush.set({id: groupId, name: group.name})
          
            groupRef.off()
            groupMemberPush = groupRef.child('members').push()
            groupMemberPush.set({ email, id })
            
            updateMembersForGroup(groupId, dispatch)
            dispatch(updateMemberEmail(''))
            goBack()
          }

        } else {
          dispatch(addMemberError('User with that email was not found'))
        }
      })
      groupRef.off()
    })


  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)
