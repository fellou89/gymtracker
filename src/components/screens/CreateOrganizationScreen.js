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

import CreateOrganizationContainer from '../../containers/CreateOrganizationContainer'
class CreateOrganizationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {currentColor: 0};
  }

  _onCreateOrgPress() {
    this.props.onCreateOrg({
      orgName: this.props.orgName,
      user: this.props.user,
      orgColors: {
        primary: this.props.primary,
        primAlt: this.props.primAlt,
        secondary: this.props.secondary,
        secAlt: this.props.secAlt,
        tertiary: this.props.tertiary,
        tertAlt: this.props.tertAlt
      }
    })
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

  colorChoiceStyle(color, position) {
    return {
      flex: 1,
      borderLeftWidth: position == 0 ? 0 : 1 ,
      borderRightWidth: position == 5 ? 0 : 1,
      borderColor: '#ddd',
      width: null,
      backgroundColor: color
    }
  }

  _colorChanged(colors, index, color) {
    this.props.onColorChange(colors, index, color)
  }

  render() {
    const colors = [this.props.primary, this.props.primAlt, this.props.secondary, this.props.secAlt, this.props.tertiary, this.props.tertAlt]
    const colorLabels = ['Primary Color', 'Primary Alternate', 'Secondary Color', 'Secondary Alternate', 'Tertiary Color', 'Tertiary Alternate']
    return (
      <View style={this.containerStyle(this.props.secondary)}>
        <View style={styles.formWrap}>
          <Text style={[styles.formTitle, this.backgroundTextStyle(this.props.secAlt)]}>New Organization</Text>

          <TextInput style={this.textBoxStyle(this.props.tertiary, this.props.tertAlt)} 
                     value={this.props.orgName}
                     placeholder='Organization Name'
                     onChangeText={this.props.onOrgNameUpdate}
                     underlineColorAndroid={'transparent'} />

          <View style={{height: 250, paddingTop: 10}}>
            <View style={styles.colorPicker}>
              { colors.map((c,i) => <TouchableOpacity 
                  onPress={() => this.setState({currentColor: i})}
                  style={this.colorChoiceStyle(c,i)} key={i}/> 
                )
              }
            </View>
            <Text style={[styles.colorLabel, this.backgroundTextStyle(this.props.secAlt)]}>{colorLabels[this.state.currentColor]}</Text>
            <View style={{height: 200}}>
              <ColorPicker 
                color={colors[this.state.currentColor]}
                onColorChange={c => this._colorChanged(colors, this.state.currentColor, c)}
                style={{flex: 1}}/>
            </View>
          </View>

          <Text style={styles.nameError}>{this.props.nameError}</Text>

          <TouchableOpacity style={this.actionButtonStyle(this.props.primary)}
                            onPress={this._onCreateOrgPress.bind(this)}>
            <Text style={this.actionTextStyle(this.props.primAlt)}>Create</Text>
          </TouchableOpacity>

        </View>
      </View>
    )
  }


}

CreateOrganizationScreen.propTypes = {
  orgName: PropTypes.string,
  nameError: PropTypes.string,
  organization: PropTypes.bool,
  onColorChange: PropTypes.func.isRequired,
  onOrgNameUpdate: PropTypes.func.isRequired,
  onCreateOrg: PropTypes.func.isRequired,
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
  colorPicker: {
    flex: 1, 
    flexDirection: 'row', 
    alignItems: 'stretch', 
    borderRadius: 10, 
    borderWidth: 1, 
    borderColor: '#ddd', 
    overflow: 'hidden'
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

export default CreateOrganizationContainer(CreateOrganizationScreen)
