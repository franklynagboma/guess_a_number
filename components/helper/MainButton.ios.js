import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, /**Api */ Platform} from 'react-native';

const mainButton = (props) =>  {

    return (
        <TouchableOpacity activeOpacity ={0.6} onPress ={props.onPress}>
            <View style ={{...styles.buttonContainer, ...props.buttonStyle}}>
                <Text style ={{...styles.buttonText, ...props.textColor}}>{props.children}</Text>
            </View>
        </TouchableOpacity>
        
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        alignItems: "center",
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 25,
        borderColor: 'black',
        borderWidth: 0.5,
        shadowColor: "black",
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.2,
        shadowRadius: 3
    },
    buttonText:{
        fontSize: 18,
        fontFamily: "openSansBold"
    }
});

export default mainButton;