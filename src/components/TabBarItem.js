import React, { PropTypes } from 'react'
import {
  Text,
  View,
  StyleSheet
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

const TabBarItem = (props) => (
  <View style={styles.container}>
    <Icon name={props.icon} style={[styles.icon, props.selected && styles.selectedLabel]}/>
    <Text style={[styles.label, props.selected && styles.selectedLabel]}>{props.label}</Text>
  </View>
)

TabBarItem.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  selected: PropTypes.bool
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    color: '#ffffff',
    fontSize: 30,
    paddingVertical: 4
  },
  label: {
    color: '#ffffff',
    paddingTop: 5
  },
  selectedLabel: {
    color: '#cc9766'
  },
  tab: {
    color: '#ffffff'
  },
})

export default TabBarItem
