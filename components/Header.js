import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, /**Api */ Platform, Dimensions} from 'react-native';

//components and constants
import AppColor from '../constants/colors';


const header = (props) => {
    const [deviceHeightState, setDeviceHeightState] = useState(Dimensions.get('window').height);


    useEffect( () => {
      const deviceHeightHandler = () => {
          setDeviceHeightState(Dimensions.get('window').height);
      };
      Dimensions.addEventListener('change', deviceHeightHandler);

      //clear
      return () => {
          Dimensions.removeEventListener('change', deviceHeightHandler);
      };

    });

    //Platform.select does the condition checks for platform, ie, Platform.OS === 'android'
    return (
        <View style ={{...styles.headerBase, 
        ...Platform.select({
            ios: styles.headerIOS,
            android: styles.headerAndroid
        }),
         height: deviceHeightState >= 600 ?100 : 80}}>
            <Text style ={styles.headerTitle}>{props.title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    headerBase: {
        width: '100%',
        paddingTop: 35,
        paddingBottom: 5,
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "openSansBold"
    },
    headerIOS: {
        backgroundColor: "white",
        borderBottomColor: "#CCCCCC",
        borderBottomWidth: 1
    },
    headerAndroid: {
        backgroundColor: AppColor.primaryColor
    },
    headerTitle: {
        color: Platform.OS === "ios" ?AppColor.primaryColor :"white",
        fontSize: 18
    }
});

export default header;