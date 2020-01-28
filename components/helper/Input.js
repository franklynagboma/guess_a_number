import React from 'react';
import {TextInput, StyleSheet} from 'react-native';

const input = (props) => (
    //Spread the props for TextInput attributes sent from another component
    <TextInput {...props} style ={{...styles.input, ...props.inputStyle}}/>
);

const styles = StyleSheet.create({
    input: {
        height: 30,
        borderBottomWidth: 1,
        borderBottomColor: 'grey',
        marginVertical: 10
    }
});

export default input;