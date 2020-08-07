import { Navigation } from 'react-native-navigation';

import WelcomeScreen from './common/InitialPageState';
import Tab1 from './common/Tab1';
import Tab2 from './common/Tab2';
import Tab3 from './common/Tab3';
import Tab4 from './common/Tab4';
import PageOne from './common/PageOne';

export default (store, Provider) =>  {
	Navigation.registerComponent('TM.WelcomeScreen', () => WelcomeScreen, store, Provider);
	Navigation.registerComponent('TM.HomeTab1', () => Tab1, store, Provider);
	Navigation.registerComponent('TM.HomeTab2', () => Tab2, store, Provider);
	Navigation.registerComponent('TM.HomeTab3', () => Tab3, store, Provider);
	Navigation.registerComponent('TM.HomeTab4', () => Tab4, store, Provider);
	Navigation.registerComponent('TM.PageOne', () => PageOne, store, Provider);
}
