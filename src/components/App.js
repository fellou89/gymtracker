import React, { Component } from 'react'
import firebase from 'firebase'

import { setNavigator } from '../services/navigator.js'
import { StackNavigator } from 'react-navigation'

import SigninScreen from './screens/SigninScreen.js'
import PostsScreen from './screens/PostsScreen.js'

import { Provider } from 'react-redux'

import BackgroundTimer from 'react-native-background-timer'
setTimeout = BackgroundTimer.setTimeout.bind(BackgroundTimer)
setInterval = BackgroundTimer.setInterval.bind(BackgroundTimer)
clearTimeout = BackgroundTimer.clearTimeout.bind(BackgroundTimer)
clearInterval = BackgroundTimer.clearInterval.bind(BackgroundTimer)

import GymTrackerReducers from '../reducers'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
let store = createStore(GymTrackerReducers, applyMiddleware(thunk))

class App extends Component {
  componentWillMount() {
    const config = {
      apiKey: "AIzaSyBzV_ye_5u8l9ZmC7-UA7XqJS489TW6-_o",
      authDomain: "workout-76910.firebaseapp.com",
      databaseURL: "https://workout-76910.firebaseio.com",
      projectId: "workout-76910",
      storageBucket: "workout-76910.appspot.com",
      messagingSenderId: "28136585902"
    }
    firebase.initializeApp(config)
  }
  render() {
    return (
      <Provider store={store}>
        <Stack ref={nav => setNavigator(nav)}/>
      </Provider>
    )
  }
}

const Stack = StackNavigator({
  Signin: {screen: SigninScreen},
  Posts: {screen: PostsScreen},
})

export default App
