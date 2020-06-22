import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, NativeModules, Platform, ActivityIndicator } from 'react-native';

import Search from '../components/Search';
import Header from '../components/Header';
import ListItems from '../components/ListItems';
import LocationList from '../components/LocationList';
import Button from '../components/Button';
import Footer from '../components/Footer';
import { getSearchAddress, getSparqlLocation } from '../utils/api';

const { StatusBarManager } = NativeModules;


export default class LocationScreen extends React.Component {

    state = {
        items: [],
        searchResult: null,
        isEmptyList: false,
        isLocation: false,
        longitude: -0.1879333,
        latitude: 5.6357647,
        locationlist: [],
        loading: false
    }

    handleLoad = () => {
        const {loading} = this.state;
        this.setState({ loading: !loading });
    }

    navigateDrawer = () => {
        const { toggleDrawer } = this.props.navigation;
        toggleDrawer();
    }

    searchLocation = async(text) => {
        this.handleLoad();
        const { items, locationlist, isLocation } = this.state;
        if (isLocation) {
            const result = await getSparqlLocation(text);
            this.handleLoad();
            if(result.status == 200) {
                let item = {
                    id: result.body.id,
                    name: result.body.name,
                }
                this.setState({ 
                    locationlist: [...locationlist, locationlist],
                });
                console.log(locationlist);
            }else {
                this.setState({ isEmptyList: true});
            }
        } else {
            const result = await getSearchAddress(text);
            this.handleLoad();
            if(result.status == 200) {
                let item = {
                    id: result.body.id,
                    name: result.body.name,
                    type: result.body.type,
                    digital_address: result.body.digital_address,
                }
                this.setState({ 
                    items: [...items, item],
                });
            
                console.log(this.state.items);
            }else {
                this.setState({ isEmptyList: true});
            }
        }
        
    }

    showOnMap = () => {
        const { longitude, latitude } = this.state;

        const { navigate } = this.props.navigation;

        navigate('MapLocation', {
            longitude : longitude,
            latitude: latitude
        });
        
    }

    render() {
       const { items, isEmptyList, isLocation, loading } = this.state;

        return (
            <View style={styles.container}>
                <View >
                    <Header headerText='Location' navigateFunction={this.navigateDrawer} iconName='ios-menu'/>
                </View>
                <View style={styles.search}>
                    <Search placeholder='Enter digital address/location' searchFunction={this.searchLocation} />
                </View>
                <View style={styles.resultList}>
                { loading && (<ActivityIndicator style={StyleSheet.absoluteFill} size={'large'} color = '#ba000d' />) }
                { !isEmptyList && !isLocation && (<ListItems items={items} /> ) }
                { !isEmptyList && isLocation && (<LocationList items={locationlist} />) }

                { isEmptyList && (<Text>No Match Found</Text>) }
                </View>

                <View style={styles.footer}>
                    <Footer mapFunction={this.showOnMap}/>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop : Platform.OS === 'android' ? StatusBarManager.HEIGHT : 20,
        flexDirection: 'column',
    },
    header: {

    },
    search: {
        alignSelf: 'center',
    },
    resultList: {
        flex: 1,
    },
    button: {
        position: 'absolute',
        bottom: 70,
        left: 80,
    },
    footer: {
        alignSelf: 'flex-end',
    }
});
