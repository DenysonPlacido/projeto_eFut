// src/screens/TeamsScreen.js

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TeamsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Formador de Times</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default TeamsScreen;
