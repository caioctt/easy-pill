import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react'
import { Alert, Platform, ScrollView, Text, View, Image, StyleSheet, TouchableOpacity, TextInput, AsyncStorage } from 'react-native'
import DateTimePicker, { Event } from "@react-native-community/datetimepicker";
import { Button } from '../../components/Button';
import { format } from "date-fns";
import { saveMedication } from '../../libs/storage';

export function NewPill() {

    const [medicationName, setMedicationName] = useState(String)
    const [medicationInfo, setMedicationInfo] = useState(String)
    const [selectedDateTime, setSelectedDateTime] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(Platform.OS === "ios");

    const navigation = useNavigation();

    function handleChangeTime(event: Event, dateTime: Date | undefined) {
        if (Platform.OS === "android") {
            setShowDatePicker((oldState) => !oldState);
        }

        if (dateTime) setSelectedDateTime(dateTime);
    }

    function handleOpenDatetimePickerForAndroid() {
        setShowDatePicker((oldState) => !oldState);
    }

    async function handleSave() {

        try {
            await saveMedication({
                id:  Math.floor(Math.random() * 100).toString(),
                hour:'',
                name: medicationName,
                about: medicationInfo,
                dateTimeNotification: selectedDateTime,
            });

            navigation.navigate("MyPills", {
                title: "Tudo certo",
                subtitle: `Fique tranquilo que sempre vamos lembrar você de tomar seus remédios.`,
                buttonTitle: "Muito obrigado",
                icon: "hug",
                nextScreen: "MyPills",
            });
        } catch {
            Alert.alert("Não foi possível salvar.");
        }

    }

    return (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
            <View style={styles.container}>
                <View style={styles.pillInfo}>

                    <Text style={styles.pillName}>Remédio</Text>

                    <TextInput
                        placeholder="Digite o nome do remédio"
                        style={styles.input}
                        onChangeText={(text) => setMedicationName(text)}
                        value={medicationName}>
                    </TextInput>
                    <Text style={styles.pillAbout}>Descrição</Text>
                    <TextInput
                        placeholder="Digite uma descrição (opcional)"
                        multiline
                        style={styles.input}
                        onChangeText={(text) => setMedicationInfo(text)}
                        value={medicationInfo}>
                    </TextInput>
                </View>

                <View style={styles.controller}>

                    <Text style={styles.alertLabel}>
                        Escolha o horario que deseja ser lembrado:
              </Text>

                    {showDatePicker && (
                        <DateTimePicker
                            value={selectedDateTime}
                            mode="time"
                            display="spinner"
                            onChange={handleChangeTime}
                        />
                    )}

                    {Platform.OS === "android" && (
                        <TouchableOpacity
                            style={styles.dateTimePickerButton}
                            onPress={handleOpenDatetimePickerForAndroid}
                        >
                            <Text style={styles.dateTimePickerText}>
                                {`${format(selectedDateTime, "HH:mm")}`}
                            </Text>
                        </TouchableOpacity>
                    )}

                    <Button title="Cadastrar remédio" onPress={handleSave} />
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
    },
    input: {
        borderBottomWidth: 1,
        borderColor: '#dbdbdb',
        color: '#4f4f4f',
        width: '100%',
        fontSize: 14,
        textAlign: 'center',
    },
    pillInfo: {
        flex: 1,
        paddingHorizontal: 30,
        paddingVertical: 50,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#13c9f2",
    },
    controller: {
        backgroundColor: "white",
        paddingHorizontal: 20,
        paddingTop: 30,
        paddingBottom: 20,
    },
    pillName: {
        fontSize: 24,
        color: "white",
        marginTop: 15,
    },
    pillAbout: {
        textAlign: "center",
        color: "white",
        fontSize: 17,
        marginTop: 30,
    },
    alertLabel: {
        textAlign: "center",
        color: "#737373",
        fontSize: 18,
    },
    dateTimePickerButton: {
        width: "100%",
        alignItems: "center",
        paddingVertical: 40,
    },
    dateTimePickerText: {
        color: "#333333",
        fontSize: 30,
        borderBottomWidth: 1,
        borderColor: 'deepskyblue',
    },
    image: {
        width: 50,
        height: 50
    }
});


