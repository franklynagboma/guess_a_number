import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import * as Font from 'expo-font';//expo fonts async
import { AppLoading } from 'expo'//Loading screen.

//Custom components
import Header from './components/Header';
import StartGameScreen from './components/screens/StartGameScreen';
import GameScreen from './components/screens/GameScreen';
import GameOverScreen from './components/screens/GameOverScreen';


//font promise
const fetchFont = () => {
  return Font.loadAsync({
    'openSans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'openSansBold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
};

export default function App() {
  //Use state to control screen type
  const [userNumber, setUserNumber] = useState();

  const [gameRounds, setGameRounds] = useState(0);

  const [fontLoaded, setFontLoaded] = useState(false);

  //check if font has loaded show app, if note wait to load before show app.
  if (!fontLoaded) {
    return (<AppLoading
      startAsync={fetchFont}
      onFinish={() => setFontLoaded(true)}
      onError={(error) => console.log(error)} />);
  }

  const startGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber);
  };

  const gameOverHandler = (currentRounds) => {
    setGameRounds(currentRounds);
  };

  const restartGameHandler = () => {
    //set defalut game round on start game
    setGameRounds(0);
    setUserNumber(null);
  }

  let viewContent = <StartGameScreen onStartGame={startGameHandler} />;
  //if user number is not null and has a value greater than 0
  if (userNumber && userNumber > 0 && gameRounds <= 0) {
    viewContent = <GameScreen
      userChoice={userNumber}
      onGameOver={gameOverHandler} />;
  }
  else if (gameRounds > 0) {
    viewContent = <GameOverScreen
      rounds={gameRounds}
      userNumber={userNumber}
      onRestart={restartGameHandler} />;
  }

  return (
    <SafeAreaView style={styles.screen}>
      <Header title="Guess a Number!" />
      {viewContent}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
});
