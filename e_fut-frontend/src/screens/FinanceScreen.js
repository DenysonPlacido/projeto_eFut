// src/screens/FinanceScreen.js

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
const { width, height } = Dimensions.get('window'); // Para obter a largura e altura da tela

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo escuro semi-transparente para melhorar contraste
    padding: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#fff', // Cor branca para se destacar no fundo
  },
  background: {
    width: '100%',  // A imagem ocupa 100% da largura da tela
    height: height, // A imagem ocupa 100% da altura da tela
    justifyContent: 'center',
  },
});

export default FinanceScreen;
