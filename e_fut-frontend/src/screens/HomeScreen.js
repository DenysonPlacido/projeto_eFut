import React from 'react';
import { View, Text, StyleSheet, Button, ImageBackground, Dimensions } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <ImageBackground 
      source={require('../../assets/images/fundo-esportivo.jpg')} 
      style={styles.background}
      imageStyle={{ opacity: 0.2, resizeMode: 'cover' }}
    >
      <View style={styles.container}>
        <View style={styles.overlay}>
          <Text style={styles.title}>🔥 Futi de QUINTA! 🔥</Text>
          <Text style={styles.description}>📍 Local: Quadra Coopertáxi (Rua... 🗺️)</Text>
          <Text style={styles.description}>⏰ Horário: 20:30 às 22:00</Text>

          <Text style={styles.rulesTitle}>⚽ Regras do Futi – Respeito, Zueira e Organização! ⚽</Text>
          <Text style={styles.rule}>1. Adição de Convidados: Pode chamar as peças, mas só depois das 11h de terça-feira.</Text>
          <Text style={styles.rule}>2. Duração dos Jogos: Tempo: 7 minutos ou até 3 gols.</Text>
          <Text style={styles.rule}>3. Vencedor Fica: Quem vence segue jogando.</Text>
          <Text style={styles.rule}>4. Empate: Sai os DOIS times.</Text>
          <Text style={styles.rule}>5. Nada de Malandragem: Sem entradas maldosas!</Text>
          <Text style={styles.rule}>6. Coletes: Terminou? Coloca os coletes na mesa.</Text>
          <Text style={styles.rule}>7. Regras dos Goleiros: Goleiro fixo, jogo de graça!</Text>
          <Text style={styles.rule}>8. Escolha dos Times: Sorteio raiz com tampinhas.</Text>

          <Text style={styles.listTitle}>📋 Como funcionam as listas?</Text>
          <Text style={styles.listRule}>Temos DUAS listas: Goleiros e Jogadores de linha.</Text>
          <Text style={styles.listRule}>Jogadores de linha: Lista para 4 times (16 jogadores).</Text>
          <Text style={styles.listRule}>Chegou na posição 16? Vira suplente e só entra se houver desistência.</Text>
          <Text style={styles.listRule}>Desistência ou Falta: Quem tirar o nome no dia do jogo após as 16h ou não aparecer, paga o futi!</Text>

          <Text style={styles.footer}>E o principal: muita resenha, zoeira e amizade! ✌️</Text>
          <Button title="Ver Menu" onPress={() => navigation.toggleDrawer()} />
        </View>
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
  description: {
    fontSize: 18,
    textAlign: 'center',
    color: '#fff',
  },
  rulesTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#fff',
  },
  rule: {
    fontSize: 16,
    marginVertical: 5,
    color: '#fff',
  },
  listTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#fff',
  },
  listRule: {
    fontSize: 16,
    marginVertical: 5,
    color: '#fff',
  },
  footer: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    color: '#fff',
  },
  background: {
    flex: 1,
    width: '100%', 
    height: height, 
    justifyContent: 'center',
  },
});

export default HomeScreen;
