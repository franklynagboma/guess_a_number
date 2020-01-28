import React from 'react';
import {View, Text, TouchableOpacity,
     TouchableNativeFeedback /** Android only*/, StyleSheet, /**Api */ Platform} from 'react-native';

const mainButton = (props) =>  {

    //Note rule of React/React Native: 
    //All Components must start with a Capital letter when used as a JSX Component.
    let ButtonComponent = TouchableOpacity;

    if (Platform.Version >= 21) {
        ButtonComponent = TouchableNativeFeedback;
    }

    return (
        <View style ={styles.buttonView}>
            <ButtonComponent activeOpacity ={0.6} onPress ={props.onPress}>
            <View style ={{...styles.buttonContainer, ...props.buttonStyle}}>
                <Text style ={{...styles.buttonText, ...props.textColor}}>{props.children}</Text>
            </View>
        </ButtonComponent>
        </View>
    );
};

const styles = StyleSheet.create({
    buttonView: {
        borderRadius: 25,
        overflow: "hidden"
    },
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