import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import { GLOBAL_CONFIG } from "../components/global_config";

const AdminMarks = ({ navigation, route }) => {
    const course = route.params.course;
    const [selectedTest, setSelectedTest] = useState('');
    const [students, setStudents] = useState([]);
    const [message, setMessage] = useState([]);
    const [stats, setStats] = useState({ highest: "-", lowest: "-", average: "-" });
    const [maxMarks, setMaxMarks] = useState({ test1: "-", test2: "-", endSem: "-" });
    const [maxMarksLocal, setMaxMarksLocal] = useState({ test1: "-", test2: "-", endSem: "-" });
    const getMaxMarks = async () => {
        try {
            const response = await axios.post(`http://${GLOBAL_CONFIG.SYSTEM_IP}:5000/maxmarks/getmaxmarks`, { classId: course });
            if (response.data.data) 
                {setMaxMarks(response.data.data);
                        setMaxMarksLocal(response.data.data);}
        } catch (e) {
            console.error("Error fetching max marks:", e);
        }
    };
    const updateMaxMarks = async () => {
        if (!selectedTest) return Alert.alert("Error", "Please select a test.");
        try {
            await axios.post(`http://${GLOBAL_CONFIG.SYSTEM_IP}:5000/maxmarks/setmaxmarks`, {
                classId: course,
                test1:  maxMarksLocal["test1"],
                test2:maxMarksLocal["test2"],
                endSem:maxMarksLocal["endSem"]
            });
            setMaxMarks(prev => ({ ...prev, [selectedTest]: maxMarksLocal[selectedTest] }));
            Alert.alert("Success", "Max Marks updated successfully!");
        } catch (e) {
            console.error("Error updating max marks:", e);
        }

    };

    const getStudents = async () => {
        try {
            const response = await axios.post(`http://${GLOBAL_CONFIG.SYSTEM_IP}:5000/marks/getmarks`, { course: course });
            setStudents(response.data.data);
            setMessage(response.data.empty);
            calculateStats(response.data.data);
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        getStudents();
        getMaxMarks();
    }, []);

    const calculateStats = (studentsData) => {
        const testTypes = ["test1", "test2", "endSem"];
        let newStats = {};
        testTypes.forEach(test => {
            let validMarks = studentsData.map(student => student[test]).filter(mark => mark !== "-").map(Number);
            newStats[test] = validMarks.length > 0 ? {
                highest: Math.max(...validMarks),
                lowest: Math.min(...validMarks),
                average: (validMarks.reduce((sum, mark) => sum + mark, 0) / validMarks.length).toFixed(2)
            } : { highest: "-", lowest: "-", average: "-" };
        });
        setStats(newStats);
    };

    const handleMarksChange = (id, value) => {
        setStudents(prev => prev.map(student => student._id === id ? { ...student, [selectedTest]: value } : student));
    };

    useEffect(() => { if (students.length > 0) calculateStats(students); }, [students]);

    const handleSubmit = async () => {
        if (!selectedTest) return Alert.alert("Error", "Please select a test.");
        try {
            await axios.post(`http://${GLOBAL_CONFIG.SYSTEM_IP}:5000/marks/setmarks`, { students });
            Alert.alert("Marks updated");
        } catch (e) { console.log(e); }
    };

    const renderStudent = ({ item }) => (
        <View style={styles.studentCard}>
            <Text style={styles.studentName}>{item.name}</Text>
            <TextInput style={styles.input} keyboardType="numeric" placeholder="Marks"
                value={item[selectedTest] === "-" ? "" : item[selectedTest]}
                onChangeText={(value) => handleMarksChange(item._id, value)} />
        </View>
    );

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.container}>
                    <Text style={styles.title}>Student Marks</Text>
                    <View style={styles.pickerContainer}>
                        <Picker selectedValue={selectedTest} onValueChange={(value) => setSelectedTest(value)} style={styles.picker}>
                            <Picker.Item label="Select a Test" value="" />
                            <Picker.Item label="Test 1" value="test1" />
                            <Picker.Item label="Test 2" value="test2" />
                            <Picker.Item label="End Semester" value="endSem" />
                        </Picker>
                    </View>
                    
                    {selectedTest && (
                        <View style={styles.maxMarksContainer}>
                            <Text style={styles.maxMarksTitle}>🎯 Set Max Marks for {selectedTest.toUpperCase()}</Text>
                            <TextInput
                                style={styles.maxMarksInput}
                                keyboardType="numeric"
                                placeholder="Enter Max Marks"
                                value={maxMarksLocal[selectedTest] === "-" ? "" : String(maxMarksLocal[selectedTest])}
                                onChangeText={(value) => setMaxMarksLocal(prev => ({ ...prev, [selectedTest]: value }))}
                            />
                            <TouchableOpacity style={styles.updateButton} onPress={updateMaxMarks}>
                                <Text style={styles.updateButtonText}>Update Max Marks</Text>
                            </TouchableOpacity>
                        </View>
                    )}

                    {selectedTest && stats[selectedTest] && (
                        <View style={styles.statsContainer}>
                            <Text style={styles.statsTitle}>{selectedTest.toUpperCase()} Stats</Text>
                            <Text style={styles.statsText}>📊 Highest: {stats[selectedTest]?.highest}</Text>
                            <Text style={styles.statsText}>📉 Lowest: {stats[selectedTest]?.lowest}</Text>
                            <Text style={styles.statsText}>📈 Average: {stats[selectedTest]?.average}</Text>
                            <Text style={styles.statsText}>🎯 Max Marks: {maxMarks[selectedTest]}</Text>
                        </View>
                    )}
                    {!message && selectedTest && (
                        <FlatList data={students} keyExtractor={(item) => item._id} renderItem={renderStudent} contentContainerStyle={styles.list} />
                    )}
                    {message && <Text style={styles.noStudentsText}>No students joined.</Text>}
                    <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                        <Text style={styles.submitButtonText}>Submit Marks</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

export default AdminMarks;

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: "#F8F9FA" },
    container: { flex: 1, padding: 20 },
    title: { fontSize: 28, fontWeight: "bold", marginBottom: 20, textAlign: "center", color: "#4A148C" },
    pickerContainer: { borderWidth: 1, borderColor: "#4A148C", borderRadius: 12, backgroundColor: "#ECEFF1", marginBottom: 20 },
    picker: { height: 50, color: "#4A148C" },
    statsContainer: { backgroundColor: "#E1BEE7", padding: 15, borderRadius: 10, marginBottom: 20 },
    statsTitle: { fontSize: 20, fontWeight: "bold", color: "#4A148C", marginBottom: 5 },
    statsText: { fontSize: 16, color: "#311B92" },
    studentCard: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 15, backgroundColor: "#F3E5F5", borderRadius: 10, marginBottom: 12 },
    studentName: { fontSize: 18, fontWeight: "bold", color: "#4A148C", flex: 1 },
    input: { width: 80, padding: 10, borderWidth: 1, borderColor: "#7B1FA2", borderRadius: 8, textAlign: "center", backgroundColor: "#FFF" },
    submitButton: { backgroundColor: "#7B1FA2", padding: 15, borderRadius: 10, alignItems: "center", marginTop: 20 },
    submitButtonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
    noStudentsText: { textAlign: "center", fontSize: 16, color: "#D32F2F", marginVertical: 20 },
    maxMarksContainer: {
        backgroundColor: "#D1C4E9",
        padding: 12,
        borderRadius: 8,
        alignItems: "center",
        marginBottom: 15
    },
    maxMarksTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#4A148C"
    },
    maxMarksInput: {
        width: 100,
        padding: 10,
        borderWidth: 1,
        borderColor: "#7B1FA2",
        borderRadius: 8,
        textAlign: "center",
        backgroundColor: "#FFF",
        marginVertical: 8
    },
    updateButton: {
        backgroundColor: "#7B1FA2",
        padding: 10,
        borderRadius: 8,
        marginTop: 5
    },
    updateButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold"
    }
});
