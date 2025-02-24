import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LogoutScreen = ({ navigation, setIsLoggedIn }) => {
  useEffect(() => {
    const logout = async () => {
      await AsyncStorage.removeItem('authToken');
      await AsyncStorage.removeItem('loggedInUserWhats');
      setIsLoggedIn(false); 
    };

    logout();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Saindo...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 18 },
});

export default LogoutScreen;
