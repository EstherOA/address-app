import React from 'react';
import { StyleSheet, Text, View, TextInput, Dimensions, Platform, KeyboardAvoidingView } from 'react-native';

export default class FormInput extends React.Component {

    state = {
        text : ''
    }
    
    onChangeText = (text) => {
        this.setState({text});
    }

    onEndEditing = () => {
        const { onSubmitFormInput, name } = this.props;
        const { text } = this.state;
        if( !text) return;
        console.log(name, text);
        onSubmitFormInput(name, text);
    }

    render() {
        const { text } = this.state;
        const { label, secureInput } = this.props;  
        return (
            <View style={styles.container}>
                <TextInput underlineAndroid = 'transparent' style={styles.textInput} value={text} secureTextEntry = {secureInput} 
                onChangeText={this.onChangeText} onEndEditing = {this.onEndEditing} onSubmitEditing= {this.onEndEditing} placeholder={label}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    textInput: {
        fontSize: 17,
    },
    container: {
        width : Dimensions.get('window').width - 40,
        paddingHorizontal : 20,
        borderWidth : StyleSheet.hairlineWidth,
        borderColor :  '#969696',
        marginHorizontal : 20,
        paddingVertical : 15,
        borderRadius: 20,
    }, 
    label: {
        flexDirection : 'row',
        marginBottom : 15
    },
    text: {
        fontFamily: Platform.OS==='android' ? 'Roboto' : 'AvenirNext-Regular',
        fontSize: 15,
        color: '#969696',
        marginLeft: 7
    },
}); 