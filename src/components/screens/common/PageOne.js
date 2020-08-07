import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, Platform } from 'react-native';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import getDirections from "react-native-google-maps-directions";
import SegmentedControlTab from 'react-native-segmented-control-tab';

export class PageOne extends Component {
    constructor(props) {
        super(props)
        this.state = {
            customStyleIndex: 0,
        }
    }

    handleCustomIndexSelect = (index) => {
        this.setState(prevState => ({ ...prevState, customStyleIndex: index }))
    }

    navigateMapsPage() {

        // Get Latitude and Longitude of the User
        navigator.geolocation.getCurrentPosition(
            position => {
                console.log("position==" + JSON.stringify(position));
                // this.setState({ startPosition: position.coords.latitude});
                // this.setState({ endPosition: position.coords.longitude});

                var position1 = position.coords.latitude;
                var position2 = position.coords.longitude;
                this.setState({ startPosition: Number.parseFloat(position1).toFixed(7).toString() });
                this.setState({ endPosition: Number.parseFloat(position2).toFixed(7).toString() });

                this.setState({
                    latittude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    error: null
                });
            },
            error => this.setState({ error: error.message }),
            //{ enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
            { enableHighAccuracy: false, timeout: 25000, maximumAge: 3600000 }


        );

        var tempLat = this.state.lattitude;
        var tempLong = this.state.longitude;

        // console.log("tempLat-",tempLat);
        // console.log("tempLong-",tempLong);


        const data = {
            source: {
                latitude: this.state.startPosition,
                longitude: this.state.endPosition
            },
            destination: {
                latitude: Number(this.state.deliveryLatitude),
                longitude: Number(this.state.deliveryLongitude)
            },

            params: [
                {
                    key: "travelmode",
                    value: "driving" // may be "walking", "bicycling" or "transit" as well
                },
                {
                    key: "dir_action",
                    value: "navigate" // this instantly initializes navigation using the given travel mode
                }
            ]
        };
        //console.log("data-",data.destination);
        getDirections(data);

    }
    navigateBack() {
        if (Platform.OS == 'ios') {
            this.props.navigator.toggleTabs({
                to: 'shown',
                animated: true,
            });
        }
        this.props.navigator.pop();
    }

    render() {
        const { employeesData } = this.props;
        const { tabsContainerStyle, tabStyle, activeTabStyle, tabTextStyle, activeTabTextStyle,topOpacity,setContainer } = styles;
        const { customStyleIndex } = this.state;
        return (
            <View>

                {/* Header Starts */}

                <View style={topOpacity}>
                    <View style={{ flexDirection: 'row', margin: 10 }}>
                        <View style={{ width: '10%' }}>
                            <TouchableOpacity
                                onPress={() => this.navigateBack()}
                            >
                                <Image resizeMode={'contain'}
                                    style={{ width: 30, height: 30 }}
                                    source={require('../../../img/back.png')}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    {/* Header Starts */}


                    {/* MainContainer Starts */}

                    <View style={{ alignItems: 'center' }}>
                        <Image resizeMode={'contain'}
                            style={{ width: 70, height: 70, elevation: 4 }}
                            source={employeesData.emp_photo_path}
                        />
                    </View>
                    <View style={setContainer}>

                        <View>
                            <SegmentedControlTab
                                values={['Details', 'Hierarchy']}
                                selectedIndex={customStyleIndex}
                                onTabPress={this.handleCustomIndexSelect}
                                borderRadius={0}
                                borderWidth={2}
                                tabsContainerStyle={tabsContainerStyle}
                                tabStyle={tabStyle}
                                activeTabStyle={activeTabStyle}
                                tabTextStyle={tabTextStyle}
                                activeTabTextStyle={activeTabTextStyle}
                            />

                            {customStyleIndex === 0
                                &&
                                <View>
                                    <Text></Text>
                                    <Text> Employee Name </Text>
                                    <Text style={{ fontWeight: 'bold', fontSize: 15, paddingBottom: 10 }}> {employeesData.emp_name}</Text>
                                    <Text></Text>
                                    <Text> Employee Department </Text>
                                    <Text style={{ fontWeight: 'bold', fontSize: 15, paddingBottom: 10 }}> {employeesData.emp_department}</Text>
                                    <Text></Text>
                                    <Text> Employee Designation </Text>
                                    <Text style={{ fontWeight: 'bold', fontSize: 15, paddingBottom: 10 }}> {employeesData.emp_designation}</Text>
                                    <Text></Text>


                                    <Text> Employee Address </Text>
                                    <TouchableOpacity
                                        style={styles.CSMSMapsDirection}
                                        onPress={() => this.navigateMapsPage()}
                                    >
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={{ width: '50%', fontWeight: 'bold', fontSize: 15, paddingBottom: 10 }}> {employeesData.emp_address}</Text>
                                            <View style={{ width: '50%', alignItems: 'flex-end' }}>
                                                <Image resizeMode={'contain'}
                                                    style={{ width: 50, height: 50, marginBottom: 10 }}
                                                    source={require('../../../img/ProfileRoute.png')}
                                                />
                                            </View>
                                        </View>

                                    </TouchableOpacity>
                                </View>
                            }

                            {customStyleIndex === 1
                                &&
                                <View>
                                    <Text></Text>
                                    <Text style={{ fontWeight: 'bold', fontSize: 15, paddingBottom: 10 }}>Hierarchy Details</Text>
                                </View>
                            }
                        </View>
                    </View>
                </View>
                {/* MainContainer Starts */}
            </View>
        );
    }
}

const styles = {

    container: {
        backgroundColor: '#F5FCFF',

        width: '100%'
    },
    wholeContainer: {

    },
    OrderIconsPSRC: {
        width: 37, height: 37
    },
    imageiconStyle: {
        width: 25,
        height: 25,
        marginTop: '5%',
    },
    CSMSMapsDirection: {
        marginRight: '8%',
        fontFamily: 'GothamBook',
    },
    touchiconviewstyle: {
        color: '#fff',
        marginEnd: '3%',
    },
    profileIdDetails: {
        flexDirection: 'row',
        marginLeft: '2%'
    },
    profileDetails: {
        alignItems: 'center',
    },
    tabsContainerStyle: { height: 50, backgroundColor: '#F2F2F2' },
    closeImage: {
        width: 7,
        height: 7,
        marginTop: '8%',
        marginLeft: '85%'
    },
    viewheaderStyle: {
        flexDirection: 'row',
        backgroundColor: '#32408b',
        borderWidth: 1,
        height: 50,
        fontFamily: 'GothamBook'
    },
    profileImage: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        height: 50,
        //  marginTop: '23%',
        marginLeft: '5%',
    },
    header: {
        flexDirection: 'column',
        backgroundColor: '#333a8b',
        alignItems: 'center',
        color: '#FFFFFF',
        marginTop: '2%',
        marginLeft: '2%',
        marginRight: '2%',
        borderBottomStartRadius: 140,
        borderBottomRightRadius: 140,
        // height: 220,
        // height: responsiveHeight(38),
    },
    profileName: {
        color: '#FFFFFF',
        padding: 5,
        fontSize: 24,
        marginTop: '5%'
    },
    profileID: {
        color: '#FFFFFF',

        marginBottom: '5%',
        marginRight: '5%',
        marginTop: '5%',
        fontSize: 18
    },
    userAvailability: {
        flexDirection: 'row',
        marginTop: '2%',
    },
    userDetails: {
        color: '#000000',
        fontSize: 14,
        marginStart: '12%',
        marginTop: '5%'
    },
    switchBar: {
        marginLeft: '1%',
        fontSize: 20,
    },
    punchOutDetails: {
        borderRadius: 70,
        width: 70,
        height: 70,
        backgroundColor: '#323a8b',
        borderColor: '#FFFFFF',
        borderWidth: 3,
        marginTop: '5%',
    },

    punchOut: {
        flexDirection: 'column',
    },
    punchText: {
        fontSize: 14,
        color: '#FFFFFF',
        marginTop: '25%',
        marginStart: '8%'
    },
    outText: {
        fontSize: 14,
        color: '#FFFFFF',
        marginStart: '23%'
    },
    InText: {
        fontSize: 14,
        color: '#FFFFFF',
        marginStart: '35%'
    },
    mainText: {
        marginTop: '10%',
    },
    detailsSetStart: {
        flexDirection: 'row',
        marginTop: '2%',
        width: '100%'
    },
    detailsSet: {
        flexDirection: 'row', margin: '2%'
    },
    businessDetails: {
        width: '70%',
        flexDirection: 'column',
    },
    businessDetailText: {
        flexDirection: 'column',

        width: '30%',
    },
    businessType: {
        color: '#323a8b',
        fontSize: 16,
    },
    businessName: {
        color: '#000000',
        fontSize: 14
    },
    blank: {
        marginBottom: '12%'
    },
    logoutFooter: {
        marginTop: '15%',
        backgroundColor: '#323a8b',
        flexDirection: 'row',
        justifyContent: 'center',
        height: 100
    },
    logoutImage: {
        height: 20,
        width: 20,
        marginLeft: '40%',
        marginTop: '6%',

    },
    logoutText: {
        color: '#fff',
        marginLeft: '2%',
        fontSize: 20,
        marginTop: '3%',
    },
    oval: {

        marginLeft: '25%',
        width: 220,
        height: 70,
        backgroundColor: '#FFF',
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 80,
        transform: [
            { scaleX: 2 }
        ]
    },


    MainFooter: {
        borderColor: '#ccc',
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 15,
        shadowColor: '#000',
        shadowOffset: { height: 1, width: 1 },
        shadowOpacity: 0.2,
        elevation: 2,
        position: 'relative',
        shadowRadius: 5,

    },
    footer: {

        color: '#fff',
        marginBottom: 60,
        backgroundColor: '#fff',
    },
    submitviewStyle: {
        flexDirection: 'row',
        backgroundColor: '#333a8b',
        height: 110,
        width: '100%',
        marginTop: 100,
        shadowOffset: { width: 0, height: 0 },

    },
    submittextStyle: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: '3%',
        marginRight: 5,
        shadowColor: '#000',
        marginTop: '5%'
    },


    // New Styles

    LineStyleDash: {
        borderWidth: 1,
        marginLeft: 180,
        marginRight: 180,
        borderColor: '#eee',
        margin: 5
    },


    borderhrc: {
        borderWidth: 0.5,
        marginTop: 20,
        marginBottom: 20,
        borderColor: '#cfc8b6',
        flexDirection: 'column',
    },


    DashTitle: {
        fontSize: 18, fontFamily: 'GothamBook',
        fontWeight: 'normal', marginTop: '15%',
        textAlign: 'center',
    },

    DashTitleValue: {
        fontSize: 22, fontFamily: 'GothamBook',
        fontWeight: 'normal', marginTop: '3%',
        textAlign: 'center'
    },
    submitgetin: {
        width: '90%',
        height: 40,
        shadowColor: 'black',
        shadowOpacity: 1.0,
        marginLeft: '5%',
    },
    submitstyle: {

        height: 40,
        marginStart: '35%',
        shadowOffset: { width: 0, height: 0 },

    },
    logoblock: {
        width: 170,
        height: 100,

        borderRadius: 20,
        marginLeft: '20%',
        borderWidth: 1

    },
    LoginButton: {
        textAlign: 'center',
        fontFamily: 'GothamBook',
        fontSize: 15,
        color: '#fff',
        width: '100%',
        shadowOffset: { width: 0, height: 0 },
    },
    ModalCard: {
        elevation: 50,
        backgroundColor: '#fff',
        width: '100%',
        height: 'auto',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        position: 'absolute',
        bottom: 0,
        shadowOffset: { width: 10, height: 10 },
        shadowColor: 'black',
        shadowOpacity: 1.0
    },
    modalcrossimageview: {
        marginLeft: 'auto',
        marginRight: '5%'
    },
    closeiconStyle: {
        width: 33,
        height: 33,
        marginTop: '5%'
    },
    NameText: {
        fontSize: 16,
        fontFamily: 'GothamBook',
        color: '#000000',
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: '1%'
    },
    statusText: {
        fontSize: 16,
        fontFamily: 'GothamBook',
        textAlign: 'center',
        marginTop: '1%'
    },
    cardStyles: {
        elevation: 2,
        backgroundColor: '#fff',
        width: '96%',
        height: 'auto',
        margin: '1%',
        borderRadius: 5,
    },
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
        marginTop: 0,
    },
    availSectionStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        backgroundColor: '#fff',
        borderWidth: 0.5,
        borderColor: '#000',
        height: 50,
        borderRadius: 5,
        margin: '1%',
    },
    InputTextPadding: {
        flex: 1,
        padding: 10,
    },
    prfimage: { width: 50, height: 50, borderRadius: 37.5, marginTop: '35%' },
    availstyle: { flexDirection: 'row', marginTop: '5%' },
    availtextstyle: { flexDirection: 'row', width: '42%', height: 35, borderRadius: 20, backgroundColor: '#fff', },
    availView: { width: '60%' },
    toggleview: { marginTop: '2%' },
    unavailView: { marginTop: '1%', marginStart: '2%' },
    timerstyle: { width: 30, height: 30, },
    mainbuttonview: { width: '100%', flexDirection: 'row', marginLeft: '3%', marginRight: '3%', shadowOffset: { width: 0, height: 0 }, },
    subview: { width: '50%' },
    buttonview: { flex: 1, flexDirection: 'row', width: '80%', shadowOffset: { width: 0, height: 0 }, },
    userstyle: { width: 70, height: 70, borderRadius: 37.5, marginTop: '1%' },
    partnerviewstyle: { alignContent: 'center', backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', },
    partnerstyle: { width: 250, height: 50 },
    addressView: { marginTop: '3%', marginBottom: '3%' },
    addressText: { color: '#000000', fontWeight: 'bold', fontFamily: 'GothamBook', fontSize: 14, textAlign: 'center', },
    addresscode: { fontFamily: 'GothamBook', fontSize: 14, marginStart: '15%', padding: 2 },
    landmarkstyle: { fontFamily: 'GothamBook', fontSize: 14, marginStart: '17%', padding: 2 },
    callText: { color: '#000000', fontWeight: 'bold', fontFamily: 'GothamBook', fontSize: 14, textAlign: 'center', marginTop: '2%', },
    cardView: {
        elevation: 50, backgroundColor: '#fff', width: '100%', height: 'auto', borderTopRightRadius: 20,
        borderTopLeftRadius: 20, position: 'absolute', bottom: 0, shadowOffset: { width: 10, height: 10, },
        shadowColor: 'black', shadowOpacity: 1.0,
    },
    firstview: { width: '100%', marginTop: '5%', flexDirection: 'row' },
    unavailheading: { width: '70%', },
    availTrackText: { fontSize: 18, fontFamily: 'GothamBook', color: '#32408b', marginLeft: '25%', padding: 5 },
    closeview: { width: '30%', height: 'auto' },
    availmainstyle: { marginTop: '2%', marginBottom: '2%', height: 300 },
    availmainheading: { width: '100%', margin: '2%', flexDirection: 'row' },
    availsubview: { width: '32%', },
    availsubstyle: { width: '30%' },
    availText: { fontSize: 15, fontFamily: 'GothamBook', color: '#000000', textAlign: 'center' },
    availblock: { width: '100%', marginLeft: '5%', marginRight: '2%', flexDirection: 'row', marginBottom: '2%', marginTop: '2%' },
    availblockstyle: { width: '32%', },
    availblocktext: { fontSize: 14, fontFamily: 'GothamBook', color: '#000000', textAlign: 'center' },
    cardmainview: { width: '100%', marginTop: '1%', flexDirection: 'row', marginBottom: '1%' },
    unavailableheading: { fontSize: 18, fontFamily: 'GothamBook', color: '#32408b', marginLeft: '45%', padding: 5 },
    fromtext: { marginStart: '5%', color: '#000000', marginTop: '15%' },
    fromcard: { flexDirection: 'row' },
    fromcardview: { width: '40%' },
    fromblock: { width: '60%', marginTop: '1%' },
    selectview: { width: '40%', flexDirection: 'row' },
    selecttext: { marginStart: '5%', color: '#000000', marginTop: '15%' },
    hourimage: { width: 15, height: 15, borderRadius: 40, marginStart: '15%', marginTop: '18%' },
    selectstyle: { width: '60%', marginTop: '3%' },
    selectreason: { color: '#000000', marginStart: '2%', marginTop: '2%', marginBottom: '2%' },
    submitblock: { width: '70%', marginTop: '2%', marginBottom: '3%', alignSelf: 'center' },
    submitbuttonview: { flex: 1, flexDirection: 'row', shadowOffset: { width: 0, height: 0 }, },
    CancelIconMainView: {
        width: '10%', padding: 5,
    },

    CancelIconSubView: {
        marginRight: '5%'
    },


    ChPhyAcceptBtn: {
        color: '#fff',
        marginLeft: '3%',
        marginBottom: '3%',
        padding: '2%',
        width: '100%',
        // height: '100%',
        shadowOffset: { width: 0, height: 0 },
    },
    ChPhyRejectBtn: {
        borderWidth: 1,
        borderColor: '#ccc',
        marginLeft: '3%',
        marginBottom: '3%',
        padding: '2%',
        width: '100%',
        // height: '100%',
        shadowOffset: { width: 0, height: 0 },
    },


    LogoutViewBtn: {
        flex: 1,
        flexDirection: 'row',
        // padding: 20,

        shadowOffset: { width: 0, height: 0 },
    },
    LogoutBtn: {
        width: '100%',
        height: 50, margin: 10,
        justifyContent: 'center',
        // alignItems: 'center',
        textAlign: 'center',
        borderRadius: 4,
        elevation: 2,
        shadowColor: 'black',
        shadowOpacity: 1.0,
        // marginLeft: '20%',
        shadowOffset: { width: 0, height: 0 },
        backgroundColor: '#32408b', //ff3232 - Logout // 32408b - Back
    },
    LogoutBtnText: {
        textAlign: 'center',
        fontFamily: 'GothamBook',
        fontSize: 15,
        color: '#fff',
        // width: '80%',
        shadowOffset: { width: 0, height: 0 },
    },

    SubmitBtn: {
        width: '100%',
        height: 40,
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 20,
        elevation: 2,
        shadowColor: 'black',
        shadowOpacity: 1.0,
        marginLeft: '15%',
        backgroundColor: '#75ae42', //ff3232 - Logout // 32408b - Back
    },
    SubmitBtnText: {
        textAlign: 'center',
        fontFamily: 'GothamBook',
        fontSize: 15,
        color: '#fff',
    },

    topOpacity: {
        backgroundColor: 'rgba(0, 0, 0, 0.48)' 
    },

    setContainer: {
        padding: 20, backgroundColor: '#fff', marginTop: '20%'
    }

};

export default connect()(PageOne);
