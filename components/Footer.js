import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export default class Footer extends React.Component {

    navigateMap = (polygon) => {
        // const { navigate } = this.props.navigation;
        // navigate('MapLocation', {
        //     'polygon': polygon
        // });
    }

    render() {
        const { mapFunction } = this.props;

        return (
            <View style={styles.container}>
                <View style={styles.linkIcons}>
                    <TouchableOpacity onPress={mapFunction}>
                        <Ionicons name='ios-map' size={20} color='#ba000d' />
                        <Text style={styles.text}>Map</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.linkIcons}>
                    <TouchableOpacity>
                        <MaterialCommunityIcons name='map-marker-distance' size={20} color='#ba000d' />
                        <Text style={styles.text}>Route</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.linkIcons}>
                    <TouchableOpacity>
                        <MaterialCommunityIcons name='ambulance' size={20} color='#ba000d' />
                        <Text style={styles.text}>SOS</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.linkIcons}>
                    <TouchableOpacity>
                        <Ionicons name='md-share' size={20} color='#ba000d' />
                        <Text style={styles.text}>Share</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        height: 50, 
        width: Dimensions.get('window').width-20,
        justifyContent: 'space-around',
        paddingVertical: 10,
        shadowOffset:{
            width: 0,
            height: 3
        },
        shadowRadius: 5,
        shadowOpacity: 0.4,
        borderColor: 'black',
        elevation: 2 ,
        margin: 10
    },
    linkIcons: {
        alignItems: 'center',
    },
    text: {
        color: '#ba000d',
    }
});