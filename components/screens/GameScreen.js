import React, { useState, useRef, useEffect } from 'react';
import {
    View, Text, StyleSheet, Button, ScrollView, FlatList,
    //APIs
    Alert, Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

//Components and Constants
import NumberContainer from '../helper/NumberContainer';
import Card from '../helper/Card';
import AppColor from '../../constants/colors';
import DefaultStyle from '../../constants/default-styles';
import MainButton from '../helper/MainButton';
import { listItem } from '../helper/listItem';


const generateRandomBetween = (min, max, exclude) => {
    //make sure min and max are integers
    min = Math.ceil(min);
    max = Math.floor(max);
    //generate random between max - min then + min to get the higest value.
    const random = Math.floor(Math.random() * (max - min)) + min;
    if (random === exclude) {
        //recursion
        return generateRandomBetween(min, max, exclude);
    }
    else {
        return random;
    }

};

const gameScreen = (props) => {
    //get props destructioning
    const { userChoice, onGameOver } = props;

    const initialGuess = generateRandomBetween(1, 100, userChoice);
    //manage state
    const [currentGuess, setCurrentGuess] = useState(initialGuess);

    const [passGuesses, setPassGuesses] = useState([initialGuess.toString()]);

    //Dimensions change state
    const [availableDeviceHeight, setAvailableDeviceHeight] = useState(Dimensions
        .get('window').height);

    //store current Low and High value that will not be affected by re-render 
    //and life-cycle callbacks using ref.
    const currentLow = useRef(1);
    const currentHigh = useRef(100);


    //Use useEffect to check for correct guess, since the state will be called
    //when user clicks Lower or Greater and app renders.
    //then, perform side-effect on useEffect.
    //useEffect run when componet first start and when the component re-render.
    //combination of componentDidMount and componentDidUpdate
    //This takes a callback, and a second argument that React Native
    //will be auto check if changes are done on such props, if so,
    //then and only then will useEffect run(Just like
    //shouldComponentUpdate but just for logic not re-redenr)
    useEffect(() => {
        // //check for correct guess
        if (currentGuess === userChoice) {
            onGameOver(passGuesses.length);
        }
    }, [currentGuess, userChoice, onGameOver]);

    //useEffect for Dimensions rotation changes
    useEffect( () => {
        const availableDeviceHeightListener = () => {
            setAvailableDeviceHeight(Dimensions.get('window').height);
        };

        //add listener
        Dimensions.addEventListener('change', availableDeviceHeightListener);

        //clear
        return () => {
            Dimensions.removeEventListener('change', availableDeviceHeightListener);
        };
    });

    //guessButtonHandler
    const guessButtonHandler = (direction) => {
        //check for user cheat
        if ((direction === 'lower' && currentGuess < userChoice)
            || (direction === 'greater' && currentGuess > userChoice)) {
            Alert.alert('Don\'t cheat!', "You know that is wrong...",
                [{ text: 'Sorry', style: 'cancel' }]);

            return;
        }

        if (direction === 'lower') {
            currentHigh.current = currentGuess;
            //let next lower bound be 1 - userChoice or userChoice.
            // const lowerGuess = props.userChoice <= 1 ?props.userChoice : (props.userChoice - 1);
            // setCurrentGuess(generateRandomBetween(lowerGuess, currentGuess, currentGuess));
        }
        else {
            currentLow.current = currentGuess + 1;
        }

        const nextGuess = generateRandomBetween(currentLow.current,
            currentHigh.current, currentGuess);
        setCurrentGuess(nextGuess);
        //save game rounds, since it is dependent on previous state, use callback.
        //setRounds((currentRound) => currentRound + 1);
        setPassGuesses((currentPassGuess) => [nextGuess.toString(), ...currentPassGuess]);

    }

    //Render view

    //Check for screen with smaller width, return layout fiting for screen.
    if (availableDeviceHeight < 500) {

        return (
            <View style={styles.screen}>
                <Text style={DefaultStyle.bodyTextLight}>Opponent's Guess</Text>
                <View style={styles.buttonContainer}>
                    <View style={styles.cardButton}>
                        <MainButton
                            buttonStyle={DefaultStyle.buttonBackground}
                            textColor={DefaultStyle.mainButtonTextColorWhite}
                            onPress={guessButtonHandler.bind(this, 'lower')}>
                            <Ionicons name='md-remove' color='white' size={24} />
                        </MainButton>
                    </View>
                    <NumberContainer>{currentGuess}</NumberContainer>
                    <View style={styles.cardButton}>
                        <MainButton
                            buttonStyle={DefaultStyle.buttonBackground}
                            textColor={DefaultStyle.mainButtonTextColorWhite}
                            onPress={() => guessButtonHandler('greater')}>
                            <Ionicons name='md-add' color='white' size={24} />
                        </MainButton>
                    </View>
                </View>

                <View style={styles.listContainer}>
                    {/** To control the structure of a list on ScrollView or FlatList,
                     * use contentContainerStyle
                     */}
                    {/** send count in reverse */}
                    {/* <ScrollView contentContainerStyle ={styles.list}>
                        {passGuesses.map((guess, index) => (
                            // 0: 5 -  0 => 5
                            // 1: 5 - 1 => 4
                            listItem((passGuesses.length - index) , guess, index)
                        ))}
                    </ScrollView> */}
                    {/** FlastList only takes string of an array or an object.*/}
                    <FlatList
                        contentContainerStyle={styles.list}
                        keyExtractor={(item) => {
                            return item;
                        }}
                        data={passGuesses}
                        renderItem={(itemData) => (
                            listItem((passGuesses.length - itemData.index), itemData.item)
                        )}
                    />
                </View>
            </View>
        );
    }

    //large phone width
    return (
        <View style={styles.screen}>
            <Text style={DefaultStyle.bodyTextLight}>Opponent's Guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card cardStyle={styles.buttonContainer}>
                <View style={styles.cardButton}>
                    <MainButton
                        buttonStyle={DefaultStyle.buttonBackground}
                        textColor={DefaultStyle.mainButtonTextColorWhite}
                        onPress={guessButtonHandler.bind(this, 'lower')}>
                        <Ionicons name='md-remove' color='white' size={24} />
                    </MainButton>
                </View>
                <View style={styles.cardButton}>
                    <MainButton
                        buttonStyle={DefaultStyle.buttonBackground}
                        textColor={DefaultStyle.mainButtonTextColorWhite}
                        onPress={() => guessButtonHandler('greater')}>
                        <Ionicons name='md-add' color='white' size={24} />
                    </MainButton>
                </View>
            </Card>

            <View style={styles.listContainer}>
                {/** To control the structure of a list on ScrollView or FlatList,
                 * use contentContainerStyle
                 */}
                {/** send count in reverse */}
                {/* <ScrollView contentContainerStyle ={styles.list}>
                    {passGuesses.map((guess, index) => (
                        // 0: 5 -  0 => 5
                        // 1: 5 - 1 => 4
                        listItem((passGuesses.length - index) , guess, index)
                    ))}
                </ScrollView> */}
                {/** FlastList only takes string of an array or an object.*/}
                <FlatList
                    contentContainerStyle={styles.list}
                    keyExtractor={(item) => {
                        return item;
                    }}
                    data={passGuesses}
                    renderItem={(itemData) => (
                        listItem((passGuesses.length - itemData.index), itemData.item)
                    )}
                />
            </View>
        </View>
    );

};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: "center"
    },
    buttonContainer: {
        width: 300,
        maxWidth: "85%",
        flexDirection: "row",
        alignItems: "center",
        marginTop: Dimensions.get("window").height > 600 ? 20 : 5,
        justifyContent: "space-around"
    },
    cardButton: {
        width: "30%",
        marginVertical: 15
    },
    listContainer: {
        //For list to scroll in Android, add flex 1
        flex: 1,
        //width: "80%"
        width: Dimensions.get("window").width > 350 ? "60%" : "75%"
    },
    list: {
        flexGrow: 1, //Start from the bottom active when the list has the whole view size
        //alignItems: "center",
        justifyContent: "flex-end"//Start from the bottom
    }
});

export default gameScreen;