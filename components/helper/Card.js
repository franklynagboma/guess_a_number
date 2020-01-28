import React from 'react';
import {View, StyleSheet} from 'react-native';

const card = (props) => (
    <View style ={{...styles.cardContainer, ...props.cardStyle}}>
        {props.children}
    </View>
);

const styles = StyleSheet.create({
    cardContainer: {
        // iOS card
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.26,
        shadowRadius: 6,
        // Android card
        elevation: 5,
        backgroundColor: 'white'
    }
});

export default card;