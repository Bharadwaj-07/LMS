import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GLOBAL_CONFIG } from '../../components/global_config';

export default function MainWindow({ navigation, route }) {
    const course = route.params;
    const [userId, setUserId] = useState(null);

    // Fetch user ID from AsyncStorage when the component mounts
    useEffect(() => {
        const fetchUserId = async () => {
            try {
                const storedUserId = await AsyncStorage.getItem('uname');
                setUserId(storedUserId);
            } catch (error) {
                console.error('Error fetching user ID:', error);
            }
        };
        fetchUserId();
    }, []);

    const handleAttendance = async () => {
        if (!userId) {
            Alert.alert("Error", "User ID not found!");
            return;
        }
        try {
            const user = userId.toLowerCase();
            console.log(userId,course);
            const response = await axios.post(`http://${GLOBAL_CONFIG.SYSTEM_IP}:5000/api/Attendance/Admin`, {
                course,
                user,
            });
            if (response.data.admin) {
                navigation.navigate('Dates', { course: route.params });
            } else {
                navigation.navigate('UserDates');
            }
        } catch (error) {
            console.error("Error fetching attendance data:", error);
            Alert.alert("Error", "Unable to fetch attendance data.");
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.centeredView}>
                <View style={[styles.rectangle, { width: "100%", alignItems: "center" }]}>
                    <Text style={{ fontSize: 20, fontWeight: "bold", height: 30 }}>{route.params}</Text>
                </View>
                <TouchableOpacity style={[styles.modalView, { backgroundColor: "#13f" }]}>
                    <Text style={styles.buttonText}>Notice Board</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.modalView, { backgroundColor: "#7ef" }]} 
                    onPress={handleAttendance}
                >
                    <Text style={styles.buttonText}>Attendance</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.modalView, { backgroundColor: "#91f" }]}>
                    <Text style={styles.buttonText}>Progress</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    centeredView: {
        flex: 1,
        position: 'relative',
        alignItems: 'center',
        top: 20,
        marginTop: 22,
    },
    modalView: {
        margin: 5,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        width: "80%",
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        margin: 10,
        width: 200,
        backgroundColor: '#2196F3',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 20,
    },
    addIcon: {
        width: 50,
        height: 50,
    },
    rectangle: {
        width: '90%',
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: "rgba(119, 9, 9, 0.7)",
    },
});
