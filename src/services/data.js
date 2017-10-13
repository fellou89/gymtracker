import firebase from 'firebase'
import { updateUser, updatePosts } from '../actions'
import { AsyncStorage } from 'react-native'

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
      const id = Object.keys(snapshot.val())[0]
      const me = snapshot.val()[id]
      const mygroups = (typeof me.mygroups == 'undefined') ? [] : Object.values(me.mygroups)
      dispatch(updateUser({...me, id, mygroups}))
    })
  AsyncStorage.multiSet([['email', email],['password', password]])
}

export function updatePostsWithSelected(selected, dispatch) {
  firebase.database().ref('groups').orderByChild('name').equalTo(selected)
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

export function postPost(postData, dispatch) {
  currentGroupRef.child('posts').push().set(postData)
}
