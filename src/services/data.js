import firebase from 'firebase'
import { signout, updateUser, updatePosts, updateMembers } from '../actions'
import { AsyncStorage } from 'react-native'
import { reset, navigate } from '../services/navigator.js'

let usersRef
let groupsRef
let currentGroupRef

export function setUsersRef() {
  usersRef = firebase.database().ref('users')
}

export function setGroupsRef() {
  groupsRef = firebase.database().ref('groups')
}

export function setCurrentGroupRef(gid) {
  currentGroupRef = groupsRef.child(gid)
}

export function updateUserService(email, password, dispatch) {
  usersRef.orderByChild('email').equalTo(email)
    .once('value', function(snapshot) {
      if (snapshot.val()) {
        const id = Object.keys(snapshot.val())[0]
        const me = snapshot.val()[id]
        const mygroups = (typeof me.mygroups == 'undefined') ? [] : Object.values(me.mygroups)
        dispatch(updateUser({...me, id, mygroups}))
        reset('Posts', {group: (mygroups.length > 0) ? mygroups[0] : {name: 'Welcome'} })
      } else {
        dispatch(signout())
        AsyncStorage.multiSet([['email', ''],['password', '']])
      }
    })
  AsyncStorage.multiSet([['email', email],['password', password]])
}

export function updatePostsWithSelected(selected, dispatch) {
  groupsRef.orderByChild('name').equalTo(selected)
    .on('value', function(groupsSnap) {
      if (groupsSnap.val()) {
        setCurrentGroupRef(Object.keys(groupsSnap.val())[0])
        currentGroupRef.child('posts').limitToLast(10).orderByChild('timestamp')
          .on('value', function(postsSnap) {
            const postsData = Object.values(postsSnap.val())
            dispatch(updatePosts(postsData.reverse()))
          })
      }
    })
}

export function updateMembersForGroup(groupId, dispatch) {
  groupsRef.child(groupId).on('value', function(snapshot) {
    finalMembers = []

    groupMembers = Object.values(snapshot.val().members)
    groupMembers.forEach(function (gMember) {
      usersRef.child(gMember.id).on('value', function(userSnapshot) {
        user = userSnapshot.val()
        gMember.name = user.firstName + " " + user.lastName
        finalMembers.push(gMember)
        if (finalMembers.length == groupMembers.length) {
          dispatch(updateMembers(finalMembers))
        }
      })
    })
  })
}

export function postPost(postData, dispatch) {
  currentGroupRef.child('posts').push().set(postData)
}
