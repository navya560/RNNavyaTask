import React, { Component } from 'react';
import { View, Text } from 'react-native';
import {connect} from 'react-redux';

export class Tab4 extends Component {
  constructor(props){
     super(props)
     this.state = {}
   }
    
  render(){
    return(
        <View>
            <Text>Tab4</Text>
        </View>
    );
   }
}

export default connect()(Tab4);
