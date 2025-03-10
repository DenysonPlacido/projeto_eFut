import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView, ImageBackground, StyleSheet, Button, Platform, Dimensions } from 'react-native';
import axios from 'axios';
import ModalSelector from 'react-native-modal-selector';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GamesScreen = () => {
  const [gameId, setGameId] = useState('');
  const [userId, setUserId] = useState('');
  const [playerType, setPlayerType] = useState('Linha');
  const [goalkeepers, setGoalkeepers] = useState([]);
  const [fieldPlayers, setFieldPlayers] = useState([]);
  const [substitutes, setSubstitutes] = useState([]);
  const [gameFetched, setGameFetched] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState('');

  useEffect(() => {
    const checkAdminStatus = async () => {
      const loggedInUserWhats = await AsyncStorage.getItem('loggedInUserWhats');
      axios.get(`http://192.168.1.117:3000/api/users/checkAdmin`, { params: { phone: loggedInUserWhats } })
        .then(response => {
          setIsAdmin(response.data.isAdmin);
        })
        .catch(error => {
          console.error(error);
        });
    };

    const fetchLoggedInUser = async () => {
      const loggedInUserWhats = await AsyncStorage.getItem('loggedInUserWhats');
      axios.get(`http://192.168.1.117:3000/api/users/getUser`, { params: { phone: loggedInUserWhats } })
        .then(response => {
          setLoggedInUser(response.data.loggedInUser);
        })
        .catch(error => {
          console.error(error);
        });
    };

    checkAdminStatus();
    fetchLoggedInUser();
  }, []);

  const getLoggedInUser = async () => {
    try {
      const loggedInUserWhats = await AsyncStorage.getItem('loggedInUserWhats');
      return loggedInUserWhats;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const handleAddPlayer = async () => {
    try {
      const response = await axios.post(`http://192.168.1.117:3000/api/games/addPlayer`, { 
        whats: userId, 
        goleiroOuLinha: playerType, 
        idJogo: gameId
      });
      fetchGameList();
      Alert.alert('Sucesso', 'Jogador adicionado com sucesso');
    } catch (error) {
      if (error.response && error.response.status === 404) {
        if (isAdmin) {
          Alert.alert(
            'Jogador não encontrado',
            'Esse jogador não está cadastrado. Deseja cadastrá-lo?',
            [
              { text: 'Cancelar', style: 'cancel' },
              { text: 'Cadastrar', onPress: () => navigation.navigate('Register') }
            ]
          );
        } else {
          Alert.alert('Erro', 'Seu usuário não é admin. Você só pode adicionar ou remover você mesmo da lista');
        }
      } else {
        console.error(error);
        Alert.alert('Erro', error.response?.data?.message || 'Falha ao adicionar jogador');
      }
    }
  };

  const handleRemovePlayer = async () => {
    const loggedInUserWhats = await AsyncStorage.getItem('loggedInUserWhats');
    if (!isAdmin && userId !== loggedInUserWhats) {
      Alert.alert('Erro', 'Você só pode remover seu nome da lista');
      return;
    }

    try {
      await axios.post(`http://192.168.1.117:3000/api/games/removePlayer`, { 
        whats: userId, 
        idJogo: gameId, 
        usuarioLogado: loggedInUserWhats
      });
      fetchGameList();
      Alert.alert('Sucesso', 'Jogador removido com sucesso');
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', error.response?.data?.message || 'Falha ao remover jogador');
    }
  };

  const fetchGameList = () => {
    axios.get(`http://192.168.1.117:3000/api/games/gameList`, { params: { idJogo: gameId } })
      .then(response => {
        const { goalkeepers, fieldPlayers, substitutes } = response.data;
        setGoalkeepers(goalkeepers);
        setFieldPlayers(fieldPlayers);
        setSubstitutes(substitutes);
        setGameFetched(true);
      })
      .catch(error => {
        console.error('Erro ao buscar lista de jogos:', error);
        Alert.alert('Erro', error.response?.data?.message || 'Falha ao buscar lista de jogos');
      });
  };

  useEffect(() => {
    if (gameId) {
      fetchGameList();
    }
  }, [gameId]);

  const handleFetchHistory = () => {
    axios.get(`http://192.168.1.117:3000/api/games/fetchGameHistory`, { params: { idJogo: gameId } })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
        Alert.alert('Erro', 'Falha ao buscar o histórico do jogo');
      });
  };

  const handleGenerateTeams = async () => {
    if (!isAdmin) {
      Alert.alert('Erro', 'Ação destinada a jogadores admin');
      return;
    }
  };

  const handleMassDraw = async () => {
    if (!isAdmin) {
      Alert.alert('Erro', 'Ação destinada a jogadores admin');
      return;
    }
  };

  const handleDeleteTeams = async () => {
    if (!isAdmin) {
      Alert.alert('Erro', 'Ação destinada a jogadores admin');
      return;
    }
  };

  return (
    <ImageBackground 
      source={require('../../assets/images/fundo-esportivo.jpg')} 
      style={styles.background}
      imageStyle={{ opacity: 0.2, resizeMode: 'cover' }}
    >
        <View style={styles.header}>
          <Text style={styles.headerText}>{loggedInUser.nickname || loggedInUser.name} ({loggedInUser.phone})</Text>
        </View>
      <View style={styles.overlay}>
        <ScrollView contentContainerStyle={styles.container}>
          {!gameFetched ? (
            <>
              <Text style={styles.title}>Digite o ID do Jogo</Text>
              <TextInput 
                style={styles.input} 
                placeholder="ID do Jogo" 
                value={gameId} 
                onChangeText={setGameId} 
              />
              <TouchableOpacity style={styles.button} onPress={fetchGameList}>
                <Text style={styles.buttonText}>Buscar Jogo</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text style={styles.title}>Gerenciamento de Jogos</Text>
              <TextInput 
                style={styles.input} 
                placeholder="WhatsApp do Usuário" 
                value={userId} 
                onChangeText={setUserId} 
              />
              <View style={styles.pickerContainer}>
                <ModalSelector
                  data={[
                    { key: 'Linha', label: 'Linha' },
                    { key: 'Goleiro', label: 'Goleiro' }
                  ]}
                  initValue="Linha"
                  onChange={(option) => setPlayerType(option.key)}
                />
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.actionButton} onPress={handleAddPlayer}>
                  <Text style={styles.buttonText}>Adicionar Jogador</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton} onPress={handleRemovePlayer}>
                  <Text style={styles.buttonText}>Remover Jogador</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton} onPress={handleGenerateTeams}>
                  <Text style={styles.buttonText}>Gerar Times</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton} onPress={handleFetchHistory}>
                  <Text style={styles.buttonText}>Consultar Histórico</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton} onPress={() => setGameFetched(false)}>
                  <Text style={styles.buttonText}>Voltar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton} onPress={handleMassDraw}>
                  <Text style={styles.buttonText}>Realizar Sorteio em Massa</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton} onPress={handleDeleteTeams}>
                  <Text style={styles.buttonText}>Deletar Times Gerados</Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.subTitle}>Goleiros</Text>
              <View style={styles.table}>
                <View style={styles.tableHeader}>
                  <Text style={styles.tableHeaderText}>Vaga</Text>
                  <Text style={styles.tableHeaderText}>Nome</Text>
                  <Text style={styles.tableHeaderText}>Data e Hora</Text>
                  <Text style={styles.tableHeaderText}>Time</Text>
                </View>
                {goalkeepers.map((item, index) => (
                  <View style={styles.tableRow} key={`${item.Vaga}-${index}`}>
                    <Text style={styles.tableCell}>{item.Vaga}</Text>
                    <Text style={styles.tableCell}>{item.Goleiros}</Text>
                    <Text style={styles.tableCell}>
                      {new Date(item['Data e Hora da Endrada']).toLocaleDateString('pt-BR')}{"\n"}
                      {new Date(item['Data e Hora da Endrada']).toLocaleTimeString('pt-BR')}
                    </Text>
                    <Text style={styles.tableCell}>{item.Time}</Text>
                  </View>
                ))}
              </View>

              <Text style={styles.subTitle}>Jogadores de Linha</Text>
              <View style={styles.table}>
                <View style={styles.tableHeader}>
                  <Text style={styles.tableHeaderText}>Vaga</Text>
                  <Text style={styles.tableHeaderText}>Nome</Text>
                  <Text style={styles.tableHeaderText}>Data e Hora</Text>
                  <Text style={styles.tableHeaderText}>Time</Text>
                </View>
                {fieldPlayers.map((item, index) => (
                  <View style={styles.tableRow} key={`${item.Vaga}-${index}`}>
                    <Text style={styles.tableCell}>{item.Vaga}</Text>
                    <Text style={styles.tableCell}>{item.JogadoresLinha}</Text>
                    <Text style={styles.tableCell}>
                      {new Date(item['Data e Hora da Endrada']).toLocaleDateString('pt-BR')}{"\n"}
                      {new Date(item['Data e Hora da Endrada']).toLocaleTimeString('pt-BR')}
                    </Text>
                    <Text style={styles.tableCell}>{item.Time}</Text>
                  </View>
                ))}

                <Text style={styles.subTitle}>Suplentes</Text>
                <View style={styles.table}>
                  <View style={styles.tableHeader}>
                    <Text style={styles.tableHeaderText}>Vaga</Text>
                    <Text style={styles.tableHeaderText}>Nome</Text>
                    <Text style={styles.tableHeaderText}>Data e Hora</Text>
                    <Text style={styles.tableHeaderText}>Status</Text>
                  </View>
                  {substitutes.map((item, index) => (
                    <View style={styles.tableRow} key={`${item.Vaga}-${index}`}>
                      <Text style={styles.tableCell}>{item.Vaga}</Text>
                      <Text style={styles.tableCell}>{item.Suplentes}</Text>
                      <Text style={styles.tableCell}>
                        {new Date(item['Data e Hora da Endrada']).toLocaleDateString('pt-BR')}{"\n"}
                        {new Date(item['Data e Hora da Endrada']).toLocaleTimeString('pt-BR')}
                      </Text>
                      <Text style={styles.tableCell}>Aguardando Vaga</Text>
                    </View>
                  ))}
                </View>
              </View>
            </>
          )}
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

const { width, height } = Dimensions.get('window'); 

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: height,
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
    borderRadius: 10,
  },
  header: {
    padding: 20,
    alignItems: 'flex-end',
  },
  headerText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  container: {
    flexGrow: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  subTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
    color: 'white',
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
  pickerContainer: {
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 10,
    backgroundColor: 'white',
  },
  picker: {
    height: 40,
    width: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    flexWrap: 'wrap',
  },
  actionButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 15,
    borderRadius: 5,
    margin: 5,
    alignItems: 'center',
    flex: 1,
    minWidth: '45%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  table: {
    borderWidth: 1,
    borderColor: 'gray',
    marginTop: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f1f1f1',
  },
  tableHeaderText: {
    flex: 1,
    fontWeight: 'bold',
    padding: 10,
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  tableCell: {
    flex: 1,
    padding: 10,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    fontSize: 12,
  },
});

export default GamesScreen;