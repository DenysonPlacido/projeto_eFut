// src/screens/UserScreen.js

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ImageBackground, Dimensions } from 'react-native';
import axios from 'axios';

const UserScreen = ({ navigation }) => {
  const [userData, setUserData] = useState({
    name: '',
    nickname: '',
    phone: '',
    password: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [isAdmin, setIsAdmin] = useState(false);
  const [searchPhone, setSearchPhone] = useState('');
  const [searchedUser, setSearchedUser] = useState(null);
  const [usuarioLogado, setUsuarioLogado] = useState('userLoggedPhone'); 

  useEffect(() => {
    axios.get(`http://192.168.117:3000/api/users/${usuarioLogado}`)
      .then((response) => {
        setUserData({
          name: response.data.name,
          nickname: response.data.nickname,
          phone: response.data.phone,
          password: '',
          newPassword: '',
          confirmPassword: '',
        });
        checkAdmin();
      })
      .catch((error) => {
        console.error(error);
        Alert.alert('Erro', 'Não foi possível carregar os dados do usuário');
      });
  }, []);

  const checkAdmin = () => {
    axios.get(`http://192.168.117:3000/api/users/adminCheck/${usuarioLogado}`)
      .then(response => {
        setIsAdmin(response.data.isAdmin);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleUpdate = () => {
    const { name, nickname, phone, password, newPassword, confirmPassword } = userData;

    if (newPassword !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem');
      return;
    }

    axios.put(`http://192.168.117:3000/api/users/update/${usuarioLogado}`, {
      name,
      nickname,
      phone,
      password,
      newPassword,
      confirmPassword,
    })
      .then((response) => {
        Alert.alert('Sucesso', 'Dados atualizados com sucesso!');
      })
      .catch((error) => {
        Alert.alert('Erro', 'Não foi possível atualizar os dados');
      });
  };

  const handleSearchUser = () => {
    axios.get(`http://192.168.117:3000/api/users/search/${searchPhone}`)
      .then((response) => {
        setSearchedUser(response.data);
      })
      .catch((error) => {
        Alert.alert('Erro', 'Usuário não encontrado');
      });
  };

  const handleUpdateSearchedUser = () => {
    const { name, nickname, phone, password, newPassword, confirmPassword } = searchedUser;

    if (newPassword !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem');
      return;
    }

    axios.put(`http://192.168.117:3000/api/users/admin/update/${searchPhone}`, {
      name,
      nickname,
      phone,
      password,
      newPassword,
      confirmPassword,
    })
      .then((response) => {
        Alert.alert('Sucesso', 'Dados do usuário alterados com sucesso!');
      })
      .catch((error) => {
        Alert.alert('Erro', 'Não foi possível alterar os dados do usuário');
      });
  };

  return (
    <ImageBackground 
      source={require('../../assets/images/fundo-esportivo.jpg')} 
      style={styles.background}
      imageStyle={{ opacity: 0.2, resizeMode: 'cover' }} 
    >
      <View style={styles.container}>
      <View style={styles.header}>
            <Text style={styles.userInfo}>{userData.nickname} | {userData.phone}</Text>
          </View>
        <View style={styles.overlay}>
          

          <View style={styles.formContainer}>
            <Text style={styles.title}>Dados do Usuário</Text>

            <TextInput
              style={styles.input}
              placeholder="Nome"
              value={userData.name}
              onChangeText={(text) => setUserData({ ...userData, name: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Apelido"
              value={userData.nickname}
              onChangeText={(text) => setUserData({ ...userData, nickname: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Número de WhatsApp"
              value={userData.phone}
              editable={false} 
            />
            <TextInput
              style={styles.input}
              placeholder="Nova Senha"
              secureTextEntry
              value={userData.newPassword}
              onChangeText={(text) => setUserData({ ...userData, newPassword: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Confirmar Nova Senha"
              secureTextEntry
              value={userData.confirmPassword}
              onChangeText={(text) => setUserData({ ...userData, confirmPassword: text })}
            />

            <Button title="Atualizar Dados" onPress={handleUpdate} />

            {isAdmin && (
              <>
                <TextInput
                  style={styles.input}
                  placeholder="Buscar usuário por WhatsApp"
                  value={searchPhone}
                  onChangeText={setSearchPhone}
                />
                <Button title="Buscar Usuário" onPress={handleSearchUser} />

                {searchedUser && (
                  <View>
                    <Text>Nome: {searchedUser.name}</Text>
                    <Text>Apelido: {searchedUser.nickname}</Text>
                    <Text>WhatsApp: {searchedUser.phone}</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Alterar Nome"
                      value={searchedUser.name}
                      onChangeText={(text) => setSearchedUser({ ...searchedUser, name: text })}
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="Alterar Apelido"
                      value={searchedUser.nickname}
                      onChangeText={(text) => setSearchedUser({ ...searchedUser, nickname: text })}
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="Nova Senha"
                      secureTextEntry
                      value={searchedUser.newPassword}
                      onChangeText={(text) => setSearchedUser({ ...searchedUser, newPassword: text })}
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="Confirmar Nova Senha"
                      secureTextEntry
                      value={searchedUser.confirmPassword}
                      onChangeText={(text) => setSearchedUser({ ...searchedUser, confirmPassword: text })}
                    />
                    <Button title="Alterar Dados do Usuário" onPress={handleUpdateSearchedUser} />
                  </View>
                )}
              </>
            )}
          </View>
          </View>
          <Button title="Voltar" onPress={() => navigation.navigate('Home')} />
      </View>
    </ImageBackground>
  );
};

const { width, height } = Dimensions.get('window'); 


const styles = StyleSheet.create({

  overlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    padding: 20,
    borderRadius: 10,
  },
  container: {
    flex: 1,
    width: width,
    padding: 20,
  },
  header: {
    position: 'absolute',
    top: 20,
    right: 20,
    padding: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 5,
  },
  userInfo: {
    color: 'white',
    fontSize: 14,
    textAlign: 'right',
  },
  formContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: '100%',
  },
  background: {
    width: width,  
    height: height, 
    justifyContent: 'center',
  },
});

export default UserScreen;
