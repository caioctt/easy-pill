import React from 'react';
import { Text, SafeAreaView, Image, StyleSheet, TouchableOpacity, Dimensions, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import clockReminder from '../../../assets/clockReminder.jpg'

export function Welcome() {
  const navigation = useNavigation();

  function handleStart() {
    navigation.navigate('Login');
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.title}>
          Anote e relembre {'\n'}
          suas medicações {'\n'}
          de forma fácil
        </Text>

          <Image 
          source={clockReminder} 
          style={styles.image} 
          resizeMode="contain"
        />
        
        <Text style={styles.subtitle}>
          Não esqueça mais de tomar seus remédios.
          Nós te avisaremos, sempre que precisar.
        </Text>

        <TouchableOpacity
        style={styles.button}
        activeOpacity={0.7}
        onPress={handleStart}
        >
          <Text>
            <Feather 
              name="chevron-right" 
              style={styles.buttonIcon} 
            />
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 20
  },
  title: {
    fontSize: 28,
    textAlign: 'center',
    color: '#8f8f8f',
    marginTop: 38,
    lineHeight: 34
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 18,
    paddingHorizontal: 20,
    color: '#8f8f8f',
  },
  image: {
    height: Dimensions.get('window').width * 0.7
  },
  button: {
    backgroundColor: '#13c9f2',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    marginBottom: 10,
    height: 56,
    width: 56,
  },
  buttonIcon: {
    fontSize: 32,
    color: '#fff'
  }
});