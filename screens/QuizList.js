import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList, ActivityIndicator, Alert } from "react-native";
import axios from "axios";
import { GLOBAL_CONFIG } from '../components/global_config';
 // Replace with your backend URL
 import { SafeAreaView } from 'react-native-safe-area-context';
 import { ScrollView } from 'react-native-gesture-handler';
const QuizList = ({ route,navigation }) => {
  const {courseId,userId,admin}=route.params; // Get courseId from navigation params
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch quizzes when the screen loads
  useEffect(() => {
    fetchQuizzes();
  }, []);

  // Function to fetch quizzes from backend
  const fetchQuizzes = async () => {
    try {
      console.log("Getting Quizzes");
      const response = await axios.get(`http://${GLOBAL_CONFIG.SYSTEM_IP}:5000/quiz?courseId=${courseId}`);
      setQuizzes(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching quizzes:", error);
      Alert.alert("Error", "Failed to load quizzes.");
    } finally {
      setLoading(false);
    }
  };

  // Function to navigate to the quiz creation screen
  const handleAddQuiz = () => {
    const newQuizNumber = quizzes.length + 1; // Increment quiz number
    navigation.navigate("CreateQuiz", { quizNumber: newQuizNumber, courseId,userId});
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select a Quiz</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : (
        <FlatList
          data={quizzes}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.quizButton}
              onPress={() => navigation.navigate("Quiz", { quizNumber: item.quizNumber, courseId:courseId,admin:admin,userId:userId })}
            >
              <Text style={styles.quizText}>{`Quiz ${item.quizNumber}`}</Text>
            </TouchableOpacity>
          )}
        />
      )}

      {/* Button to add a new quiz */}
      {admin&&<TouchableOpacity style={styles.addButton} onPress={handleAddQuiz}>
        <Text style={styles.addButtonText}>+ Add Quiz</Text>
      </TouchableOpacity>}
    </View>
  );
};

export default QuizList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  quizButton: {
    backgroundColor: "#007bff",
    padding: 15,
    marginVertical: 10,
    borderRadius: 5,
    width: "80%",
    alignItems: "center",
  },
  quizText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  addButton: {
    marginTop: 20,
    backgroundColor: "#28a745",
    padding: 15,
    borderRadius: 5,
    width: "80%",
    alignItems: "center",
  },
  addButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
