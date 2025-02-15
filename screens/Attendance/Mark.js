import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Alert, FlatList, Switch } from "react-native";
import axios from "axios";
import { GLOBAL_CONFIG } from '../../components/global_config';

export default function Mark({ navigation, route }) {
  const course = route.params.course;
  const date = new Date();
  const formattedDate = date.toISOString().split('T')[0];

  const [students, setStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState({});

  useEffect(() => {
    const getStudents = async () => {
      try {
        const response = await axios.post(
          `http://${GLOBAL_CONFIG.SYSTEM_IP}:5000/api/Attendance/students`,
          { course }
        );
        setStudents(response.data);
        console.log(response,"Studnets");
      } catch (e) {
        console.error(e);
      }
    };

    getStudents();
  }, []);

  const handleToggle = (studentId) => {
    setSelectedStudents((prevSelectedStudents) => ({
      ...prevSelectedStudents,
      [studentId]: !prevSelectedStudents[studentId],
    }));
  };

  const handleSubmit = async () => {
    const attendanceList = Object.keys(selectedStudents).filter(
      (studentId) => selectedStudents[studentId]
    );
    try {
      console.log("posting", attendanceList);
      await axios.post(
        `http://${GLOBAL_CONFIG.SYSTEM_IP}:5000/api/Attendance/attendance`,
        {
          date: formattedDate,
          course,
          attendance: attendanceList,
        }
      );
      Alert.alert("Success", "Attendance marked successfully");
    } catch (e) {
      Alert.alert("Error", "Failed to mark attendance");
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
          keyExtractor={(item, index) => item._id || index.toString()}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Text style={styles.studentName}>{item.name}</Text>
              <Switch
                value={!!selectedStudents[item._id]}
                onValueChange={() => handleToggle(item._id)}
              />
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
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  studentName: {
    fontSize: 18,
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
