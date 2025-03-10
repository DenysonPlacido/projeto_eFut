import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ImageBackground, StyleSheet, Linking } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';

const LoginScreen = ({ navigation, setIsLoggedIn }) => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://192.168.1.117:3000/api/users/login', { phone, password });

      const { token } = response.data;
      await AsyncStorage.setItem('authToken', token);
      await AsyncStorage.setItem('loggedInUserWhats', phone);
      
      setIsLoggedIn(true); 
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Falha na autenticação');
    }
  };

  const handleForgotPassword = () => {
    Linking.openURL('https://wa.me/seu_numero_de_suporte');
  };

  const handleContactDeveloper = () => {
    const developerURL = 'https://wa.me/5567993464728';
    const message = 'Olá! Eu vi seu aplicativo e estou interessado em obter mais informações. Obrigado!';
    const encodedMessage = encodeURIComponent(message);
    const url = `${developerURL}?text=${encodedMessage}`;
    
    Linking.openURL(url);
  };

  return (
    <ImageBackground source={require('../../assets/images/fundo_login.png')} style={styles.background}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>eFut</Text>

          <TextInput
            style={styles.input}
            placeholder="Número de WhatsApp"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
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

          <TouchableOpacity onPress={handleForgotPassword}>
            <Text style={styles.forgotPassword}>Esqueci minha senha</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Register')}>
            <Text style={styles.buttonText}>Criar uma conta</Text>
          </TouchableOpacity>
        </View>

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
    width: '100%',  
    height: '100%', 
    resizeMode: 'cover', 
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
  },
  container: {
    padding: 20,
  },
  title: { 
    fontSize: 28, 
    marginBottom: 20, 
    textAlign: 'center', 
    color: '#fff' 
  },
  input: { 
    height: 50, 
    borderColor: '#ddd', 
    borderWidth: 1, 
    marginBottom: 15, 
    paddingHorizontal: 10, 
    borderRadius: 5, 
    backgroundColor: '#fff' 
  },
  button: { 
    backgroundColor: 'rgba(0, 0, 0, 0.7)', 
    padding: 15, 
    borderRadius: 5, 
    alignItems: 'center', 
    marginBottom: 10 
  },
  buttonText: { 
    color: '#fff', 
    fontSize: 18, 
    fontWeight: 'bold' 
  },
  forgotPassword: { 
    color: '#ddd', 
    textAlign: 'center', 
    marginTop: 10, 
    textDecorationLine: 'underline' 
  },
  footer: { 
    position: 'absolute', 
    bottom: 20, 
    left: 20, 
    right: 20, 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center' 
  },
  footerText: { 
    color: '#fff' 
  },
});

export default LoginScreen;
