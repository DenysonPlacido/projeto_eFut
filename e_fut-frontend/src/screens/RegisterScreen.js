import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ImageBackground } from 'react-native';
import axios from 'axios';

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    axios.post('http://192.168.117:3000/api/users/register', { name, nickname, phone, password })
      .then(response => {
        Alert.alert('Sucesso', 'Usuário registrado com sucesso');
        navigation.navigate('Login');
      })
      .catch(error => {
        console.error(error);
        Alert.alert('Erro', 'Não foi possível registrar o usuário');
      });
  };

  return (
    <ImageBackground source={require('../../assets/images/fundo_login.png')} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Registro e_fut</Text>
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
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <Button title="Registrar" onPress={handleRegister} />
        
        {/* Botão para voltar para a tela de login */}
        <Button 
          title="Voltar para Login" 
          onPress={() => navigation.navigate('Login')} 
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adiciona uma leve transparência ao fundo
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    color: '#fff', // Ajuste a cor para se destacar no fundo
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  background: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default RegisterScreen;
