import React, { useState, useEffect } from 'react';
import { DataTable } from 'react-native-paper';
import Header from './Header';
import Footer from './Footer';
import { Text, View, TouchableHighlight, ScrollView } from 'react-native';
import { NBR_OF_SCOREBOARD_ROWS, SCOREBOARD_KEY } from '../constants/Game';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../style/style';


export default Scoreboard = ({ navigation }) => {
    const [scores, setScores] = useState([]);

    // Get scoreboard data when the screen is in focus
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getScoreboardData();
        });
        return unsubscribe;
    }, [navigation]);

    // Get scoreboard data
    const getScoreboardData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem(SCOREBOARD_KEY);
            if (jsonValue !== null) {
                let tmpScores = JSON.parse(jsonValue);

                tmpScores.sort((a, b) => b.points - a.points);
                setScores(tmpScores);
            } else {
                // Reset scores to an empty array if there is no data
                setScores([]);
            }
        } catch (e) {
            console.log('Read error: ' + e);
        }
    };

    // Clear scoreboard
    const clearScoreboard = async () => {
        try {
            const keys = await AsyncStorage.getAllKeys();
            await AsyncStorage.multiRemove(keys);
            setScores([]); // Reset scores to an empty array after clearing
            alert('All data cleared successfully');
        } catch (e) {
            console.log('Clear error: ' + e);
        }
    };

    // Clear scoreboard
    // const clearScoreboard = async () => {
    //     try {
    //         await AsyncStorage.removeItem(SCOREBOARD_KEY);
    //         setScores([]);
    //     } catch (e) {
    //         console.log('Clear error: ' + e);
    //     }
    // };

    // const clearScoreboard = async () => {
    //     try {
    //         await AsyncStorage.clear();
    //         setScores([]);
    //     } catch (e) {
    //         console.log('Clear error: ' + e);
    //     }
    // };

    const renderButton = (text, onPress) => (
        <TouchableHighlight
            style={styles.throwButton}
            onPress={onPress}
            underlayColor="lightgrey"
        >
            <Text style={styles.throwButtonText}>{text}</Text>
        </TouchableHighlight>
    );

    return (
        <ScrollView>
            <View style={[styles.container, styles.centerContent]}>
                <Header />
                <Text style={styles.status}>Scoreboard</Text>
                {scores.length === 0 ? (
                    <Text >Scoreboard is empty</Text>
                ) : (
                    <DataTable>
                        <DataTable.Header>
                            <DataTable.Title style={{ flex: 1 }}>Rank</DataTable.Title>
                            <DataTable.Title style={{ flex: 2 }}>Name</DataTable.Title>
                            <DataTable.Title style={{ flex: 2 }}>Date</DataTable.Title>
                            <DataTable.Title style={{ flex: 2 }}>Time</DataTable.Title>
                            <DataTable.Title style={{ flex: 1 }}>Score</DataTable.Title>
                        </DataTable.Header>
                        {scores.slice(0, NBR_OF_SCOREBOARD_ROWS).map((player, index) => (
                            <DataTable.Row key={player.key}>
                                <DataTable.Cell style={{ flex: 1 }}>{index + 1}.</DataTable.Cell>
                                <DataTable.Cell style={{ flex: 2 }}>{player.name}</DataTable.Cell>
                                <DataTable.Cell style={{ flex: 2 }}>{player.date}</DataTable.Cell>
                                <DataTable.Cell style={{ flex: 2 }}>{player.time.slice(0, -3)}</DataTable.Cell>
                                <DataTable.Cell style={{ flex: 1 }}>{player.points}</DataTable.Cell>
                            </DataTable.Row>
                        ))}
                    </DataTable>
                )}
                {renderButton('CLEAR SCOREBOARD', clearScoreboard)}
                <Footer />
            </View>
        </ScrollView>
    );
};