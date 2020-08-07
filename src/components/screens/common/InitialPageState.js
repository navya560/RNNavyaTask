import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { connect } from 'react-redux';
import * as  appActions from '../../../actions/index';

export class InitialPageState extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hidePassword: true,
    }
  }
  navigateHome() {
    this.props.navigator.push({
      navigatorStyle: { navBarHidden: true },
      screen: "TM.HomeTab1",
      passProps: {
      }
    });
  }
  managePasswordVisibility = () => {
    this.setState({ hidePassword: !this.state.hidePassword });
  };
  render() {
    const { SectionStyle, ImageStyle, btnLogin } = pagestyles;
    return (
      <View style={{ backgroundColor: 'white', width: '100%', height: '100%' }}>


        {/* Input Fields Starts */}

        <View style={{ marginTop: '40%' }}>

          {/* Logo block Starts */}
          <View>
            <Text style={{ textAlign: 'center', fontSize: 30, marginBottom: 50 }}> LOGO</Text>
          </View>
          {/* Logo block End */}
          <View style={SectionStyle}>
            <TextInput
              style={{ flex: 1 }}
              placeholder="Enter Your Name Here"
              underlineColorAndroid="transparent"
            />
          </View>

          <View style={SectionStyle}>
            <TextInput
              style={{ flex: 1 }}
              placeholder="Enter Password"
              underlineColorAndroid="transparent"
              secureTextEntry={this.state.hidePassword}
            />

            <TouchableOpacity
              activeOpacity={0.8}
              style={pagestyles.visibilityBtn}
              onPress={this.managePasswordVisibility}
            >
              <Text style={pagestyles.showHideView}>
                {this.state.hidePassword ? "Show" : "Hide"}
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => this.navigateHome()} style={btnLogin}>
            <Text style={{ textAlign: 'center', fontSize: 18, color: '#fff' }}>LOGIN</Text>
          </TouchableOpacity>
        </View>

        {/* Input Fields Ends */}
      </View>
    );
  }
}



const pagestyles = StyleSheet.create({
  SectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 0.5,
    borderColor: '#000',
    height: 40,
    borderRadius: 5,
    margin: 10,
  },
  ImageStyle: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode: 'stretch',
    alignItems: 'center',
  },
  visibilityBtn: {
    position: "absolute",
    right: 3,
    padding: 5
  },
  showHideView: {
    fontFamily: "GothamBook",
    fontSize: 14
  },
  btnLogin: {
    backgroundColor: '#12be0f',
    padding: 15,
    alignContent: 'center',
    margin: 15,
    elevation: 3
  }
});

export default connect()(InitialPageState);
