import React from 'react'
import { useNavigation } from '@react-navigation/core';
import { View, StyleSheet, Text } from 'react-native';


export function Dashboard(){
    const navigation = useNavigation();
    return(
        <View style={styles.contaier}>
            <Text>Dashboard</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    contaier:{
        flex:1,
        width: '100%',
        justifyContent: 'space-around',
        alignItems: 'center'
    }
})