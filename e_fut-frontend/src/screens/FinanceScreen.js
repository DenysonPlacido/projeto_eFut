
import React from 'react';
import { View, Text, Button, StyleSheet, ImageBackground, Dimensions } from 'react-native';

const FinanceScreen = () => {
  return (
    <ImageBackground>
      <View style={styles.container}>
        <View style={styles.overlay}>
          <Text style={styles.title}>Financeiro</Text>
        </View>
        <Button title="Voltar" onPress={() => navigation.navigate('Home')} />
      </View>
    </ImageBackground>
  );
};
const { width, height } = Dimensions.get('window'); 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    padding: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#fff', 
  },
  background: {
    width: '100%', 
    height: height, 
    justifyContent: 'center',
  },
});

export default FinanceScreen;
