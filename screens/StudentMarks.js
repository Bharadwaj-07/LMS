import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Alert } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import { ScrollView } from "react-native-gesture-handler";
import { GLOBAL_CONFIG } from "../components/global_config"; 
import AsyncStorage from "@react-native-async-storage/async-storage";

const StudentMarks = ({ navigation, route }) => {
    const course = route.params.course;
    console.log(course, "parameter");
    const [marks, setMarks] = useState(null);  // Ensure marks are properly initialized

    const getStudents = async () => {
        try {
            let user = await AsyncStorage.getItem("uname");
            user = user.toLowerCase();
            const response = await axios.post(
                `http://${GLOBAL_CONFIG.SYSTEM_IP}:5000/marks/getmarks/student`,
                { course: course, user: user }
            );
            if (response.data && Object.keys(response.data).length > 0) {
                setMarks(response.data);
            } else {
                setMarks(null); // No data available
            }
            console.log(response.data, "Response");
        } catch (e) {
            console.error(e);
            setMarks(null);  // Handle errors by resetting state
        }
    };

    useEffect(() => {
        getStudents();
    }, []);

    const renderMarks = ({ item }) => (
        <View style={styles.markCard}>
            <Text style={styles.markLabel}>{item.key}:</Text>
            <Text style={styles.markValue}>{item.value}</Text>
        </View>
    );

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <Text style={styles.title}>Marks for {course}</Text>
                <View style={styles.border}>
                    {marks ? (
                        <FlatList
                            nestedScrollEnabled={true}
                            data={Object.entries(marks).map(([key, value]) => ({ key, value }))}
                            keyExtractor={(item) => item.key}
                            renderItem={renderMarks}
                        />
                    ) : (
                        <Text style={styles.noData}>No marks available</Text>
                    )}
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

export default StudentMarks;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#FFFDF0",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
        color: "#3C0A6B",
    },
    noData: {
        textAlign: "center",
        color: "#3C0A6B",
        fontSize: 16,
    },
    markCard: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 15,
        marginBottom: 10,
        backgroundColor: "#E9DFF3",
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    markLabel: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#3C0A6B",
    },
    markValue: {
        fontSize: 18,
        color: "#3C0A6B",
    },
    border: {
        borderWidth: 1,
        borderColor: "#3C0A6B",
        borderRadius: 8,
        padding: 10,
    },
});
