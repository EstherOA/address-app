import React from 'react';
import { View, Text, StyleSheet, Platform, NativeModules, FlatList, TouchableOpacity } from 'react-native';

const keyExtractor = ({id}) => id.toString();

export default class ListItems extends React.Component {

    // static propTypes = {
    //     items: PropTypes.arrayOf(
    //     PropTypes.shape({
    //     id: PropTypes.number.isRequired,
    //     name: PropTypes.string.isRequired,
    //     type: PropTypes.string.isRequired,
    //     }),
    //     ).isRequired,
    //     };

    renderItem = ({ item: { id, name, type, digital_address } }) => (
        <View style={styles.container}>
        <TouchableOpacity >
            <Text style={styles.text} >{name} - {type}</Text>
            <Text style={styles.subtext}>{digital_address}</Text>
        </TouchableOpacity>              
        </View>
        ); 

    render() {
        const { items } = this.props;
        return (
            <FlatList
                data = { items }
                renderItem = { this.renderItem }
                keyExtractor = { keyExtractor }
            />
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: '#969696',
        padding: 10,
        marginHorizontal: 10,
    },
    text: {
        fontSize: 17,
    },
    subtext: {
        fontSize: 14,
        color: 'deeppink',
    }
});