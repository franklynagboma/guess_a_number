import React, { useState, useEffect } from 'react';
import {
    View, Text, StyleSheet, Button, Image, ScrollView,
     /**Api */ Dimensions
} from 'react-native';

//Components and Constants
import AppColor from '../../constants/colors';
import DefaultStyle from '../../constants/default-styles';
import MainButton from '../helper/MainButton';

const gameOverScreen = (props) => {

    //Dimensions state
    const [widthSizeState, setWidthSizeState] = useState(Dimensions.get('window').width);
    const [heightSizeState, setHeightSizeState] = useState(Dimensions.get('window').height);


    useEffect(() => {

        const sizeListener = () => {
            setWidthSizeState(Dimensions.get('window').width);
            setHeightSizeState(Dimensions.get('window').height);
        };

        Dimensions.addEventListener('change', sizeListener);

        //clear listener on useEffect clear
        return () => {
            Dimensions.removeEventListener('change', sizeListener);
        }
    })

    return (
        <ScrollView contentContainerStyle={styles.scrollScreen}>
            <View style={styles.screen}>
                <Text style={{ ...styles.textStyle, ...DefaultStyle.bodyTextLight }}>
                    The Game is Over!</Text>
                {/**60%*/}
                <View style={{
                    ...styles.imageContainer,
                    width: widthSizeState * 0.5,
                    height: widthSizeState * 0.5,
                    borderRadius: (widthSizeState * 0.5) / 2,
                    marginVertical: heightSizeState > 400 ? 20 : 8
                }}>
                    <Image
                        //Local image
                        source={require('../../assets/success.png')}
                        //Network image
                        // source ={{
                        //     uri:
                        //      'https://www.google.com/imgres?imgurl=https%3A%2F%2Fimagesvc.meredithcorp.io%2Fv3%2Fmm%2Fimage%3Furl%3Dhttps%253A%252F%252Fcdn-image.travelandleisure.com%252Fsites%252Fdefault%252Ffiles%252F1526498570%252FVinicunca-Mountain-Peru-Andes-PERURNBW0518.jpg%26w%3D400%26c%3Dsc%26poi%3Dface%26q%3D85&imgrefurl=https%3A%2F%2Fwww.travelandleisure.com%2Ftrip-ideas%2Frainbow-mountain-peru&docid=lpnczW0ORuhgsM&tbnid=0rWyBn6lm3qEbM%3A&vet=10ahUKEwjHwuaj8vbmAhXKeZoKHfh7Cl8QMwjkASgwMDA..i&w=400&h=250&bih=749&biw=1440&q=mountain%20image&ved=0ahUKEwjHwuaj8vbmAhXKeZoKHfh7Cl8QMwjkASgwMDA&iact=mrc&uact=8'}}
                        style={styles.image}
                        fadeDuration={800}
                        resizeMode="cover" />
                </View>
                <View style={{ marginTop: heightSizeState > 400 ? 15 : 5 }} />
                {/** Text: numberOfLines ={1}, ellipsizeMode =""  */}
                <Text style={{
                    ...styles.textStyle,
                    fontSize: heightSizeState > 300 ? 16 : 20,
                    ...DefaultStyle.bodyTextBold
                }}>
                    Guess a Number! needed <Text style={styles.textHighLight}>{props.rounds}
                    </Text> rounds to guess your number <Text style={styles.textHighLight}>
                        {props.userNumber}</Text> :)</Text>
                <Text style={{
                    ...styles.textStyle,
                    fontSize: heightSizeState > 300 ? 16 : 20,
                    ...DefaultStyle.bodyTextRegular
                }}>
                    User choice: <Text style={styles.textHighLight}>
                        {props.userNumber}</Text></Text>

                <MainButton
                    onPress={props.onRestart}
                    buttonStyle={styles.mainButtonStyle}
                    textColor={styles.summaryTextColor}>
                    NEW GAME
                </MainButton>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollScreen: {
        flexGrow: 1
    },
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 15
    },
    textStyle: {
        marginVertical: 8,
        textAlign: "center"
    },
    imageContainer: {
        borderWidth: 2,
        borderColor: "black",
        //Hide any child content in the view that has this style implemented with overflow attribute
        overflow: "hidden"
    },
    image: {
        width: "100%",
        height: "100%"
        //For local images, width and/or height is not neccessary
        //but for Network images, it is a must because React Native cannot specify the 
        //width and height
    },
    mainButtonStyle: {
        backgroundColor: "transparent"
    },
    summaryTextColor: {
        color: AppColor.startButtonColor
    },
    textHighLight: {
        color: AppColor.startButtonColor
    }
});

export default gameOverScreen;