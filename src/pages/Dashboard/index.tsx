import React from 'react'
import { useNavigation } from '@react-navigation/core';
import { View, StyleSheet, Text, Image, Alert } from 'react-native';

import userImage from '../../../assets/user.png'
import { CardButton } from '../../components/CardButton';

export function Dashboard(){
    const navigation = useNavigation();

    function handleNewPill() {
        navigation.navigate('NewPill');
    }
    function handleMyPills() {
        navigation.navigate('MyPills');
    }
    function handlePillHistory(){
        Alert.alert('Desculpe! Esta função ainda não foi implementada.')
    }
    function handleConfigs(){
        Alert.alert('Desculpe! Esta função ainda não foi implementada.')
    }

    return(
        <>
            <View style={styles.contaier}>
                <View style={styles.contaierHeader}>
                    <View>
                        <Image source={userImage} style={styles.image}></Image>
                        <Text style={styles.textName}>Olá, Usuário</Text>
                    </View>
                </View>
                <Text>O que você deseja fazer?</Text>

            </View>
            <View style={styles.contaierCards}>
                <CardButton title="Registrar novo remédio" icon="plus-a" onPress={() => handleNewPill()}></CardButton>
                <CardButton title="Ver Histórico" icon="history" onPress={() => handlePillHistory()}></CardButton>
            </View>
            <View style={styles.contaierCards}>
                <CardButton title="Meus remédios salvos" icon="pills" onPress={() => handleMyPills()} ></CardButton>
                <CardButton title="Opções" icon="player-settings" onPress={() => handleConfigs()}></CardButton>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    contaierHeader:{
        width: '100%',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 20,
        marginTop: 20
    },
    contaier:{
        width: '100%',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 20,
    },
    contaierCards:{
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 20,
        borderRadius: 20
    },
    image: {
        width: 70,
        height: 70,
        borderRadius:35,
        alignSelf: 'center'
    },
    textName:{
        fontSize: 32,

    }
})