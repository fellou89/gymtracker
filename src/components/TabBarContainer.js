import React, { PropTypes } from 'react'
import {
  StyleSheet
} from 'react-native'
import Tabs from 'react-native-tabs'
import TabBarItem from './TabBarItem.js'

const TabBarContainer = (props) => (
  <Tabs style={styles.tabs}
    selected={props.selectedService}
    onSelect={comp => {props.onTabChange(comp.props.name)}}>
    <TabBarItem name="web" label="Server" icon="server"/>
    <TabBarItem name="mail" label="Mail" icon="envelope-o"/>
  </Tabs>
)

TabBarContainer.propTypes = {
  onTabChange: PropTypes.func.isRequired,
  selectedService: PropTypes.string.isRequired
}

const styles = StyleSheet.create({
  tabs : {
    flex: 1,
    backgroundColor: '#030611',
    height: 90
  },
})

export default TabBarContainer
