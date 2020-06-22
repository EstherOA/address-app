import React from 'react';
import { View, StyleSheet, Text, Dimensions, TouchableOpacity, NativeModules, Platform, Alert, ActivityIndicator } from 'react-native';
import { MapView, Permissions, Location } from 'expo';
import  { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Search from '../components/Search';
import { Marker } from 'react-native-maps';
import { getAddress } from '../utils/api';
import FloatingButton from '../components/FloatingButton';
import Button from '../components/Button';
import ModalComponent from '../components/ModalComponent';

const screen = Dimensions.get('window');

const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.00922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const { StatusBarManager } = NativeModules;

export default class Dashboard extends React.Component {

    state = {
        mapRegion : null,
        userPermission : false,
        prevlong : null,
        prevlat : null,
        markerCoords: [],
        disableAddMarker: false,
        loading: false,
        error: false,
        showModal: false,
        userId: 1,
        locationName: '',
        locationType: '',
    }

    setMapViewRef = (mapView)=>{
        this.mapView  = mapView;
    }

    navigateDrawer = () => {
        const { toggleDrawer } = this.props.navigation;
        toggleDrawer();
    }

    userLocation = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if ( status !== 'granted' ) {
            Alert.alert('Please enable app permission');
        }

        let location = await Location.getCurrentPositionAsync({enabledHighAccuracy:true});

        console.log("Location "+location.coords);
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

    placeMarker = async() => {
        const {markerCoords} = this.state;
        if(markerCoords.length == 4) {
            this.setState({
                disableAddMarker: true
            })
            return;
        }

        let location = await Location.getCurrentPositionAsync({enabledHighAccuracy:true});

        let marker = {
            id : markerCoords.length,
            latitude : location.coords.latitude,
            longitude: location.coords.longitude
        }

         this.setState({
            markerCoords  : [...markerCoords, marker]
        })
    }

    removeMarker = ()=> {
        const {markerCoords} = this.state;
        const newMarkers = markerCoords.filter((item, index) => {return (index !== (markerCoords.length - 1))})
        if(newMarkers.length < 4) {
            this.setState({
                disableAddMarker: false
            })
        }
        this.setState({markerCoords: [...newMarkers]})
    }

    onDrag = (coordinate, id) => {
        const {markerCoords} = this.state;
        const newMarkers = markerCoords.map((item, index) => {
            if (index === id){
                const coords = { 
                    id: item.id,
                    latitude: coordinate.latitude,
                    longitude: coordinate.longitude
                }
                return coords
            }
            return item
        });
        this.setState({
            markerCoords: [...newMarkers]
        })
    }

    onPanDrag = ({nativeEvent: {coordinate}}) => {
        const {markerCoords} = this.state;
        if(markerCoords.length === 0)
            return;
        const id = markerCoords.length - 1;
        const newMarkers = markerCoords.map((item, index) => {
            if (index === id){
                const coords = { 
                    id: item.id,
                    latitude: coordinate.latitude,
                    longitude: coordinate.longitude
                }
                return coords
            }
            return item
        });
        this.setState({
            markerCoords: [...newMarkers]
        })
    }

    handleOnPress = async() => {
        const {markerCoords} = this.state;
        if(markerCoords.length < 4 ) {
            Alert.alert('Please place markers to generate address!');
            return;
        }
        const coords= markerCoords;
        this.openModal();
        console.log(coords);
        this.setState({loading: true});
        const address = await getAddress(coords);
        this.setState({loading: false});

        if(address.status == 200){
            Alert.alert('Digital address is: ' + address.body.digital_address);
            this.setState({ registeredAddress: address});
        } else if(address.status == 400) {
            Alert.alert(address.message);
        } else {
            Alert.alert("Error while generating digital address");
        }
       
        console.log(address);

    }

    async componentDidMount() {
        Alert.alert('Place four markers around the corners of your property');

        await this.userLocation();

        // this.watchID = navigator.geolocation.watchPosition((position) => {
        //     // Create the object to update this.state.mapRegion through the onRegionChange function
        //     let region = {
        //     latitude:       position.coords.latitude,
        //     longitude:      position.coords.longitude,
        //     latitudeDelta:  LATITUDE_DELTA,
        //     longitudeDelta: LONGITUDE_DELTA
        //     }
        //     this.onRegionChange(region, region.latitude, region.longitude);
        // }, (error)=>console.log( error), { enableHighAccuracy: true});
        
    }

    onRegionChange(region, lastLat, lastLong) {
        this.setState({
          mapRegion: region,
          // If there are no new values set the current ones
          prevlat: lastLat || this.state.prevlat,
          prevlong: lastLong || this.state.prevlong
        });
      }

      componentWillUnmount() {
        // navigator.geolocation.clearWatch(this.watchID);
      }

      onMapPress(e) {
        console.log(e.nativeEvent.coordinate.longitude);
        let region = {
          latitude:       e.nativeEvent.coordinate.latitude,
          longitude:      e.nativeEvent.coordinate.longitude,
          latitudeDelta:  LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA
        }
        this.onRegionChange(region, region.latitude, region.longitude);
      }

      centerMap = ()=> {
          this.userLocation();
        const { latitude, longitude, latitudeDelta, longitudeDelta } = this.state.mapRegion;

        this.mapView.animateToRegion ({
          latitude, longitude, latitudeDelta, longitudeDelta
        })
    }

    openModal = () => {
        this.setState({
            showModal: true,
        });
    }

    render() {
        const { mapRegion,markerCoords, disableAddMarker, loading, showModal } = this.state;
        //console.log(markers);
        const renderMarkers = markerCoords.map(({latitude, longitude}, index) => {
            return (<MapView.Marker 
                key={index}
                draggable
                pinColor={'#ba000d'}
                coordinate={{latitude,longitude}}
                onDragEnd={(e) => {
                    this.onDrag(e.nativeEvent.coordinate, index)
                    }}>
                </MapView.Marker>)
        });

        const renderModal = () => {
            return 
           ( <View style={styles.modal}>
                <View>
                    <Text>Fill in the location details</Text>
                </View>
                <View>
                    <FormInput placeholder='Location Name' secureInput={false}/>
                </View>
                <View >
                    <Text>Type of Address</Text>
                    <CheckBox center title='Business' checkedIcon='dot-circle-o' uncheckedIcon='circle-o' checked={true} />
                    <CheckBox center title='Residence' checkedIcon='dot-circle-o' uncheckedIcon='circle-o' checked={false} />
                    <CheckBox center title='Public Property' checkedIcon='dot-circle-o' uncheckedIcon='circle-o' checked={false} />
                </View>
            </View>)
        }

        return (
            <View style={styles.container}>
                { loading && (<ActivityIndicator style={StyleSheet.absoluteFill} size={'large'} color = '#ba000d' />) } 
                <MapView
                    ref={this.setMapViewRef}
                    style={styles.map}
                    region={mapRegion}
                    showsUserLocation={true}
                    showsCompass={true}
                    showsBuildings={true}
                    showsUserLocationButton={false}
                    // onPanDrag={this.onPanDrag}
                    >
            
            {renderMarkers}
            {markerCoords.length > 2 && 
            <MapView.Polygon coordinates={markerCoords} fillColor="#d81b60"
                    strokeColor="#ba000d"
                    strokeWidth={2}
                    tappable={true}
                    onPress={()=>{}} />            
            }
                </MapView>
                <View style={styles.header}>
                <TouchableOpacity onPress={this.navigateDrawer}>
                    <Ionicons name='ios-menu' size={40} color='#ba000d'/>
                </TouchableOpacity>
                <View style={styles.cardContainer}>
                <TouchableOpacity style={styles.marker} onPress={this.placeMarker} disabled={disableAddMarker} >
                <Text>Add Marker</Text>
                <MaterialCommunityIcons style={styles.icon} name='map-marker-plus' color='green' size={20}/>
                </TouchableOpacity >
                <TouchableOpacity style={styles.marker} onPress={this.removeMarker}>
                <Text>Remove Marker</Text>
                <MaterialCommunityIcons style={styles.icon} name='map-marker-minus' color='red' size={20}/>
                </TouchableOpacity>
                </View>  
                <View>
                    {/* <ModalComponent showModal={true} renderItems={this.renderModal} /> */}
                </View>              
                </View>
                <View style={styles.buttons} >
                    <Button text='Generate Address' onPressButton={this.handleOnPress} />
                    <View style={styles.floatingButton}>
                        <FloatingButton name={'md-locate'} pressFunction={this.centerMap}/>
                    </View>
                </View>
            </View>
        );
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
    search: {
       marginLeft: 20,
    },
    cardContainer: {
        borderColor : 'black',
        width : Dimensions.get('window').width - 80,
        backgroundColor: 'white', 
        height: 50,
        shadowOffset:{
            width: 0,
            height: 3
        },
        shadowRadius: 5,
        shadowOpacity: 0.4,
        elevation: 2,
        marginLeft: 10,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    marker: {
        marginHorizontal: 15,
        marginVertical: 15,
        flexDirection: 'row'
    },
    icon: {
        marginLeft: 5,
    },
    buttons: {
        position: 'absolute',
        bottom: 20,
        right: 10,
        flexDirection: 'row',
    },
    floatingButton: {
        marginLeft: 10,
    }, 
    modal: {
        flex: 1
    }   
});