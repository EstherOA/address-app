import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import  { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';


export default class Header extends React.Component {

    render() {
        const { headerText, navigateFunction, iconName } = this.props;
        return (
            <View style = {styles.container}>
                <TouchableOpacity onPress={navigateFunction}>
                    <Ionicons name={iconName} size={40} color='#ba000d'/>
                </TouchableOpacity>
                <Text style={styles.text}>{headerText}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: Dimensions.get('window').width,
        margin: 15,
    },
    text: {
        color: '#ba000d',
        fontSize: 20,
        marginHorizontal: 90,
        marginTop: 5,
    }
});