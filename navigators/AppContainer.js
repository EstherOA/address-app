import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import DrawerNavigator from '../navigators/DrawerNavigator';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import Splash from '../screens/Splash';
import MapLocation from '../screens/MapLocation';


export const AppContainer = createAppContainer( createSwitchNavigator({
    Splash: Splash,
    Login: Login,
    SignUp: SignUp,
    MapLocation: MapLocation,
    DrawerNavigator: DrawerNavigator,
},{
    'initialRouteName': 'Splash'
} ));