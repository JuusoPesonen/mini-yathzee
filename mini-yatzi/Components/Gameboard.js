import React, { useState, useEffect } from "react";
import { Text, View, TouchableHighlight } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Container, Row, Col } from "react-native-flex-grid";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./Style/style";
import Header from './Header'
import Footer from './Footer'
import { MAX_SPOT, NBR_OF_THROWS, NBR_OF_DICES, SCOREBOARD_KEY } from "../constants/Game";

// An array to store the state of dice faces
let board = [];

const Gameboard = ({ navigation, route }) => {

  const [playerName, setPlayerName] = useState('');
  const [currentRound, setCurrentRound] = useState(1);
  const [nbrOfThrowsLeft, setNbrOfThrowsLeft] = useState(NBR_OF_THROWS);
  const [status, setStatus] = useState('Throw dices');
  const [gameEndStatus, setGameEndStatus] = useState(false);
  const [selectedDices, setSelectedDices] = useState(new Array(NBR_OF_DICES).fill(false));
  const [diceSpots, setDiceSpots] = useState(new Array(NBR_OF_DICES).fill(0));
  const [selectedDicePoints, setSelectedDicePoints] = useState(new Array(MAX_SPOT).fill(false));
  const [dicePointsTotal, setDicePointsTotal] = useState(new Array(MAX_SPOT).fill(0));
  const [totalPoints, setTotalPoints] = useState(0);
  const [bonusPoints, setBonusPoints] = useState(0);
  const [scores, setScores] = useState([]);
  const [message, setMessage] = useState('');

  // useEffect hook to set player name from route params
  useEffect(() => {
    if (playerName === '' && route.params?.player) {
      setPlayerName(route.params.player);
    }
  }, [playerName, route.params]);

  // useEffect hook to add a listener on focus for getting scoreboard data
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', getScoreboardData);
    return unsubscribe;
  }, [navigation]);

  // useEffect hook to handle bonus points when totalPoints change
  useEffect(() => {
    handleBonusPoints();
  }, [totalPoints]);

  // useEffect hook to handle bonus message when totalPoints change
  useEffect(() => {
    handleBonusMessage();
  }, [totalPoints]);

  // useEffect hook to handle auto bonus points when totalPoints or bonusPoints change
  useEffect(() => {
    handleAutoBonusPoints();
  }, [totalPoints, bonusPoints]);

  // Function to render a button component
  const renderButton = (text, onPress) => (
    <TouchableHighlight
      style={styles.throwButton}
      onPress={onPress}
      underlayColor="lightgrey"
    >
      <Text style={styles.throwButtonText}>{text}</Text>
    </TouchableHighlight>
  );

  // Function to render a dice component
  const renderDice = (dice, index) => (
    <Col key={"dice" + index}>
      <TouchableHighlight
        style={styles.diceContainer}
        underlayColor="transparent"
        onPress={() => selectDice(index)}
      >
        <MaterialCommunityIcons
          name={board[index] || "dice-1"}
          size={50}
          color={getDiceColor(index)}
        />
      </TouchableHighlight>
    </Col>
  );

  // Function to render selectable points (dice spot count buttons)
  const renderSelectablePoints = (diceButton, index) => (
    <Col key={"buttonsRow" + index}>
      <TouchableHighlight
        style={styles.diceContainer}
        underlayColor="transparent"
        onPress={() => selectDicePoints(index)}
      >
        <MaterialCommunityIcons
          name={"numeric-" + (index + 1) + "-circle"}
          size={35}
          color={getDicePointsColor(index)}
        />
      </TouchableHighlight>
    </Col>
  );

  // Function to render points
  const renderPoints = (spot, index) => (
    <Col key={"pointsRow" + index}>
      <Text key={"pointsRow" + index}>{getSpotTotal(index)}</Text>
    </Col>
  );

  // Function to handle bonus points calculation
  const handleBonusPoints = () => {
    setBonusPoints(totalPoints >= 63 ? 50 : 0);
  };

  // Function to handle bonus message based on totalPoints
  const handleBonusMessage = () => {
    const pointsDifference = 63 - totalPoints;
    setMessage(
      pointsDifference <= 0
        ? 'Congratulations! Bonus points (50) added.'
        : `You are ${pointsDifference} points away from bonus.`
    );
  };

  // Function to handle auto bonus points when reaching or exceeding 63 points
  const handleAutoBonusPoints = () => {
    if (totalPoints >= 63 && bonusPoints === 0) {
      setBonusPoints(50);
      setTotalPoints((prevTotal) => prevTotal + 50);
      setMessage('Congratulations! Bonus points (50) added.');
    }
  };

  // Function to get the total points for a specific spot
  const getSpotTotal = (i) => dicePointsTotal[i];

  // Function to handle the dice throw
  const throwDices = () => {
    if (nbrOfThrowsLeft > 0) {
      let spots = [...diceSpots];
      for (let i = 0; i < NBR_OF_DICES; i++) {
        if (!selectedDices[i]) {
          let randomNumber = Math.floor(Math.random() * 6 + 1);
          board[i] = 'dice-' + randomNumber;
          spots[i] = randomNumber;
        }
      }
      setNbrOfThrowsLeft(nbrOfThrowsLeft - 1);
      setDiceSpots(spots);
      setStatus(
        nbrOfThrowsLeft > 0
          ? `Select and throw dices`
          : 'Select points or throw again'
      );
    } else {
      handleGameEnd();
    }
  };

  // Function to handle the end of a game round
  const handleGameEnd = () => {
    if (currentRound < 6) {
      setCurrentRound(currentRound + 1);
      setGameEndStatus(false);
      resetRound();
    } else {
      setStatus('Game has ended. Save your points and start game again.');
      setGameEndStatus(true);
    }
  };

  // Function to reset the game round
  const resetRound = () => {
    setSelectedDices(new Array(NBR_OF_DICES).fill(false));
    setDiceSpots(new Array(NBR_OF_DICES).fill(0));
    setNbrOfThrowsLeft(NBR_OF_THROWS);
    setStatus(`Select and throw dices for the new round.`);
  };


  // Function to check bonus points condition and handle the end of the game
  const checkBonusPoints = () => {
    if (nbrOfThrowsLeft === 0) {
      if (selectedDicePoints.every((value) => value === true)) {
        setGameEndStatus(true);
        setStatus('All points have been selected.');
        setTimeout(() => {
          handleGameEnd();
        }, 3000);
      }
    }
  };

  // Function to handle the selection of dice points
  const selectDicePoints = (i) => {
    if (nbrOfThrowsLeft === 0) {
      let selectedPoints = [...selectedDicePoints];
      let points = [...dicePointsTotal];
      if (!selectedPoints[i]) {
        selectedPoints[i] = true;
        let nbrOfDices = diceSpots.reduce(
          (total, x) => (x === i + 1 ? total + 1 : total),
          0
        );
        points[i] = nbrOfDices * (i + 1);
        setDicePointsTotal(points);
        setSelectedDicePoints(selectedPoints);
        setTotalPoints((prevTotal) => prevTotal + points[i]);
        checkBonusPoints();
      } else {
        setStatus(`You already selected points for ${i + 1}`);
      }
    } else {
      setStatus(`Throw ${NBR_OF_THROWS} times before setting points`);
    }
  };

  // Function to save player points to AsyncStorage
  const savePlayerPoints = async () => {
    if (currentRound === 6 && gameEndStatus) {
      const newKey = scores.length + 1;
      const currentDate = new Date();
      const playerPoints = {
        key: newKey,
        name: playerName,
        date: currentDate.toLocaleDateString(),
        time: currentDate.toLocaleTimeString(),
        points: totalPoints,
      };
      try {
        const newScore = [...scores, playerPoints];
        const jsonValue = JSON.stringify(newScore);
        await AsyncStorage.setItem(SCOREBOARD_KEY, jsonValue);
        console.log('Points saved successfully');
        // Reset relevant state variables to start a new game
        setPlayerName('');
        setCurrentRound(1);
        setNbrOfThrowsLeft(NBR_OF_THROWS);
        setStatus('Throw dices');
        setGameEndStatus(false);
        setSelectedDices(new Array(NBR_OF_DICES).fill(false));
        setDiceSpots(new Array(NBR_OF_DICES).fill(0));
        setSelectedDicePoints(new Array(MAX_SPOT).fill(false));
        setDicePointsTotal(new Array(MAX_SPOT).fill(0));
        setTotalPoints(0);
        setBonusPoints(0);
        setMessage('');
        // Navigate back to Home screen after saving points
        navigation.navigate('Home', { setPlayerName: '' });
      } catch (e) {
        console.log('Save error: ' + e);
      }
    } else {
      // Display an error message if all rounds are not completed
      setStatus('Cannot save points until all rounds are completed.');
    }
  };

  // Function to retrieve scoreboard data from AsyncStorage
  const getScoreboardData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(SCOREBOARD_KEY);
      if (jsonValue !== null) {
        let tmpScores = JSON.parse(jsonValue);
        setScores(tmpScores);
      }
    } catch (e) {
      console.log('Read error: ' + e);
    }
  };

  // Function to handle the selection of a dice
  const selectDice = (i) => {
    if (nbrOfThrowsLeft < NBR_OF_THROWS && !gameEndStatus) {
      let dices = [...selectedDices];
      dices[i] = !selectedDices[i];
      setSelectedDices(dices);
    } else {
      setStatus('You have to throw dices first.');
    }
  };

  // Function to get the color of a dice based on its selection state
  const getDiceColor = (i) => (selectedDices[i] ? '#b14cff' : 'white');

  // Function to get the color of dice points based on their selection state and game end status
  const getDicePointsColor = (i) =>
    selectedDicePoints[i] && !gameEndStatus ? '#b14cff' : 'white';

  // Function to start a new round
  const startNewRound = () => {
    setNbrOfThrowsLeft(NBR_OF_THROWS);
    resetRound();
  };


  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.homeContainer}>
        <Container fluid>
          <Row>{Array.from({ length: NBR_OF_DICES }, renderDice)}</Row>
        </Container>
        <Text style={styles.status}>Round: {currentRound}</Text>
        <Text style={styles.status}>Throws left: {nbrOfThrowsLeft}</Text>
        <Text style={styles.status}>{status}</Text>
        {renderButton('THROW DICES', throwDices)}

        <Container fluid>
          <Row>{Array.from({ length: MAX_SPOT }, renderPoints)}</Row>
        </Container>
        <Container fluid>
          <Row>{Array.from({ length: MAX_SPOT }, renderSelectablePoints)}</Row>
        </Container>
        <Text style={styles.totalPoints}>Total Points: {totalPoints}</Text>
        <Text style={styles.bonusPoints}>{message}</Text>
        {renderButton('SAVE POINTS', savePlayerPoints)}
        <Text style={styles.status}>Player: {playerName}</Text>
      </View>
      <Footer />
    </View>
  );
};

export default Gameboard;