import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Alert } from "react-native";
import { Checkbox } from "react-native-paper"; // Import Checkbox
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import axios from "axios";
import { GLOBAL_CONFIG } from '../../components/global_config';

export default function Mark({ navigation, route }) {
  const course = route.params.course;
  const date = new Date();
  const formattedDate = date.toISOString().split('T')[0];

  const [students, setStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);

  const getStudents = async () => {
    try {
      const response = await axios.post(
        `http://${GLOBAL_CONFIG.SYSTEM_IP}:5000/api/Attendance/students`,
        { course }
      );
      setStudents(response.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getStudents();
  }, []);

  const handleCheck = (studentId) => {
    setSelectedStudents((prevState) =>
      prevState.includes(studentId)
        ? prevState.filter((id) => id !== studentId)
        : [...prevState, studentId]
    );
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        `http://${GLOBAL_CONFIG.SYSTEM_IP}:5000/api/Attendance/attendance`,
        {
          date: formattedDate,
          course,
          attendance: selectedStudents,
        }
      );
      Alert.alert("Attendance marked successfully");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={["top"]}>
        <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: "center", justifyContent: "center" }}>
          {students.length === 0 ? (
            <Text style={styles.noStudentsText}>No students enrolled.</Text>
          ) : (
            students.map((student) => (
              <View key={student._id} style={styles.checkboxContainer}>
                <Checkbox
                  status={selectedStudents.includes(student._id) ? "checked" : "unchecked"}
                  onPress={() => handleCheck(student._id)}
                  color="#005d5f"
                />
                <Text style={styles.studentName}>{student.name}</Text>
                <Text style={styles.studentName}>{student.uname}</Text>
              </View>
            ))
          )}
          {students.length > 0 && (
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          )}
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "gray",
  },
  button: {
    backgroundColor: "#005d5f",
    paddingVertical: 10,
    borderRadius: 5,
    alignSelf: "center",
    alignItems: "center",
    width: "60%",
    marginBottom: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  studentName: {
    fontSize: 16,
    marginLeft: 10,
  },
});
