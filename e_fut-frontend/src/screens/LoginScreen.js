import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ImageBackground, StyleSheet, Linking } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';

const LoginScreen = ({ navigation }) => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    axios.post('http://localhost:3000/api/users/login', { phone, password })
      .then(async (response) => {
        const { token } = response.data;
        await AsyncStorage.setItem('authToken', token);
        await AsyncStorage.setItem('loggedInUserWhats', phone);
        console.log('Token stored, navigating to Home');
        navigation.navigate('Home');
        setTimeout(() => {
          Alert.alert('Sessão Expirada', 'Por favor, faça login novamente.');
          navigation.navigate('Login');
        }, 120000); // 2 minutos
      })
      .catch(error => {
        console.error(error);
        Alert.alert('Erro', 'Falha na autenticação');
      });
  };

  const handleContactDeveloper = () => {
    Linking.openURL('https://wa.me/5567993464728?text=Olá!%20Eu%20vi%20seu%20app%20desenvolvido%20e%20gostaria%20de%20saber%20mais%20sobre%20o%20projeto.%20Podemos%20conversar%20um%20pouco%20mais%20sobre%20ele?');
  };

  return (
    <ImageBackground source={require('../../assets/images/fundo_login.png')} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Login e_fut</Text>
        <TextInput
          style={styles.input}
          placeholder="Número de WhatsApp"
          value={phone}
          onChangeText={setPhone}
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Register')}>
          <Text style={styles.buttonText}>Registrar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => Alert.alert('Funcionalidade não implementada ainda')}>
          <Text style={styles.buttonText}>Esqueceu a Senha?</Text>
        </TouchableOpacity>
        <View style={styles.footer}>
          <Text style={styles.footerText}>Desenvolvido por Denyson Plácido</Text>
          <TouchableOpacity onPress={() => Linking.openURL('https://github.com/denysonplacido')}>
            <Icon name="logo-github" size={30} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleContactDeveloper}>
            <Icon name="logo-whatsapp" size={30} color="#25D366" />
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    marginBottom: 20,
    textAlign: 'center',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerText: {
    color: '#fff',
  },
});

export default LoginScreen;