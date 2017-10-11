import firebase from 'firebase'
import React, { Component, PropTypes } from 'react'
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Platform
} from 'react-native'

import Drawer from 'react-native-drawer'
import KeyboardSpacer from 'react-native-keyboard-spacer'
import PostItem from '../PostItem.js'
import UserPanel from '../screens/UserPanel.js'

import PostsContainer from '../../containers/PostsContainer.js'
class PostsScreen extends Component {
  static navigationOptions = ({navigation}) => ({
    title: 'Welcome',
    headerLeft:
      <TouchableOpacity onPress={ () => navigation.state.params.toggleLeftDrawer('toggle') }>
        <Text>  |||</Text>
      </TouchableOpacity>,
    headerStyle: {
      backgroundColor: '#fff',
    }
  })

  componentDidMount() {
    const updateStateWith = this.props.onPostsUpdate
    // .on('value', function(snapshot) {
    firebase.database().ref('groups/0/posts').limitToLast(10).orderByChild('timestamp')
    .on('value', function(snapshot) {
      const postsData = Object.values(snapshot.val())
      updateStateWith(postsData.reverse())
    })

    this.props.navigation.setParams({ toggleLeftDrawer: this.props.onDrawersUpdate })
  }

  _onPostPress() {
    user = this.props.user
    console.log(user)
    this.props.onPost({
      message: this.props.message,
      user: user.firstName + ' ' + user.lastName
    })
  }

  _keyboardSpacer() {
    if (Platform.OS === 'ios') {
      return <KeyboardSpacer />
    }
  }

  render() {
    return (
      <Drawer
        type="static"
        content={<UserPanel />}
        onOpen={() => this.props.onDrawersUpdate('open')}
        onClose={() => this.props.onDrawersUpdate('close')}
        openDrawerOffset={100}
	open={this.props.leftDrawer}
        styles={{backgroundColor: '#f00'}}
        tweenHandler={Drawer.tweenPresets.parallax}
      >
        <View style={styles.container}>
          <ScrollView style={styles.scroll}>
            { this.props.posts.map((p,i) => <PostItem {...p} key={i}/>) }
          </ScrollView>
          <View style={styles.inputWrap}>
            <TextInput style={styles.postInput} 
                       value={this.props.message}
                       onChangeText={this.props.onMessageUpdate}
                       underlineColorAndroid={'transparent'} />
            <TouchableOpacity onPress={this._onPostPress.bind(this)} >
              <View style={styles.postButton}>
                <Text style={styles.postText}>Post</Text>
              </View>
            </TouchableOpacity>
          </View>
          { this._keyboardSpacer() }
        </View>
      </Drawer>
    )
  }
}

PostsScreen.propTypes = {
  message: PropTypes.string,
  user: PropTypes.object,
  leftDrawer: PropTypes.bool,
  posts: PropTypes.array,
  onMessageUpdate: PropTypes.func.isRequired,
  onPost: PropTypes.func.isRequired,
  onPostsUpdate: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ccd',
  },
  scroll: {
    marginVertical: 2
  },
  inputWrap: {
    height: 50,
    flexDirection: 'row',
    backgroundColor: '#fff'
  },
  postInput: {
    flex: 1,
    margin: 10,
    paddingBottom: 3,
    paddingHorizontal: 5,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#bbb',
    backgroundColor: '#ddd'
  },
  postButton: {
    height: 30,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#eee',
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 10,
    marginVertical: 10,
    backgroundColor: '#ddd'
  },
  postText: {
    fontWeight: 'bold',
    color: '#fff'
  }
})

export default PostsContainer(PostsScreen)
