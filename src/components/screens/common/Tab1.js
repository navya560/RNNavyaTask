import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, TextInput, ScrollView } from 'react-native';
import { connect } from 'react-redux';
const KEYS_TO_FILTERS = ['emp_name', 'emp_department', 'emp_designation', 'emp_address'];
import SearchInput, { createFilter } from 'react-native-search-filter';
const MySelf = require("../../../img/employee.png");
//var AlphabetListView = require('react-native-alphabetlistview');

export class Tab1 extends Component {
  constructor(props) {
    super(props)
    this.state = {
      employeesData: [{
        "emp_name": "Anne Green",
        "emp_id": "12341",
        "emp_address": "Hyderabad",
        "emp_department": "VP",
        "emp_designation": "Product Management",
        "emp_experience": "Have 10 years of experience in Big Data and Analytics.",
        "emp_salary": "",
        "emp_photo_path": MySelf
      },
      {
        "emp_name": "Balu",
        "emp_id": "12342",
        "emp_address": "AP",
        "emp_department": "CP",
        "emp_designation": "Developer",
        "emp_experience": "Have 10 years of experience in Big Data and Analytics.",
        "emp_salary": "",
        "emp_photo_path": MySelf
      },
      {
        "emp_name": "Chinna",
        "emp_id": "12343",
        "emp_address": "Chennai",
        "emp_department": "DP",
        "emp_designation": "Senior Developer",
        "emp_experience": "Have 10 years of experience in Big Data and Analytics.",
        "emp_salary": "",
        "emp_photo_path": MySelf
      },
      {
        "emp_name": "Dhana",
        "emp_id": "12344",
        "emp_address": "Mumbai",
        "emp_department": "LP",
        "emp_designation": "Junior Developer",
        "emp_experience": "Have 10 years of experience in Big Data and Analytics.",
        "emp_salary": "",
        "emp_photo_path": MySelf
      },
      {
        "emp_name": "Employee",
        "emp_id": "12345",
        "emp_address": "Hyderabad",
        "emp_department": "VP",
        "emp_designation": "Product Management",
        "emp_experience": "Have 10 years of experience in Big Data and Analytics.",
        "emp_salary": "",
        "emp_photo_path": MySelf
      },
        // {
        //     "emp_name": "Ghana",
        //     "emp_id": "12346",
        //     "emp_address": "Hyderabad",
        //     "emp_department": "VP",
        //     "emp_designation": "Product Management",
        //     "emp_experience": "Have 10 years of experience in Big Data and Analytics.",
        //     "emp_salary": "",
        //     "emp_photo_path": MySelf
        // },
        // {
        //     "emp_name": "Harsha",
        //     "emp_id": "12347",
        //     "emp_address": "Hyderabad",
        //     "emp_department": "VP",
        //     "emp_designation": "Product Management",
        //     "emp_experience": "Have 10 years of experience in Big Data and Analytics.",
        //     "emp_salary": "",
        //     "emp_photo_path": MySelf
        // },
        // {
        //     "emp_name": "Shabbeer",
        //     "emp_id": "12348",
        //     "emp_address": "Hyderabad",
        //     "emp_department": "VP",
        //     "emp_designation": "Product Management",
        //     "emp_experience": "Have 10 years of experience in Big Data and Analytics.",
        //     "emp_salary": "",
        //     "emp_photo_path": MySelf
        // }
      ],
      searchTerm: '',
    }
  }
  componentWillMount(){
    
  }
  navigateNextPage(employeeData) {
    this.props.navigator.push({
      navigatorStyle: { navBarHidden: true },
      screen: "TM.PageOne",
      passProps: {
        employeesData: employeeData
      }
    });
  }
  navigateLoginPage(){
    this.props.navigator.push({
      navigatorStyle: { navBarHidden: true },
      screen: "TM.WelcomeScreen",
      passProps: {
      }
    });
  }
  searchUpdated(term) {
    this.setState({ searchTerm: term })
  }
  renderPage() {
    const { employeesData } = this.state;
    console.log("employees data==" + JSON.stringify(employeesData));
    if (employeesData !== null && employeesData !== '') {
      return employeesData != null && employeesData.map((employeesData) => (
        <View>
          <Text style={{ backgroundColor: '#ccc' }}>{employeesData.emp_name.charAt(0)}</Text>
          <TouchableOpacity onPress={() => this.navigateNextPage(employeesData)}>
            <View style={{ flexDirection: 'row', borderBottomColor: '#ccc', borderBottomWidth: 0.5 }}>
              <View style={{ width: '20%', alignItems: 'center', justifyContent: 'center' }}>
                <Image resizeMode={'contain'}
                  style={{ width: 50, height: 50 }}
                  source={employeesData.emp_photo_path}
                />
              </View>
              <View style={{ width: '80%' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 20, paddingBottom: 10 }}>{employeesData.emp_name}</Text>
                <Text style={{ fontSize: 18, paddingBottom: 10 }}>{employeesData.emp_department},{employeesData.emp_designation}</Text>
                <Text style={{ fontSize: 18, paddingBottom: 10 }}>{employeesData.emp_address}</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        // <View style={styles.SectionStylecardR}>
        //      <View style={styles.profileviewStyle}>
        //             <Image style={styles.imageiconStyle} source={employeesData.emp_photo_path} />
        //       </View>
        //     <View>
        //     <Text style={styles.ProfileName}>{employeesData.emp_name}</Text>
        //     <Text>{employeesData.emp_department} , {employeesData.emp_designation}</Text>
        //     <Text>{employeesData.emp_address}</Text>
        //     </View>
        // </View>
      ));
    }
  }
  render() {
    const { SectionStyle, ImageStyle, btnLogin, Alphabet, AlphabetActive } = pagestyles;
    const { employeesData } = this.state;
    console.log("employees data==" + JSON.stringify(employeesData));
    
    const filteredEmails = this.state.employeesData.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))

    return (
           <View>
        <ScrollView>

          {/* Header Starts */}

          <View style={{ flexDirection: 'row', margin: 10 }}>
            <View style={{ width: '90%' }}><Text style={{ textAlign: 'center', fontSize: 22 }}>Employee Directory</Text></View>
            <View style={{ width: '10%' }}>
            <TouchableOpacity onPress={() => this.navigateLoginPage()}>
              <Image resizeMode={'contain'}
                style={{ width: 30, height: 30 }}
                source={require('../../../img/off.png')}
              />
              </TouchableOpacity>
            </View>
          </View>

          {/* Header Ends */}

          {/* MainContainer Starts */}

          <View style={SectionStyle}>
            <TextInput
              onChangeText={(term) => { this.searchUpdated(term) }}
              style={{ flex: 1 }}
              placeholder="Search . . ."
              underlineColorAndroid="transparent"
            />
          </View>

          <View style={{ borderColor: '#ccc', borderWidth: 1, marginTop: 10 }}></View>


          {/* style={{ backgroundColor: '#ecf0f1' }} */}
          <View style={{ flexDirection: 'row' }}>

            <View style={{ width: '95%' }}>

              {/* <SearchInput
                    onChangeText={(term) => { this.searchUpdated(term) }}
                    style={pagestyles.searchInput}
                    placeholder="Type a message to search"
                /> */}
              {/* {this.renderPage()} */}
              <ScrollView>
                {filteredEmails.map(employeesData => {
                  return (
                    <TouchableOpacity key={employeesData.emp_id}>
                      <View>
                        <Text style={{ backgroundColor: '#ccc' }}>{employeesData.emp_name.charAt(0)}</Text>
                        <TouchableOpacity onPress={() => this.navigateNextPage(employeesData)}>
                          <View style={{ flexDirection: 'row', borderBottomColor: '#ccc', borderBottomWidth: 0.5 }}>
                            <View style={{ width: '20%', alignItems: 'center', justifyContent: 'center' }}>
                              <Image resizeMode={'contain'}
                                style={{ width: 50, height: 50 }}
                                source={employeesData.emp_photo_path}
                              />
                            </View>
                            <View style={{ width: '80%' }}>
                              <Text style={{ fontWeight: 'bold', fontSize: 20, paddingBottom: 10 }}>{employeesData.emp_name}</Text>
                              <Text style={{ fontSize: 18, paddingBottom: 10 }}>{employeesData.emp_department},{employeesData.emp_designation}</Text>
                              <Text style={{ fontSize: 18, paddingBottom: 10 }}>{employeesData.emp_address}</Text>
                            </View>
                          </View>
                        </TouchableOpacity>
                      </View>
                    </TouchableOpacity>
                  )
                })}
              </ScrollView>

              <View style={{ backgroundColor: '#006699' }}>
                <Image resizeMode={'contain'}
                  style={pagestyles.bottom}
                  source={require('../../../img/Filter.png')}
                />
              </View>
            </View>

            <View style={{
              width: '5%', alignItems: 'center', flexDirection: 'column', backgroundColor: 'powderblue',
              marginRight: 5, borderRadius: 5
            }}>
              <Text style={AlphabetActive}>A</Text>
              <Text style={Alphabet}>B</Text>
              <Text style={Alphabet}>c</Text>
              <Text style={Alphabet}>d</Text>
              <Text style={Alphabet}>e</Text>
              <Text style={Alphabet}>f</Text>
              <Text style={Alphabet}>g</Text>
              <Text style={Alphabet}>h</Text>
              <Text style={Alphabet}>i</Text>
              <Text style={Alphabet}>j</Text>
              <Text style={Alphabet}>k</Text>
              <Text style={Alphabet}>l</Text>
              <Text style={Alphabet}>m</Text>
              <Text style={Alphabet}>n</Text>
              <Text style={Alphabet}>o</Text>
              <Text style={Alphabet}>p</Text>
              <Text style={Alphabet}>q</Text>
              <Text style={Alphabet}>r</Text>
              <Text style={Alphabet}>s</Text>
              <Text style={Alphabet}>t</Text>
              <Text style={Alphabet}>u</Text>
              <Text style={Alphabet}>v</Text>
              <Text style={Alphabet}>w</Text>
              <Text style={Alphabet}>x</Text>
              <Text style={Alphabet}>y</Text>
              <Text style={Alphabet}>z</Text>

            </View>
          </View>



          {/* <View style={{ flexDirection: 'row' }}>
            <View style={{ width: '90%', flexDirection: 'row' }}>
              <View style={{ width: '20%'}}>
                <Image resizeMode={'contain'}
                  style={{ width: 30, height: 30 }}
                  source={require('../../../img/off.png')}
                />
              </View>
              <View style={{ width: '80%',backgroundColor:'steelblue'}}>
                <Text>Anne Green</Text>
                <Text>Anne Green</Text>
                <Text>Anne Green</Text>
                <Text>Anne Green</Text>
                <Text>Anne Green</Text>
                <Text>Anne Green</Text>
                <Text>Anne Green</Text>
              </View>
            </View>

            
            <ScrollView style={{ width: '10%', flexDirection: 'column' }}>
              <Text style={{textAlign:'center',textAlignVertical:'center'}}>A</Text>
              <Text style={{textAlign:'center',textAlignVertical:'center'}}>B</Text>
              <Text style={{textAlign:'center',textAlignVertical:'center'}}>C</Text>
              <Text style={{textAlign:'center',textAlignVertical:'center'}}>D</Text>
              <Text style={{textAlign:'center',textAlignVertical:'center'}}>E</Text>
              <Text style={{textAlign:'center',textAlignVertical:'center'}}>F</Text>
              <Text style={{textAlign:'center',textAlignVertical:'center'}}>G</Text>
              <Text style={{textAlign:'center',textAlignVertical:'center'}}>H</Text>
              <Text style={{textAlign:'center',textAlignVertical:'center'}}>I</Text>
            </ScrollView>
          </View> */}

          {/* MainContainer Ends */}

          {/* <TouchableOpacity onPress={()=>this.navigateNextPage()}>
            <Text>Tab1</Text>
          </TouchableOpacity> */}
        </ScrollView>

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
    borderRadius: 20,
    margin: 10,
  },
  bottom: {
    flex: 1,
    padding: 30,
    position: 'absolute',
    bottom: 10,
    alignSelf: 'flex-end',
    margin: 10,
    borderRadius: 20
  },
  searchInput: {
    padding: 10,
    borderColor: '#CCC',
    borderWidth: 1
  },
  ImageStyle: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode: 'stretch',
    alignItems: 'center',
  },
  btnLogin: {
    backgroundColor: '#12be0f',
    padding: 15,
    alignContent: 'center',
    margin: 15,
    elevation: 3
  },
  Alphabet: {
    fontSize: 17,
    textTransform: 'uppercase'
  },


  AlphabetActive: {
    fontSize: 17,
    textTransform: 'uppercase',
    backgroundColor: 'steelblue', borderRadius: 10, color: '#fff'
  },

});


export default connect()(Tab1);
