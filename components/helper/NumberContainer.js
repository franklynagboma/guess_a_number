import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import AppColor from '../../constants/colors';
import DefaultStyle from '../../constants/default-styles';

const numberContainer = (props) => (
    <View style ={styles.container}>
        <Text style ={{...styles.number, ...DefaultStyle.bodyTextLight}}>{props.children}</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        borderWidth: 2,
        borderRadius: 10,
        borderColor: AppColor.accentColor,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        marginVertical: 10
    },
    number: {
        color: AppColor.accentColor,
        fontSize: 24
    }
})

export default numberContainer;