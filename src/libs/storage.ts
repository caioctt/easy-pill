import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import { format } from 'date-fns';

export interface MedicationProps {
    id:string;
    name: string;
    about: string;
    dateTimeNotification: Date;
    hour: string;
}

export interface StorageMedicationProps {
    [id: string]: {
        data: MedicationProps
        notificationId: string;
    }
}

export async function saveMedication(medication: MedicationProps): Promise<void> {
    try {
        const nextTime = new Date(medication.dateTimeNotification);
        const now = new Date();

        const seconds = Math.abs(
            Math.ceil((now.getTime() - nextTime.getTime()) / 1000)
        )

        const notificationId = await Notifications.scheduleNotificationAsync({
            content: {
                title: 'Ooolá!',
                body: `Está na hora de tomar seu remédio: ${medication.name}`,
                sound: true,
                priority: Notifications.AndroidNotificationPriority.HIGH,
                data: {
                    medication
                },
            },
            trigger: {
                seconds: seconds < 60 ? 60 : seconds,
                repeats: true
            }
        })

        const data = await AsyncStorage.getItem('@medicationmanager:medication');
        const oldMedications = data ? (JSON.parse(data) as StorageMedicationProps) : {};

        const newMedication = {
            [medication.id]: {
                data: medication,
                notificationId
            }
        }

        await AsyncStorage.setItem('@medicationmanager:medication',
            JSON.stringify({
                ...newMedication,
                ...oldMedications
            })
        );
    } catch (error) {
        throw new Error(error);
    }
}
export async function loadMedications(): Promise<MedicationProps[]> {
    try {

        const data = await AsyncStorage.getItem('@medicationmanager:medication');
        const medications = data ? (JSON.parse(data) as StorageMedicationProps) : {};

        const medSorted = Object.keys(medications).map((medication) => {
            return {
                ...medications[medication].data,
                hour: format(new Date(medications[medication].data.dateTimeNotification), 'HH:mm')
            }
        })
            .sort((a, b) =>
                Math.floor(
                    new Date(a.dateTimeNotification).getTime() / 1000 -
                    Math.floor(new Date(b.dateTimeNotification).getTime() / 1000)
                )
            );
        return medSorted;
    } catch (error) {
        throw new Error(error);
    }
}

export async function removeMedication(id: string): Promise<void> {
    const data = await AsyncStorage.getItem('@medicationmanager:medications');
    const medications = data ? (JSON.parse(data) as StorageMedicationProps) : {}

    // await Notifications.cancelScheduledNotificationAsync(medications[id].notificationId);
    delete medications[id];

    await AsyncStorage.setItem('@medicationmanager:medications', JSON.stringify(medications));
}
