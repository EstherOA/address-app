import React from 'react';
import { View, StyleSheet, Text, Platform, NativeModules, ScrollView, ActivityIndicator, Image } from 'react-native';
import ListItems from '../components/ListItems';
import { getUser } from '../utils/api';

const { StatusBarManager } = NativeModules;
const imageUser = require('../assets/user.jpg');


export default class UpdateProfile extends React.Component {

    state = {
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        loading: true,
        error: false
    }

    handleLoad = () => {
        this.setState({loading: false})
    }

    getUserInfo = async() => {
        const userId = 1;
        const result = await getUser(userId);
        this.handleLoad;

        if(result.status == 200) {
            this.setState({
                firstName: result.body.firstName,
                lastName: result.body.lastName,
                phoneNumber: result.body.phoneNumber,
                email: result.body.email,
            });
        }else {
            this.setState({error: true})
        }
    }

    render() {
        const { firstName, lastName, email, phoneNumber, loading, error } = this.state;
        return (
            <ScrollView>
                { loading && (<ActivityIndicator style={StyleSheet.absoluteFill} size={'large'} color = '#ba000d' />) }

                { !error && ( 
                   <View style={styles.container}>
                    <View style={styles.iconView}>
                    <Image source={imageUser} style={styles.image}/>
                    </View>
                    <View style={styles.userInfo}>
                    <Text>First Name</Text>
                    <Text>{firstName}</Text>
                    </View>
                    <View style={styles.userInfo}>
                    <Text>Last Name</Text>
                    <Text>{lastName}</Text>
                    </View>
                    <View style={styles.userInfo}>
                    <Text>Email</Text>
                    <Text>{email}</Text>
                    </View>
                    <View style={styles.userInfo}>
                    <Text>Phone Number</Text>
                    <Text>{phoneNumber}</Text>
                    </View>
                    </View>
                    ) }
                    { error && (<Text>Could not fetch user details</Text>)}
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop : Platform.OS === 'android' ? StatusBarManager.HEIGHT : 20,
    },
    userInfo: {
        borderBottomColor: '#969696',
        padding: 10,
        alignSelf: 'center',
    },
    iconView: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        backgroundColor: '#ba000d',
        padding: 15,
    },     
    image: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginHorizontal: 50, 
    },
});