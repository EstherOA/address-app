import React from 'react';
import { View, StyleSheet, TextInput, Dimensions, TouchableOpacity, Text } from 'react-native';
import  { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export default class Card extends React.Component {

    state={
        coords: null,
    } 

    addMarker() {
        const { function1 } = this.props;
       function1();
    }
    removeMarker() {
        const { function2 } = this.props;
        function2();
    }

    render() {

        return (
            <View style={styles.container}>
            <TouchableOpacity style={styles.marker} onPress={this.addMarker}>
            <Text>Add Marker</Text>
            <MaterialCommunityIcons style={styles.icon} name='map-marker-plus' color='green' size={20}/>
            </TouchableOpacity >
            <TouchableOpacity style={styles.marker} onPress={this.removeMarker}>
            <Text>Remove Marker</Text>
            <MaterialCommunityIcons style={styles.icon} name='map-marker-minus' color='red' size={20}/>
            </TouchableOpacity>
            </View>
              
            );
    }
}

const styles = StyleSheet.create({
    container: {
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
    }

});