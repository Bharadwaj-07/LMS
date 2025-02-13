import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from "react-native";
import axios from "axios";
import { GLOBAL_CONFIG } from '../components/global_config';

const API_URL = `http://${GLOBAL_CONFIG.SYSTEM_IP}:5000/api/quizzes`;

export default function QuizCreator({ navigation }) {
  const [questions, setQuestions] = useState([{ questionText: "", options: [], answer: "" }]);
  const courseId = "CS201"; // Change this dynamically if needed

  // Function to update question text
  const updateQuestionText = (index, text) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].questionText = text;
    setQuestions(updatedQuestions);
  };

  // Function to update option text
  const updateOptionText = (qIndex, oIndex, text) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].options[oIndex] = text;
    setQuestions(updatedQuestions);
  };

  // Function to update answer text
  const updateAnswerText = (qIndex, text) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].answer = text;
    setQuestions(updatedQuestions);
  };

  // Function to add a new option for a specific question
  const addOption = (qIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].options.push("");
    setQuestions(updatedQuestions);
  };

  // Function to add a new question
  const addQuestion = () => {
    setQuestions([...questions, { questionText: "", options: [], answer: "" }]);
  };

  // Submit the quiz to the server
  const submitQuiz = async () => {
    try {
      const updatedQuestions = questions.map((q) => ({
        ...q,
        options: [...q.options, q.answer], // Ensure the answer is added to the options
      }));

      // Determine quiz number (fetch last quiz and increment)
      const quizListResponse = await axios.get(`${API_URL}?courseId=${courseId}`);
      setQuizzes(response.data);
      const quizzes = quizListResponse.data;
      const quizNumber = quizzes.length + 1; // Increment from last quiz

      const payload = { courseId, quizNumber, questions: updatedQuestions };

      const response = await axios.post(API_URL, payload);

      if (response.status === 201 || response.status === 200) {
        Alert.alert("Success", `Quiz ${quizNumber} saved successfully`);
        navigation.goBack(); // Navigate back to Quiz List
      }
    } catch (error) {
      console.error("Error submitting quiz:", error);
      Alert.alert("Error", "Failed to save quiz. Try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quiz Creator</Text>
      {questions.map((q, qIndex) => (
        <View key={qIndex} style={styles.rectangle}>
          <TextInput
            style={styles.input}
            placeholder="Enter question..."
            value={q.questionText}
            onChangeText={(text) => updateQuestionText(qIndex, text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Answer"
            value={q.answer}
            onChangeText={(text) => updateAnswerText(qIndex, text)}
          />
          {q.options.map((option, oIndex) => (
            <TextInput
              key={oIndex}
              style={styles.input}
              placeholder={`Option ${oIndex + 1}`}
              value={option}
              onChangeText={(text) => updateOptionText(qIndex, oIndex, text)}
            />
          ))}
          <TouchableOpacity style={styles.small_button} onPress={() => addOption(qIndex)}>
            <Text style={styles.buttonText}>Add Option</Text>
          </TouchableOpacity>
        </View>
      ))}
      <TouchableOpacity style={styles.button} onPress={addQuestion}>
        <Text style={styles.buttonText}>Add Question</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={submitQuiz}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

// Define styles inside the file
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f3f2",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  rectangle: {
    width: "80%",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.7)",
    marginBottom: 15,
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    width: "85%",
    backgroundColor: "white",
    opacity: 0.6,
  },
  small_button: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: "center",
    width: "60%",
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

