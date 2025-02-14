import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Alert, FlatList } from "react-native";
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
    <View style={styles.container}>
      {students.length === 0 ? (
        <Text style={styles.noStudentsText}>No students enrolled.</Text>
      ) : (
        <FlatList
          data={students}
          keyExtractor={(student) => student._id}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <View style={styles.checkboxContainer}>
              <Checkbox
                status={selectedStudents.includes(item._id) ? "checked" : "unchecked"}
                onPress={() => handleCheck(item._id)}
                color="#3C0A6B"
              />
              <Text style={styles.studentName}>{item.name}</Text>
            </View>
          )}
        />
      )}

      {students.length > 0 && (
        <View style={styles.submitContainer}>
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );



}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 100,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  studentName: {
    fontSize: 18,
    marginLeft: 10,

  },
  submitContainer: {
    position: "absolute",
    bottom: 10,
    left: 0,
    right: 0,
    alignItems: "center",
    paddingVertical: 10,
  },
  button: {
    backgroundColor: "#3C0A6B",
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
    width: "95%",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
