import { formatDistance } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { Alert, View, Text, FlatList, StyleSheet } from 'react-native';
import {
  loadMedications,
  MedicationProps,
  removeMedication
} from '../../libs/storage';
import { pt } from 'date-fns/locale';
import { CardItem } from '../../components/CardItem';

export function MyPills() {
  const [myMedications, setMyMedications] = useState<MedicationProps[]>([]);
  const [nextWatered, setNextWatered] = useState<string>();

  function handleRemove(medication: MedicationProps) {
    Alert.alert('Remover', `Deseja remover ${medication.name}?`, [
      {
        text: 'Não',
        style: 'cancel'
      },
      {
        text: 'Sim',
        onPress: async () => {
          try {
            await removeMedication(medication.id);

            setMyMedications((oldData) =>
              oldData.filter((item) => item.id !== medication.id)
            );
          } catch (error) {
            console.log(error);
            Alert.alert('Não foi possível remover.');
          }
        }
      }
    ]);
  }

  useEffect(() => {
    async function loadStorageData() {
      const medicationStorage = await loadMedications();

      const nextTime = formatDistance(
        new Date(medicationStorage[0].dateTimeNotification).getTime(),
        new Date().getTime(),
        {
          locale: pt
        }
      );

      setNextWatered(
        `Tome seu remédio, ${medicationStorage[0].name}, daqui a ${nextTime}`
      );
      setMyMedications(medicationStorage);
    }

    loadStorageData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.spotlight}>
        {/* <Image source={waterdrop} style={styles.spotlightImage} /> */}
        <Text style={styles.spotlightText}>{nextWatered}</Text>
      </View>

      <View style={styles.medications}>
        <Text style={styles.medicationsTitle}>Próximos remédios</Text>

        <FlatList
          data={myMedications}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <CardItem
              data={item}
              handleRemove={() => {
                handleRemove(item);
              }}
            />
          )}
          showsVerticalScrollIndicator={false}
          // contentContainerStyle={{ flex: 1 }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingTop: 50,
    backgroundColor: 'white'
  },
  spotlight: {
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 20,
    borderWidth: 0.5,
    borderColor: '#d6d6d6',
    borderRadius: 20,
    height: 110,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  spotlightImage: {
    width: 60,
    height: 60
  },
  spotlightText: {
    flex: 1,
    color: '#7a7a7a',
    paddingHorizontal: 20
  },
  medications: {
    flex: 1,
    width: '100%'
  },
  medicationsTitle: {
    fontSize: 24,
    color: '#9c9c9c',
    marginVertical: 20
  }
});
