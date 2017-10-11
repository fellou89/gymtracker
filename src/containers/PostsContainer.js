import firebase from 'firebase'
import moment from 'moment'
import { connect } from 'react-redux'
import { updatePosts, updateDrawers, updateMessage, postMessage } from '../actions'

const mapStateToProps = (state) => ({
  message: state.posts.message,
  leftDrawer: state.drawers.left,
  posts: state.posts.posts,
  user: state.profile.user
})

const mapDispatchToProps = (dispatch) => ({
  onMessageUpdate: (value) => {
    dispatch(updateMessage(value))
  },
  onPost: ({message, user}) => {
    if (message.length > 0) {
      dispatch(postMessage(message, user))
      const postsPush = firebase.database().ref('groups/0/posts').push()
      postsPush.set({
        message: message,
        user: user,
        timestamp: moment().format()
      })
    }
  },
  onPostsUpdate: (posts) => {
    dispatch(updatePosts(posts))
  },
  onDrawersUpdate: (left) => {
    dispatch(updateDrawers(left))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)
