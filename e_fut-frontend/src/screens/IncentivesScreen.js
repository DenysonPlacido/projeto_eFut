// src/screens/IncentivesScreen.js

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const IncentivesScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Prêmios e Incentivos</Text>
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

export default IncentivesScreen;
