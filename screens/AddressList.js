import React from 'react';
import { View, Text, StyleSheet, Platform, NativeModules, ListView, ActivityIndicator, AsyncStorage } from 'react-native';
import  { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Header from '../components/Header';
import ListItems from '../components/ListItems';
import Footer from '../components/Footer';
import FloatingButton from '../components/FloatingButton';
import { getUserAddressList } from '../utils/api';

const { StatusBarManager } = NativeModules;
 const items = [
        {
            "id": 1,
            "name": "New House",
            "digital_address": "GA-0304-32465"
        },
        {
            "id": 3,
            "name": null,
            "digital_address": "GA-0304-1036"
        },
        {
            "id": 4,
            "name": null,
            "digital_address": "GA-0304-80468"
        },
        {
            "id": 5,
            "name": null,
            "digital_address": "GA-0304-80587"
        },
        {
            "id": 6,
            "name": null,
            "digital_address": "GA-0313-41845"
        }
    ];

export default class AddressList extends React.Component {

    state = {
        loading: true,
        isEmptyList: false,
        items: null,
    }

    handleLoad = () => {
        this.setState({ loading: false });
    }

    navigateDrawer = () => {
        const { toggleDrawer } = this.props.navigation;
        toggleDrawer();
    }

    navigateDashboard = () => {
        const { navigate } = this.props.navigation;
        navigate('Dashboard')
    }

    componentDidMount() {
        this.getList();
    }

    getList = async() => {
        const userId = 1;
        console.log(userId);
    
        const result = await getUserAddressList(userId);
        this.handleLoad();

        if(result.status == 200) {
           
            this.setState({ items: result.body });

        }else {
            this.setState({ isEmptyList: true});
        }
    }

    render() {
        const { loading, isEmptyList, items } = this.state;

        return (
            <View style={styles.container}>
                <Header headerText='Saved Addresses' navigateFunction={this.navigateDrawer} iconName='ios-menu'/>
                <View style={styles.content}>
                    { loading && (<ActivityIndicator style={StyleSheet.absoluteFill} size={'large'} color = '#ba000d' />) }
                    { !isEmptyList && (<ListItems items={items} />) }
                    { isEmptyList && (<Text>No Saved Addresses</Text>)}
                </View>
                <View style={styles.floatingButton}>
                        <FloatingButton name={'ios-add'} pressFunction={this.navigateDashboard}/>
                    </View>
                <View style={styles.footer}>
                    <Footer />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        marginTop : Platform.OS === 'android' ? StatusBarManager.HEIGHT : 20,
    },
    content: {
        flex: 1
    },
    footer: {
        alignSelf: 'flex-end',
    },
    floatingButton: {
        position: 'absolute',
        bottom: 65,
        right: 10
    }    
    
});
