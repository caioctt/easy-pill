import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Login } from './src/pages/Login';
import { Welcome } from './src/pages/Welcome';

import Routes from './src/routes';

export default function App() {
  return (
    // <Welcome></Welcome>
    <Routes />
  );
}
