import React, { Component, PropTypes } from 'react'
import { 
  View,
  Text,
  Switch,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
  StyleSheet
} from 'react-native'
import { ColorPicker } from 'react-native-color-picker'

import CreateGroupContainer from '../../containers/CreateGroupContainer'
class CreateGroupScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {currentColor: 0};
  }

  _onCreateGroupPress() {
    this.props.onCreateGroup({
      groupName: this.props.groupName,
      user: this.props.user
    })
  }

  _organizationViews(is, colorLabels, colorIndex) {
    const colorLabel = colorLabels[colorIndex]
    const colors = [this.props.primary, this.props.primAlt, this.props.secondary, this.props.secAlt, this.props.tertiary, this.props.tertAlt]
    if (is) {
      return <View style={{height: 250, paddingTop: 10}}>
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'stretch', borderRadius: 10, borderWidth: 1, overflow: 'hidden'}}>
          <TouchableOpacity onPress={() => this.setState({currentColor: 0})}
            style={{flex: 1, width: null, backgroundColor: this.props.primary}}/>
          <TouchableOpacity onPress={() => this.setState({currentColor: 1})}
            style={{flex: 1, width: null, backgroundColor: this.props.primAlt}}/>
          <TouchableOpacity onPress={() => this.setState({currentColor: 2})}
            style={{flex: 1, width: null, backgroundColor: this.props.secondary}}/>
          <TouchableOpacity onPress={() => this.setState({currentColor: 3})}
            style={{flex: 1, width: null, backgroundColor: this.props.secAlt}}/>
          <TouchableOpacity onPress={() => this.setState({currentColor: 4})}
            style={{flex: 1, width: null, backgroundColor: this.props.tertiary}}/>
          <TouchableOpacity onPress={() => this.setState({currentColor: 5})}
            style={{flex: 1, width: null, backgroundColor: this.props.tertAlt}}/>
        </View>
        <Text style={[styles.colorLabel, this.backgroundTextStyle(this.props.secAlt)]}>{colorLabel}</Text>
        <View style={{height: 200}}>
          <ColorPicker 
            color={colors[colorIndex]}
            onColorChange={c => this.props.onColorChange(colors, colorIndex, c)}
            style={{flex: 1}}/>
        </View>
      </View>
    }
  }
  
  textBoxStyle(tertiary, tertAlt) {
    return {
      height: 35,
      paddingBottom: 2,
      paddingHorizontal: 5,
      marginBottom: 10,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: '#999',
      backgroundColor: tertiary,
      color: tertAlt
    }
  }

  actionButtonStyle(primary) {
    return {
      padding: 5,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: '#999',
      backgroundColor: primary,
    }
  }

  actionTextStyle(primAlt) {
    return {
      alignSelf: 'center',
      fontWeight: 'bold',
      color: primAlt
    }
  }

  containerStyle(secondary) {
    return {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: secondary
    }
  }

  backgroundTextStyle(secAlt) {
    return {
      color: secAlt
    }
  }

  render() {
    const colors = ['Primary Color', 'Primary Alternate', 'Secondary Color', 'Secondary Alternate', 'Tertiary Color', 'Tertiary Alternate']
    return (
      <View style={this.containerStyle(this.props.secondary)}>
        <View style={styles.formWrap}>
          <Text style={[styles.formTitle, this.backgroundTextStyle(this.props.secAlt)]}>New Group</Text>

          <TextInput style={this.textBoxStyle(this.props.tertiary, this.props.tertAlt)} 
                     value={this.props.groupName}
                     placeholder='Group Name'
                     onChangeText={this.props.onGroupNameUpdate}
                     underlineColorAndroid={'transparent'} />

          <View style={styles.organizationWrap}>
            <Text style={[styles.organization, this.backgroundTextStyle(this.props.secAlt)]}>Organization: </Text>
            <Switch style={styles.organizationSwitch} value={this.props.organization}
              onValueChange={(value) => this.props.onOrganizationChange(value)} />
          </View>

          { this._organizationViews(this.props.organization, colors, this.state.currentColor) }

          <Text style={styles.nameError}>{this.props.nameError}</Text>

          <TouchableOpacity style={this.actionButtonStyle(this.props.primary)}
                            onPress={this._onCreateGroupPress.bind(this)}>
            <Text style={this.actionTextStyle(this.props.primAlt)}>Create</Text>
          </TouchableOpacity>

        </View>
      </View>
    )
  }


}

CreateGroupScreen.propTypes = {
  groupName: PropTypes.string,
  nameError: PropTypes.string,
  organization: PropTypes.bool,
  onColorChange: PropTypes.func.isRequired,
  onOrganizationChange: PropTypes.func.isRequired,
  onGroupNameUpdate: PropTypes.func.isRequired,
  onCreateGroup: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
  formWrap: {
    justifyContent: 'center',
    marginLeft: 80,
    marginRight: 80,
  },
  formTitle: {
    height: 40,
    fontSize: 20,
    textAlign: 'center',
  },
  
  colorWrap: {
    marginTop: 10,
    height: 400
  },
  mainColorWrap: {
    marginTop: 10,
    height: 300,
    flex: 1,
    flexDirection: 'row'
  },
  altColorWrap: {
    marginTop: 10,
    height: 300,
    flex: 1,
    flexDirection: 'row'
  },
  colorLabel: {
    alignSelf: 'center'
  },
  organizationWrap: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  organization: {
    fontSize: 20
  },
  organizationSwitch: {
  },
  nameError: {
    color: '#f00'
  },
})

export default CreateGroupContainer(CreateGroupScreen)
