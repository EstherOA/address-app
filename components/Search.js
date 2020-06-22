import React from 'react';
import { View, StyleSheet, TextInput, Dimensions, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

export default class Search extends React.Component {

    state = {
        text: ''
    }

    onChangeText = (text) => {
        this.setState({text});
    }

    onEndEditing = () => {
        const { searchFunction } = this.props;
        const { text } = this.state;
        if( !text) return;
        console.log( text);
        searchFunction(text);
    }

    render() {
        const { placeholder, focusFunction } = this.props;
        const { text } = this.state;
        return (
            <View style={styles.container}>
                <TextInput underlineColorAndroid = 'transparent' style={styles.textInput} placeholder= {placeholder} value={text}
                onChangeText={this.onChangeText} onEndEditing = {this.onEndEditing} onSubmitEditing= {this.onEndEditing} onFocus={focusFunction}
                clearButtonMode='while-editing'/> 
                <View style={styles.iconContainer}>
                    <TouchableOpacity onPress={this.onEndEditing }>
                        <Ionicons style={styles.icon} size={30} color='#ba000d' name='ios-search' />
                    </TouchableOpacity>
                </View>          
            </View>
            );
    }
}

const styles = StyleSheet.create({
    container: {
        borderColor : 'black',
        width : Dimensions.get('window').width - 30,
        backgroundColor: 'white', 
        height: 60,
        shadowOffset:{
            width: 0,
            height: 3
        },
        shadowRadius: 5,
        shadowOpacity: 0.4,
        elevation: 2 ,
        flexDirection: 'row',
        borderRadius: 10,
        padding: 10,
    },
    textInput: {
        fontSize: 17,
        marginRight: 10,
        flex: 1,
    },
    icon: {
        marginTop: 5,
    },
    iconContainer: {
        borderLeftWidth: StyleSheet.hairlineWidth,
        borderColor: '#969696',
        paddingLeft: 5,
    }
});