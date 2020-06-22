import React from 'react';
import { View, StyleSheet, ImageBackground, Text, AsyncStorage, Dimensions } from 'react-native';

const splashImage = require('../assets/splash.jpg');

export default class Splash extends React.Component {
    
    async componentDidMount() {
        const userToken = await AsyncStorage.getItem('userToken');

        setTimeout(() => {
            this.props.navigation.navigate(userToken ? 'DrawerNavigator' : 'Login');
        }, 2000); 
    }

    render() {
        return(
            <View style={styles.imageView}>
                <ImageBackground source={splashImage} style={{width: '100%', height: '120%'}}>
                    <Text style={styles.text}>AsaaseGPS</Text>
                </ImageBackground>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    imageView: {
        flex: 1,
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width, 
    },
    text: {
        color: '#ba000d',
        fontSize: 30,
        fontStyle: 'italic',
    }
});