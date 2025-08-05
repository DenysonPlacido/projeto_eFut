
import React from 'react';
import { Text, View } from 'react-native';
import { supabase } from './lib/supabase';

export default function App() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Bem-vindo ao eFut Web!</Text>
    </View>
  );
}
