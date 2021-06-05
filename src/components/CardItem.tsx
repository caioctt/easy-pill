import React from "react";
import { StyleSheet, Text, View, Animated } from "react-native";
import { RectButton, RectButtonProps } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { Feather } from "@expo/vector-icons";

interface MedicationProps extends RectButtonProps {
    data: {
        name: string;
        hour: string;
    };
    handleRemove: () => void;
}

export function CardItem({ data, handleRemove, ...rest }: MedicationProps) {
    return (
        <Swipeable
            overshootRight={false}
            renderRightActions={() => (
                <Animated.View>
                    <View>
                        <RectButton style={styles.buttonRemove} onPress={handleRemove}>

                            <Feather name="trash" size={32} color={"white"} />
                        </RectButton>
                    </View>
                </Animated.View>
            )}
        >
            <RectButton style={styles.container} {...rest}>
                <Text style={styles.title}>{data.name}</Text>
                <View style={styles.details}>
                    <Text style={styles.timeLabel}>Tomar às</Text>
                    <Text style={styles.time}>{data.hour}</Text>
                </View>
            </RectButton>
        </Swipeable>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        paddingHorizontal: 10,
        paddingVertical: 25,
        borderRadius: 20,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#13c9f2",
        marginVertical: 5,
    },
    title: {
        flex: 1,
        marginLeft: 10,
        fontSize: 17,
        color: "white",
    },
    details: {
        alignItems: "flex-end",
        marginRight: 6,
    },
    timeLabel: {
        fontSize: 16,
        color: "#f0f0f0",
    },
    time: {
        marginTop: 5,
        fontSize: 16,
        color: "#e8e8e8",
    },
    buttonRemove: {
        width: 100,
        height: 85,
        backgroundColor: "red",
        marginTop: 15,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        right: 20,
        paddingLeft: 15
    }
});
