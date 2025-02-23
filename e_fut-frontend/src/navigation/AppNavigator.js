import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
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

      if (token) {
        setTimeout(() => {
          Alert.alert('Sessão Expirada', 'Por favor, faça login novamente.');
          AsyncStorage.removeItem('authToken');
          setIsLoggedIn(false);
        }, 1200000); // 2 minutos
      }
    };

    checkAuthStatus();
  }, []);

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <Drawer.Navigator>
          <Drawer.Screen name="Home" component={HomeScreen} />
          <Drawer.Screen name="User" component={UserScreen} />
          <Drawer.Screen name="Games" component={GamesScreen} />
          <Drawer.Screen name="Finance" component={FinanceScreen} />
          <Drawer.Screen name="Meetings" component={MeetingsScreen} />
          <Drawer.Screen name="Incentives" component={IncentivesScreen} />
          <Drawer.Screen name="Teams" component={TeamsScreen} />
          <Drawer.Screen name="Settings" component={SettingsScreen} />
          <Drawer.Screen name="Locations" component={LocationsScreen} />
          <Drawer.Screen name="Logout" component={LogoutScreen} />
        </Drawer.Navigator>
      ) : (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default AppNavigator;