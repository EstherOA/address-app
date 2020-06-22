import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Dimensions, Platform} from 'react-native';
// import { LinearGradient } from 'expo';

export default class Button extends React.Component {
     
    render() {
        const { text, onPressButton } = this.props;

        return (
            <View style = {styles.container}>           
                <TouchableOpacity style= {styles.touchable} onPress = {onPressButton} >
                    <Text style = {styles.text}>{text}</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({

    container : {
        alignItems : 'center',
        justifyContent : 'center',
        backgroundColor : '#ba000d',
        shadowOffset:{
            width: 0,
            height: 3
        },
        shadowRadius: 5,
        shadowOpacity: 0.4,
        elevation: 2 ,
        width: Dimensions.get('window').width - 150,
        height: 50,
        borderRadius: 5,
    },
    text : {
        color: 'white',
        fontSize : 18,
        fontFamily: Platform.OS==='android' ? 'Roboto' : 'AvenirNext-Regular',
    },
    touchable : {
        padding : 20,
        alignItems : 'center',
        justifyContent : 'center',
        width : Dimensions.get('window').width - 50,       
    }
});