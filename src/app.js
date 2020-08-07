import React, { Component } from 'react';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import { Navigation } from 'react-native-navigation';
import registerScreens from './components/screens/screens.js';
import * as reducers from './reducers/index';
import * as appActions from './actions/index';
import thunk from 'redux-thunk';
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const reducer = combineReducers(reducers);
const store = createStoreWithMiddleware(reducer);
registerScreens(store, Provider);

export default class App extends Component {
    constructor (props) {
        super(props);
        store.subscribe(this.onStoreUpdate.bind(this));
        store.dispatch(appActions.appInitialized());
    }
    onStoreUpdate () {
        let {root} = store.getState().root;
        // handle a root change
        if (this.currentRoot !== root) {
            this.currentRoot = root;
            this.startApp(root,store);
        }
    }
    startApp (root,store) {
        switch (root) {
            case 'InitialPageState':
                Navigation.startSingleScreenApp({
                    screen: {
                        screen: 'TM.WelcomeScreen', // unique ID registered with Navigation.registerScreen
                        title: 'welcome ....', // title of the screen as appears in the nav bar (optional)
                        navigatorStyle: {navBarHidden: true, screenBackgroundColor: 'rgb(40, 39, 39)'}, // override the navigator style for the screen, see "Styling the navigator" below (optional)
                        navigatorButtons: {} // override the nav buttons for the screen, see "Adding buttons to the navigator" below (optional)
                        },
                        portraitOnlyMode: true,
                        appStyle: {
                        orientation: 'portrait'
                        }
                    });
                return;
                case 'after-login':
                Navigation.startTabBasedApp({
                tabs: [
                       {
                           label: ' ',
                           screen: 'TM.HomeTab1',
                           icon: require('./img/home.png'),
                           selectedIcon: require('./img/homeSelected.png'),
                           overrideBackPress: false,
                           title: 'Tab1',
                           navigatorStyle: {navBarHidden: true},
                           navigationOptions: { header: null }
                       },
                       {
                           label: ' ',
                           screen: 'TM.HomeTab2',
                           icon: require('./img/home.png'),
                           selectedIcon: require('./img/homeSelected.png'),
                           title: 'Tab2',
                           navigatorStyle: {navBarHidden: true},
                           navigationOptions: { header: null }
                       },
                       {
                           label: ' ',
                           screen: 'TM.HomeTab3',
                           icon: require('./img/home.png'),
                           selectedIcon: require('./img/homeSelected.png'),
                           title: 'Tab3',
                           navigatorStyle: {navBarHidden: true},
                           navigationOptions: { header: null }
                       },
                       {
                           label: ' ',
                           screen: 'TM.HomeTab4',
                           icon: require('./img/home.png'),
                           selectedIcon: require('./img/homeSelected.png'),
                           title: 'Tab4',
                           navigatorStyle: {navBarHidden: true},
                           navigationOptions: { header: null }
                       }
                       ],
                    passProps: {store:store},
                    portraitOnlyMode: true,
                    appStyle: {
                    orientation: 'portrait',
                    tabBarBackgroundColor: 'rgb(31,37,44)',
                    tabBarButtonColor: '#C7C7C7',
                    tabBarSelectedButtonColor: '#00CCCC',
                    tabBarTranslucent: true,
                    tabFontSize: 10,
                    selectedTabFontSize: 10
                },
                    tabsStyle: {
                    tabBarBackgroundColor: 'rgb(31,37,44)',
                    tabBarSelectedButtonColor: '#00CCCC',
                    tabBarButtonColor: '#C7C7C7',
                    tabBarTranslucent: false,
                    tabFontSize: 10,
                    selectedTabFontSize: 10
                }
                });
                return;
            return;    
            default:
                console.log('Not Root Found');
                console.log(root);
        }
    }
}
