import React from 'react';
import { View, StyleSheet, Text, Platform, NativeModules, Dimensions, TouchableOpacity } from 'react-native';
import { MapView, Permissions, Location } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';

const {StatusBarManager} = NativeModules;
const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.00922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class MapLocation extends React.Component {

    state= {
        mapRegion: null,
        showPolygon: true,
        polygon: null
    }

    handleTap = () => {
        this.setState({
            showPolygon: false
        });
    }

    userLocation = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if ( status !== 'granted' ) {
            Alert.alert('Please enable app permission');
        }

        let location = await Location.getCurrentPositionAsync({enabledHighAccuracy:true});

        // console.log("long: "+location.coords.longitude + " lat: "+ location.coords.latitude);
        this.setState({
            userPermission : true,
            prevlat : location.coords.latitude,
            prevlong : location.coords.longitude,
            mapRegion:  {
                latitude:       location.coords.latitude,
                longitude:      location.coords.longitude,
                latitudeDelta:  LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA
            }
        })
    }

    async componentDidMount() {
        
        const { navigation } = this.props;

        const longitude = navigation.getParam('longitude');
        const latitude = navigation.getParam('latitude');

        if (longitude == null || latitude == null ) {

            // await this.userLocation();
            // console.log('Long and lat null');
            
        }else {
            console.log('Long:' + longitude + ' lat: ' + latitude);

            this.setState({
                mapRegion:  {
                    latitude:       latitude,
                    longitude:      longitude,
                    latitudeDelta:  LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA
                },    
            });
        }     
        
    }

    navigateBack = () => {
        const { navigate } = this.props.navigation;
        navigate('DrawerNavigator');
    }

    setMapViewRef = (mapView)=>{
        this.mapView  = mapView;
    }

    render() {
        const { mapRegion, showPolygon } = this.state;
        return (
            <View style={styles.container}>
                
                <MapView
                    ref={this.setMapViewRef}
                    style={styles.map}
                    region={mapRegion}
                    showsUserLocation={true}
                    // showsCompass={true}
                    showsBuildings={true}
                    showsUserLocationButton={false}
                    >
                    {/* {showPolygon && (<MapView.Polygon coordinates={polygon} 
                    fillColor="#000000"
                    strokeColor="#ba000d"
                    strokeWidth={2}
                    tappable={true}
                    onPress={this.handleTap} />) } */}
                               
                </MapView>
                <View style={styles.header}>
                    <TouchableOpacity onPress={this.navigateBack}>
                        <Ionicons name='ios-arrow-round-back' size={40} color='#ba000d'/>
                    </TouchableOpacity>                
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    map : {
        ...StyleSheet.absoluteFillObject,
    },
    container: {
        flex: 1,
        marginTop : Platform.OS === 'android' ? StatusBarManager.HEIGHT : 20,
    },
    header: {
        position: 'absolute',
        flexDirection: 'row',
        marginTop: 30,
        marginHorizontal: 25,
    },
});