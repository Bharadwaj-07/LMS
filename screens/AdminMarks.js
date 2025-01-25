import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert } from "react-native";
import RNPickerSelect from 'react-native-picker-select';

const AdminMarks = () => {
    const [selectedTest, setSelectedTest] = useState('');
    const [students, setStudents] = useState([
        { id: "1", name: "John Doe", marks: 0 },
        { id: "2", name: "Jane Smith", marks: 0 },
        { id: "3", name: "Sam Wilson", marks: 0 },
    ]);

    const handleMarksChange = (id, marks) => {
        setStudents((prev) =>
            prev.map((student) =>
                student.id === id ? { ...student, marks: marks } : student
            )
        );
    };

    const handleSubmit = () => {
        if (!selectedTest) {
            Alert.alert('Error', 'Please select a test.');
            return;
        }
        // Simulate updating marks in the backend
        Alert.alert("Marks Updated", JSON.stringify({ test: selectedTest, students }, null, 2));
        console.log("Updated Students:", students);
    };

    const renderStudent = ({ item }) => (
        <View style={styles.studentCard}>
            <Text style={styles.studentName}>{item.name}</Text>
            <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="Enter marks"
                value={item.marks.toString()}
                onChangeText={(value) => handleMarksChange(item.id, value)}
            />
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Student Marks</Text>
            <View style={styles.border}>
                <RNPickerSelect
                    onValueChange={(value) => setSelectedTest(value)}
                    items={[
                        { label: 'Test 1', value: 'test1' },
                        { label: 'Test 2', value: 'test2' },
                        { label: 'End Semester', value: 'endSemester' }
                    ]}
                    style={{
                        placeholder: {
                            color: '#3C0A6B',
                        }
                    }}
                    placeholder={{ label: 'Select Test', value: '' }}
                />
            </View>

            <FlatList
                data={students}
                keyExtractor={(item) => item.id}
                renderItem={renderStudent}
                contentContainerStyle={styles.list}
            />

            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
        </View>
    );
};

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#3C0A6B',
        borderRadius: 4,
        color: '#3C0A6B',
        paddingRight: 30,
        marginBottom: 20,
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#3C0A6B',
        borderRadius: 4,
        color: '#3C0A6B',
        paddingRight: 30,
        marginBottom: 20,
    },
});

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
        color: '#3C0A6B'
    },
    list: {
        paddingBottom: 20,
    },
    studentCard: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
        marginBottom: 10,
        backgroundColor: "#D4BEE4",
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    studentName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#3C0A6B'
    },
    input: {
        width: 80,
        padding: 5,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        textAlign: "center",
        backgroundColor: "#f5f5f5",
    },
    submitButton: {
        backgroundColor: "#3C0A6B",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 20,
        marginBottom: 10,
    },
    submitButtonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: 'bold',
    },
    border: {
        borderWidth: 1,
        borderColor: '#3C0A6B',
        borderRadius: 8,
        marginBottom: 20
    }
});

export default AdminMarks;

