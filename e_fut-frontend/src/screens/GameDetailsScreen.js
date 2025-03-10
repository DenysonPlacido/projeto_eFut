import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const GameDetailsScreen = ({ route, navigation }) => {
  const { gameId } = route.params;

  const games = [
    { id: '1', date: '2024-11-10', time: '18:00', location: 'Arena Futebol Society' },
    { id: '2', date: '2024-11-11', time: '19:30', location: 'Estádio Campo Grande' },
    { id: '3', date: '2024-11-12', time: '17:00', location: 'Quadra Futshow' },
  ];

  const gameDetails = games.find(game => game.id === gameId);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalhes do Jogo</Text>
      <Text>Data: {gameDetails.date}</Text>
      <Text>Hora: {gameDetails.time}</Text>
      <Text>Local: {gameDetails.location}</Text>
      <Button title="Inscrever-se" onPress={() => alert('Inscrito com sucesso!')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default GameDetailsScreen;
