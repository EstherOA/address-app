import React from 'react';
import { View, StyleSheet, Text, Platform, TouchableOpacity, Modal, Dimensions } from 'react-native';
import FormInput from '../components/FormInput';
import Ionicons from '@expo/vector-icons/Ionicons';


export default class ModalComponent extends React.Component {

    state = {
        modalVisible
    }
    render() {
        const { showModal, renderItems } = this.props;
        return(
            <View style={styles.modal}>
                <Modal
                    animationType='slide'
                    transparent={false}
                    visible={showModal}
                    onRequestClose={() => { }}
                >

                {renderItems}
                   
                </Modal>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        height: Dimensions.get('window').height/2,
        width: Dimensions.get('window').width/2,
        shadowOffset:{
            width: 0,
            height: 3
        },
        shadowRadius: 5,
        shadowOpacity: 0.4,
        elevation: 2 ,
        borderColor: 'black',
    }
});




