import React from 'react';
import { ScrollView, StyleSheet, Image, View, Text, TouchableOpacity, AsyncStorage } from 'react-native';
import { createDrawerNavigator, DrawerItems, SafeAreaView } from 'react-navigation';
import { Avatar } from 'react-native-elements';
import Dashboard from '../screens/Dashboard';
import AddressList from '../screens/AddressList';
import LocationScreen from '../screens/LocationScreen';
import UpdateProfile from '../screens/UpdateProfile';

const imageUser = require('../assets/user.jpg');
const getUserName = async() => {
    const username = await AsyncStorage.getItem('userName');
    console.log(username);
    return username;
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 40,
        margin: 10, 
    },
    iconView: {
        borderBottomWidth : StyleSheet.hairlineWidth,
        borderBottomColor :  '#969696',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center'
    }, 
    userText: {
        fontSize: 17,
    },
    logout: {
        color: '#ba000d',
    }
  });
const CustomDrawerContentComponent = (props) => {
    return (
     <ScrollView>
      <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
        <View style={styles.iconView}>
        <Image source={imageUser} style={styles.image}/>
        <Text style= {styles.userText}>Highest!</Text>
        </View>
        <DrawerItems {...props} />
        <View >
        <TouchableOpacity onPress={handleLogout}>
            <Text>Logout</Text>
        </TouchableOpacity>
        </View>

      </SafeAreaView>
    </ScrollView>
  )};

  const handleLogout = () => { 
    AsyncStorage.removeItem('userToken');
    AsyncStorage.removeItem('userId');
    AsyncStorage.removeItem('userName');
    navigate('Login');
}  

export default DrawerNavigator = createDrawerNavigator({
    Dashboard: Dashboard,
    Addresses: AddressList,
    Search: LocationScreen,
    Profile: UpdateProfile,
    },{
        initialRouteName : 'Search', 
        contentComponent : CustomDrawerContentComponent,
        contentOptions : {
                              activeTintColor : '#A490F5',
                              inactiveTintColor : '#969696',
                              activeBackgroundColor: 'white'
                           },
    }
); 


  

