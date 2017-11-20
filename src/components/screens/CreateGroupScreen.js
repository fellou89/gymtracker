import React, { Component, PropTypes } from 'react'
import { 
  View,
  Text,
  Switch,
  TextInput,
  ScrollView,
  TouchableOpacity,
  AsyncStorage,
  StyleSheet
} from 'react-native'

import CreateGroupContainer from '../../containers/CreateGroupContainer'
class CreateGroupScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {currentColor: 0, isOrganization: false, selectedOrg: 0};
  }

  _onCreateGroupPress() {
    this.props.onCreateGroup(
      this.state.isOrganization ? {
        groupName: this.props.groupName,
        groupColors: this.props.defaultColors,
        groupOrganization: null,
        user: this.props.user,
      } : {
        groupName: this.props.groupName,
        groupColors: this.props.user.myorgs[this.state.selectedOrg].colors,
        groupOrganization: this.props.user.myorgs[this.state.selectedOrg],
        user: this.props.user,
      }
    )
  }

  _organizationSwitch(show) {
    if (show) {
      return <View style={styles.organizationWrap}>
        <Text style={styles.organization}>Organization: </Text>
        <Switch style={styles.organizationSwitch} value={this.state.isOrganization}
          onValueChange={(value) => this.setState({isOrganization: value})} />
      </View>
    }
  }

  _organizationViews(is) {
    if (is) {
      return <View style={{height: 50, paddingTop: 10}}>
        <ScrollView style={{flex:1, paddingHorizontal: 10}}>
          { this.props.user.myorgs.map((o,i) => 
              <TouchableOpacity key={i} style={{paddingVertical: 5}}
                onPress={() => this.setState({selectedOrg: i})}>
                <Text style={{color: ((this.state.selectedOrg == i) ? '#fff' : '#000')}}>{o.name}</Text>
              </TouchableOpacity>) }
        </ScrollView>
      </View>
    }
  }
  
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.formWrap}>
          <Text style={styles.formTitle}>New Group</Text>

          <TextInput style={styles.textBox} 
                     value={this.props.groupName}
                     placeholder='Group Name'
                     onChangeText={this.props.onGroupNameUpdate}
                     underlineColorAndroid={'transparent'} />

          { this._organizationSwitch(this.props.user.myorgs.length > 0) }
          { this._organizationViews(this.state.isOrganization) }

          <Text style={styles.nameError}>{this.props.nameError}</Text>

          <TouchableOpacity style={styles.actionButton}
                            onPress={this._onCreateGroupPress.bind(this)}>
            <Text style={styles.actionText}>Create</Text>
          </TouchableOpacity>

        </View>
      </View>
    )
  }


}

CreateGroupScreen.propTypes = {
  groupName: PropTypes.string,
  nameError: PropTypes.string,
  organization: PropTypes.string,
  onOrganizationChange: PropTypes.func.isRequired,
  onGroupNameUpdate: PropTypes.func.isRequired,
  onCreateGroup: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ccd'
  },
  textBox: {
    height: 35,
    paddingBottom: 2,
    paddingHorizontal: 5,
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#999',
    backgroundColor: '#fff'
  },
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
  actionButton: {
    padding: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#999',
    backgroundColor: '#ddd',
  },
  actionText: {
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  nameError: {
    color: '#f00'
  },
})

export default CreateGroupContainer(CreateGroupScreen)
