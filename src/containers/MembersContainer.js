import firebase from 'firebase'
import moment from 'moment'
import { connect } from 'react-redux'
import { updateMembersForGroup } from '../services/data.js'

const mapStateToProps = (state) => ({
  members: state.members.list,
})

const mapDispatchToProps = (dispatch) => ({
  onGetMembers: (groupId) => {
    updateMembersForGroup(groupId, dispatch)
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)
