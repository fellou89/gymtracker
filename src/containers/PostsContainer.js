import moment from 'moment'
import firebase from 'firebase'
import { connect } from 'react-redux'
import { postPost, updatePostsWithSelected } from '../services/data.js'
import { updatePosts, updateDrawers, updateMessage, postMessage } from '../actions'

const mapStateToProps = (state) => ({
  message: state.posts.message,
  leftDrawer: state.drawers.left,
  posts: state.posts.posts,
  user: state.profile.user,
  selected: state.profile.selected
})

const mapDispatchToProps = (dispatch) => ({
  onMessageUpdate: (value) => {
    dispatch(updateMessage(value))
  },
  onPost: ({message, user}) => {
    if (message.length > 0) {
      dispatch(postMessage(message, user))
      postPost({
        message: message,
        user: user,
        timestamp: moment().format()
      }, dispatch)
    }
  },
  onDrawersUpdate: (left) => {
    dispatch(updateDrawers(left))
  },
  onGetPosts: (selected) => {
    updatePostsWithSelected(selected, dispatch)
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)
