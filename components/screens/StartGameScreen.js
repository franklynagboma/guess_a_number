import React, { useState, useEffect } from 'react';
import {
    //Components
    View,
    Text,
    StyleSheet,
    Button,
    TouchableWithoutFeedback,
    ScrollView,
    KeyboardAvoidingView,//For Keyboard pops not to overlay view.
    //Objects
    Keyboard,
    Alert,
    Dimensions
} from 'react-native';

//Components and constants
import Card from '../helper/Card';
import AppColor from '../../constants/colors';
import DefaultStyle from '../../constants/default-styles';
import Input from '../helper/Input';
import NumberContainer from '../helper/NumberContainer';
//Just import name with .ios/.android,
//React Native will automatically get the js from android/ios as long as it was correctly spelled.
import MainButton from '../helper/MainButton';


const startGameScreen = (props) => {
    //Set state for number validation
    //ie, number must not have a . or ,
    const [enteredValue, setEnteredValue] = useState('');
    const [confirmedGame, setConfirmedGame] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState();

    /**
     * Dimension state
     * When using Dimensions to dynamically controll view size
     * on a default orientation app, use sate to controll the size for 
     * portrait and landscape
     * */
    //When using this on a view, it must be used as an inline style
    const [buttonStyleState, setButtonStyleState] = useState(Dimensions.get("window").width / 3);

    useEffect(() =>{
        const setButtonSizeListener =() => {
            setButtonStyleState(Dimensions.get("window").width / 3);
        };
    
        //Since this callback get called each time the screen re-redeners(ie, also rotate)
        //place on a componentDidUpdate/useEffect, end previous listener before start a new one
        //so as not to stack unuse listener
        Dimensions.addEventListener('change', setButtonSizeListener);
        
        //clear previous useEffect code
        return () => {
            Dimensions.removeEventListener('change', setButtonSizeListener);
        };
    });

    const numberInputHandler = (inputText) => {
        //Scare input, if it is not a number, replace with empty('')
        setEnteredValue(inputText.replace(/[^0-9]/g, ''));
    };

    //Reset button clicked
    const resetInputHandler = () => {
        setEnteredValue('');
        setConfirmedGame(false);
    };

    //Confirm button clicked
    const confirmInputHandler = () => {
        const validNumber = parseInt(enteredValue);
        //Check if validNumber is valid, ie, is a number and not more than 99
        if (isNaN(validNumber) || validNumber <= 0 || validNumber > 99) {
            Alert.alert('Invalid Number!', 'Number must be a value from 1 to 99.',
                [{ text: 'Okay', style: 'destructive', onPress: resetInputHandler }]);
            return;
        }

        setSelectedNumber(validNumber);
        setEnteredValue('');
        setConfirmedGame(true);
        //close keyboard
        Keyboard.dismiss();
    }

    const whichDeviceHandler = (which) => {
        console.log(which);
    };

    //if user clicks confirm, show user confirm summary.
    let confirmJSX = null;
    if (confirmedGame) {
        confirmJSX = (
            <Card cardStyle={styles.summaryContainer}>
                <Text style={DefaultStyle.bodyTextBold}>You selected</Text>
                <NumberContainer>{selectedNumber}</NumberContainer>
                <View style={styles.summaryButton}>
                    <MainButton
                        buttonStyle ={styles.summaryButtonStyle}
                        textColor ={DefaultStyle.mainButtonTextColorWhite}
                        onPress={props.onStartGame.bind(this, selectedNumber)}>
                        START GAME
                    </MainButton>
                </View>
            </Card>);
    }

    return (
        <ScrollView>
            {/** behavior = position mustly for iOS and padding for Android */}
        <KeyboardAvoidingView behavior ="position" keyboardVerticalOffset ={20}>
        {
        /**Close keyboard when user clicks anywhere on the View screen
        *(except for component or the keyboard).*/} 
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss();
        }}>
            <View style={styles.screen}>
                <Text style={{ ...styles.title, ...DefaultStyle.bodyTextLight }}>
                    Start a New Game!</Text>
                <Card cardStyle={styles.inputContainer}>
                    <Text style={DefaultStyle.bodyTextBold}>Enter a number</Text>
                    <Input inputStyle={styles.input}
                        blurOnSubmit
                        maxLength={2}
                        autoCapitalize="none"
                        autoCorrect={false}
                        keyboardType="number-pad"
                        onChangeText={numberInputHandler}
                        value={enteredValue} />
                    <View style={styles.buttonContainer}>
                        <View style={{...styles.button, minWidth: buttonStyleState}} >
                            <Button title="Reset" onPress={resetInputHandler} color={AppColor.accentColor} />
                        </View>
                        <View style={{...styles.button, minWidth: buttonStyleState}} >
                            <Button title="Confirm" onPress={confirmInputHandler} color={AppColor.primaryColor} />
                        </View>
                    </View>
                </Card>
                {confirmJSX}
            </View>
        </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: "center"
    },
    title: {
        marginVertical: 10,
        fontFamily: 'openSans'
    },
    input: {
        width: "50%",
        textAlign: "center"
    },
    inputContainer: {
        width: "80%",
        maxWidth: "95%",
        minWidth: 300,
        alignItems: "center",
        // input card sub style
        padding: 15,
        borderRadius: 5
    },
    buttonContainer: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        paddingHorizontal: 5
    },
    button: {
        width: "40%",
        marginTop: 5,
    },
    summaryButtonStyle: {
        backgroundColor: AppColor.startButtonColor
    },
    summaryButton: {
        width: "70%",
        marginTop: 7
    },
    summaryContainer: {
        marginTop: 20,
        padding: 5,
        alignItems: "center"
    }
});


export default startGameScreen;