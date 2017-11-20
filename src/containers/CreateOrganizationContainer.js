import moment from 'moment'
import firebase from 'firebase'
import { reset, goBack } from '../services/navigator.js'

import { AsyncStorage } from 'react-native'
import { connect } from 'react-redux'
import { updateOrgName, orgNameError, updateOrgColors, createOrgSuccess,
  updateDrawers, updateUser } from '../actions'
import { fromHsv } from 'react-native-color-picker'

const mapStateToProps = (state) => ({
  user: state.profile.user,
  orgName: state.orgForm.name,
  nameError: state.orgForm.error,
  primary: state.orgForm.primary,
  primAlt: state.orgForm.primAlt,
  secondary: state.orgForm.secondary,
  secAlt: state.orgForm.secAlt,
  tertiary: state.orgForm.tertiary,
  tertAlt: state.orgForm.tertAlt,
})

const mapDispatchToProps = (dispatch) => ({
  onOrgNameUpdate: (value) => {
    dispatch(updateOrgName(value))
  },
  onColorChange: (colors, index, c) => {
    colors[index] = fromHsv(c)
    dispatch(updateOrgColors(...colors))
  },
  onCreateOrg: ({user, orgName, orgColors}) => {
    if (orgName.length > 0) {
      const orgsRef = firebase.database().ref('organizations')

      // listen for created organization
      orgsRef.orderByChild('name').equalTo(orgName).on('value', function(snapshot) {
        const result = snapshot.val()
        if (result && (Object.values(result)[0].created_by == user.id)) {
          const key = Object.keys(result)[0]

          // listen for change to user (myorgs)
          firebase.database().ref().child('users').child(user.id).on('value', function(snapshot) {
            dispatch(updateUser({...snapshot.val(), id: user.id}))
          })

          // add organization to myorgs for current user
          firebase.database().ref().child('users').child(user.id).child('myorgs').push()
            .set({id: key, name: orgName, created_by: user.id})

          dispatch(updateDrawers('close'))
          dispatch(createOrgSuccess())
          orgsRef.off()
          goBack()
        }
      })

      orgsRef.orderByChild('name').equalTo(orgName).once('value', function(snapshot) {
        const organization = snapshot.val()
        if (organization) {
          dispatch(orgNameError())
        } else {
          // creator = {id: user.id, email: user.email}
          orgsRef.push().set({
            name: orgName,
            created_by: user.id,
            colors: orgColors
          })
        }
      })
    }
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)
