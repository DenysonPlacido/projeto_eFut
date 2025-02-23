// src/screens/LogoutScreen.js

import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LogoutScreen = ({ navigation }) => {
  useEffect(() => {
    const logout = async () => {
      await AsyncStorage.removeItem('authToken');
      navigation.navigate('Login');
    };

    logout();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Saindo...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
  },
});

export default LogoutScreen;
