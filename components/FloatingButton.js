import React from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import  { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';


export default class FloatingButton extends React.Component {

    render() {
        const { name, pressFunction } = this.props;

        return (
            <View style={styles.container}>
                <TouchableOpacity> 
                    <Ionicons name={name} onPress={pressFunction} size={30} color='#ba000d' />
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        borderColor: 'black',
        height: 50,
        width: 50,
        borderRadius: 25,
        padding: 10,
        backgroundColor: 'white',
        alignItems: 'center',
        shadowOffset:{
            width: 0,
            height: 3
        },
        shadowRadius: 5,
        shadowOpacity: 0.4,
        elevation: 2 ,
    },
});




















