import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert } from "react-native";
import RNPickerSelect from 'react-native-picker-select';
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import axios from 'axios'
import { GLOBAL_CONFIG } from "../components/global_config";

import { Picker } from '@react-native-picker/picker';
const AdminMarks = ({ navigation, route }) => {
    const course = route.params.course;
    const [selectedTest, setSelectedTest] = useState('');
    const [students, setStudents] = useState([]);
    const [message, setMessage] = useState([]);
    const getStudents = async () => {
        try {
            const response = await axios.post(
                `http://${GLOBAL_CONFIG.SYSTEM_IP}:5000/marks/getmarks`,
                { course: course }
            );
            setStudents(response.data.data);
            setMessage(response.data.empty);
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        getStudents();
    }, []);

    const handleMarksChange = (id, value) => {
        setStudents((prev) =>
            prev.map((student) =>
                student._id === id
                    ? { ...student, [selectedTest]: value }
                    : student
            )
        );
    };

    const handleSubmit = async () => {
        console.log(students);
        if (!selectedTest) {
            Alert.alert('Error', 'Please select a test.');
            return;
        }
        try {
            const respons = await axios.post(`http://${GLOBAL_CONFIG.SYSTEM_IP}:5000/marks/setmarks`, { students });
            console.log(respons.data);
        }
        catch (e) { console.log(e); }
        // Alert.alert("Marks Updated", JSON.stringify({ test: selectedTest, students }, null, 2));
        Alert.alert("Marks updated");
        console.log("Updated Students:", students);
    };

    const renderStudent = ({ item }) => (
        <View style={styles.studentCard}>
            <Text style={styles.studentName}>{item.name}</Text>
            <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder={`Enter Marks`}
                value={item[selectedTest] || ''}
                onChangeText={(value) => handleMarksChange(item._id, value)}
            />
        </View>
    );

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.container}>
                    <Text style={styles.title}>Student Marks</Text>

                    {/* Picker Container */}
                    <View style={styles.pickerContainer}>
                        <Picker
                            selectedValue={selectedTest}
                            onValueChange={(value) => setSelectedTest(value)}
                            style={styles.picker}
                        >
                            <Picker.Item label="Select Test" value="" />
                            <Picker.Item label="Test 1" value="test1" />
                            <Picker.Item label="Test 2" value="test2" />
                            <Picker.Item label="End Semester" value="endSem" />
                        </Picker>
                    </View>

                    {/* Student List */
                        !message && <FlatList
                            data={students}
                            keyExtractor={(item) => item._id}
                            renderItem={renderStudent}
                            contentContainerStyle={styles.list}
                        />}
                    {message && <Text>No students Joined.</Text>}

                    {/* Submit Button */}
                    <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                        <Text style={styles.submitButtonText}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

export default AdminMarks;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#FFFDF0",
    },
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
        color: '#3C0A6B',
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: '#3C0A6B',
        borderRadius: 8,
        marginBottom: 20,
        backgroundColor: "#f5f5f5",
    },
    picker: {
        height: 50,
        color: '#3C0A6B',
    },
    list: {
        paddingBottom: 20,
    },
    studentCard: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 15,
        marginBottom: 12,
        backgroundColor: "#D4BEE4",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    studentName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#3C0A6B',
        flex: 1,
    },
    input: {
        width: 80,
        padding: 8,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        textAlign: "center",
        backgroundColor: "#f5f5f5",
    },
    submitButton: {
        backgroundColor: "#3C0A6B",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 20,
    },
    submitButtonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: 'bold',
    },
});