import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import UserScreen from '../screens/UserScreen';
import GamesScreen from '../screens/GamesScreen';
import FinanceScreen from '../screens/FinanceScreen';
import MeetingsScreen from '../screens/MeetingsScreen';
import IncentivesScreen from '../screens/IncentivesScreen';
import TeamsScreen from '../screens/TeamsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import LocationsScreen from '../screens/LocationsScreen';
import LogoutScreen from '../screens/LogoutScreen';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const AppNavigator = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = await AsyncStorage.getItem('authToken');
      setIsLoggedIn(!!token);
    };

    checkAuthStatus();
  }, []);

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <Drawer.Navigator>
          <Drawer.Screen name="Home" component={HomeScreen} />
          <Drawer.Screen name="Usuário" component={UserScreen} />
          <Drawer.Screen name="Jogos" component={GamesScreen} />
          <Drawer.Screen name="Financeiro" component={FinanceScreen} />
          <Drawer.Screen name="Encontros" component={MeetingsScreen} />
          <Drawer.Screen name="Incentivos" component={IncentivesScreen} />
          <Drawer.Screen name="Formador de Times" component={TeamsScreen} />
          <Drawer.Screen name="Configurações" component={SettingsScreen} />
          <Drawer.Screen name="Localizações" component={LocationsScreen} />
          <Drawer.Screen name="Sair">
            {(props) => <LogoutScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
          </Drawer.Screen>
        </Drawer.Navigator>
      ) : (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login">
            {(props) => <LoginScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
          </Stack.Screen>
          <Stack.Screen name="Register" component={RegisterScreen} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default AppNavigator;
