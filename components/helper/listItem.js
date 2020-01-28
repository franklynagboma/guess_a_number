import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

//Constanst
import AppColor from '../../constants/colors';

const styles = StyleSheet.create({
    listItem: {
        borderColor: "#CCCCCC",
        borderWidth: 1,
        padding: 15,
        marginVertical: 10,
        backgroundColor: "white",
        flexDirection: "row",
        justifyContent: "space-between",
        //width: "60%"
        width: "100%"
    },
    round: {
        color: AppColor.accentColor,
        marginHorizontal: 5
    }
});

export const listItem = (rounds, item) => (
    <View style ={styles.listItem}>
        <Text style ={styles.round}>#{rounds}</Text>
        <Text>{item}</Text>
    </View>
);

// export const listItem = (rounds, item, index) => (
//     <View key ={index} style ={styles.listItem}>
//         <Text style ={styles.round}>#{rounds}</Text>
//         <Text>{item}</Text>
//     </View>
// );
