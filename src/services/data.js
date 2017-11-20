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

export function updateUserService(email, password, defaultColors, dispatch) {
  usersRef.orderByChild('email').equalTo(email)
    .once('value', function(snapshot) {
      if (snapshot.val()) {
        const id = Object.keys(snapshot.val())[0]
        const me = snapshot.val()[id]
        const mygroups = (typeof me.mygroups == 'undefined') ? [] : Object.values(me.mygroups)

        dispatch(updateUser({...me, id, mygroups}))
        if (mygroups.length == 0) {
          reset('Posts', {group: {name: 'Welcome', colors: defaultColors}})
        } else {
          mygroups.map((g,i) => {
            groupsRef.child(g.id).on('value', function(groupSnap) {
              const group = groupSnap.val()
              g.colors = group.colors

              if (i == mygroups.length-1) {
                reset('Posts', {group: mygroups[0]})
              }
            })
          })
        }

      } else {
        dispatch(signout())
        AsyncStorage.multiSet([['email', ''],['password', '']])
      }
    })
  AsyncStorage.multiSet([['email', email],['password', password]])
}

export function updatePostsWithSelected(selected, dispatch) {
  setCurrentGroupRef(selected)
  currentGroupRef.child('posts').limitToLast(10).orderByChild('timestamp')
    .on('value', function(postsSnap) {
      const postsData = Object.values(postsSnap.val())
      dispatch(updatePosts(postsData.reverse()))
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
