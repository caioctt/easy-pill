import React, { useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, View, Image, Dimensions, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Keyboard } from 'react-native'
import pills from '../../../assets/pills.png'
import { Button } from '../../components/Button'
import { useNavigation } from '@react-navigation/core';



export function Login(){
    const navigation = useNavigation();
    const [ didKeyboardShow, setKeyboardShow ] = useState(false);

    useEffect(() => {
        Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
        Keyboard.addListener("keyboardDidHide", _keyboardDidHide);
    
        return () => {
          Keyboard.removeListener("keyboardDidShow", _keyboardDidShow);
          Keyboard.removeListener("keyboardDidHide", _keyboardDidHide);
        };
      }, []);
    

    const _keyboardDidShow = () => {
        setKeyboardShow(true) 
      }
    
    const _keyboardDidHide = () => {
         setKeyboardShow(false)
      }

    function handleSubmit() {
    navigation.navigate('Dashboard');
    }
    


    return(
        <SafeAreaView style={styles.contaier}>
            <KeyboardAvoidingView style={styles.contaier} behavior="height">
                <View style={styles.contaier}>
                    {!didKeyboardShow && 
                    <Text style={styles.title}>
                        Seja bem vindo(a) {'\n'}
                        ao Easy Pill
                    </Text>}
                    
                    <View >
                    {!didKeyboardShow && 
                        <Image 
                            source={pills}
                            style={styles.image} 
                            resizeMode="contain"
                        />}
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.inputTexto}>
                            Email
                        </Text>
                        <TextInput
                            placeholder="Digite seu e-mail"
                            style={styles.input}>

                        </TextInput>

                        <Text 
                        style={styles.inputTexto}>
                            Senha
                        </Text>
                        <TextInput
                            placeholder="Digite sua senha"
                            secureTextEntry

                            style={styles.input}>
                        </TextInput>
                        <TouchableOpacity
                            style={styles.forgetPassword}>
                            <Text
                            style={styles.forgetPassword}>
                                Esqueci a senha
                            </Text>
                        </TouchableOpacity>

                        <View style={styles.button}>
                            <Button title="Login"
                            onPress={handleSubmit}></Button>
                        </View>
                        <View style={styles.createAccount}>
                            <Text style={styles.createAccount}>ou</Text>
                            <TouchableOpacity>
                                <Text style={styles.createAccount}>Crie sua conta aqui</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </KeyboardAvoidingView>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    contaier:{
        flex:1,
        width: '100%',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    image: {
        height: Dimensions.get('window').width * 0.3,
    },
    inputContainer:{
        marginTop:10,
        width: '70%',
        paddingBottom: 60
    },
    input: {
        borderBottomWidth: 1,
        borderColor: '#dbdbdb',
        color: '#4f4f4f',
        width: '100%',
        fontSize: 14,
        textAlign: 'center',
    }, 
    title:{
        fontSize: 20,
        textAlign: 'center',
        color: '#8f8f8f',
        marginTop: 30,
        lineHeight: 24
    },
    inputTexto:{
        fontSize:15,
        color:'#b4b8c6',
        marginTop: 10
    },
    forgetPassword:{
        alignItems:'flex-end',
        color: '#9f9f9f',
        fontSize:12

    },
    button:{
        marginTop:30
    },
    createAccount:{
        alignItems:'center',
        justifyContent: 'center',
        color: '#8f8f8f',
    }

})