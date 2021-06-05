import React from 'react';
import { StyleSheet, Text, Dimensions } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { Fontisto } from '@expo/vector-icons';

interface PillProps extends RectButtonProps {
    icon: string;
    title: string;
}

export function CardButton({ title, icon, ...rest }: PillProps) {
  return (

    <RectButton
        style={styles.container}
        {...rest}
    >
    <Fontisto name={icon} style={styles.icon}/>
    <Text style={styles.text}>
        { title }
    </Text>
    </RectButton>
  )
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#13c9f2',
      height: Dimensions.get('window').height * 0.25,
      width: Dimensions.get('window').width * 0.36,
      borderRadius: 16,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      fontSize: 16,
      color: '#fff',
      textShadowColor: 'black',
      textAlign: 'center',
    },
    icon:{
      marginBottom: 15,
      fontSize: 40,
      color: '#fff',
    }
  })