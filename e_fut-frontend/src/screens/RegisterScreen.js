import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ImageBackground, StyleSheet } from 'react-native';
import axios from 'axios';

const RegisterScreen = ({ navigation }) => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState(''); 

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://192.168.1.117:3000/api/users/register', { phone, password, name, nickname });
      Alert.alert('Sucesso', 'Usuário registrado com sucesso');
      navigation.navigate('Login');
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Falha ao registrar usuário');
      alert('Erro. Falha ao registrar usuário');
    }
  };

  return (
    <ImageBackground source={require('../../assets/images/fundo_login.png')} style={styles.background}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Registrar</Text>

          <TextInput
            style={styles.input}
            placeholder="Nome"
            value={name}
            onChangeText={setName}
          />

          <TextInput
            style={styles.input}
            placeholder="Apelido"
            value={nickname}
            onChangeText={setNickname}
          />

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

          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Registrar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.buttonText}>Voltar ao Login</Text>
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
});

export default RegisterScreen;
