import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import axios from "axios";
import { RadioButton } from 'react-native-paper';
import { GLOBAL_CONFIG } from "../components/global_config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
const Quiz = ({ route,navigation }) => {
    const { quizNumber, courseId,admin,userId } = route.params;
    const studentId=userId;
    console.log(studentId);
    console.log(quizNumber);
    const [quiz, setQuiz] = useState(null);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [loading, setLoading] = useState(true);
    const [previousAttempts, setPreviousAttempts] = useState([]);
    const [totalAttempts, setTotalAttempts] = useState(0);
    useEffect(() => {
        
        fetchQuiz();
    }, []);
    const fetchQuiz = async () => {
        try {
            
            const url = `http://${GLOBAL_CONFIG.SYSTEM_IP}:5000/quiz/${courseId}/${quizNumber}/${studentId}`;
            console.log("Fetching Quiz from:", url);  // Debugging URL
            const response = await axios.get(url);
            setQuiz(response.data.quiz);
            setPreviousAttempts(response.data.previousAttempts);
            setTotalAttempts(response.data.totalAttempts);
        } catch (error) {
            console.error("Error fetching quiz:", error);
            Alert.alert("Error", "Failed to load quiz.");
        } finally {
            setLoading(false);
        }
    };

    const handleSelectAnswer = (questionId, option) => {
        setSelectedAnswers({ ...selectedAnswers, [questionId]: option });
    };

    const submitQuiz = async () => {
        try {
            const formattedAnswers = quiz.questions.map((q, index) => ({
                questionId: index,
                selectedOption: selectedAnswers[index] || ""
            }));
            console.log(formattedAnswers);
            const response = await axios.post(`http://${GLOBAL_CONFIG.SYSTEM_IP}:5000/quiz/submitQuiz`, {
                studentId,
                quizNumber,
                courseId,
                answers: formattedAnswers
            });

            Alert.alert("Submitted!", `Your score: ${response.data.score}`);
            fetchQuiz(); // Reload attempts after submission
        } catch (error) {
            console.error("Error submitting quiz:", error);
            Alert.alert("Error", "Failed to submit quiz.");
        }
    };

    if (loading) return <ActivityIndicator size="large" color="#007bff" />;

    return (
        <SafeAreaView>
            <ScrollView>
                <View style={{ padding: 20 }}>
            <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 10 }}>{quiz.title}</Text>

            <Text style={{ fontSize: 18, marginBottom: 10 }}>Total Attempts: {totalAttempts}</Text>

            {previousAttempts.length > 0 && (
                <View style={{ marginBottom: 20 }}>
                    <Text style={{ fontSize: 18, fontWeight: "bold" }}>Previous Scores:</Text>
                    {previousAttempts.map((attempt, index) => (
                        <Text key={index} style={{ fontSize: 16, color: "green" }}>
                            Attempt {index + 1}: {attempt.score} / {quiz.questions.length}
                        </Text>
                    ))}
                </View>
            )}

            {quiz.questions.map((question, index) => (
                <View key={index} style={{ marginBottom: 20 }}>
                    <Text style={{ fontSize: 18 }}>{question.questionText}</Text>
                    {question.options.map((option, optionIndex) => (
                        <TouchableOpacity key={optionIndex} style={{ flexDirection: "row", alignItems: "center", marginTop: 5 }}
                            onPress={() => handleSelectAnswer(index, option)}>
                            <RadioButton
                                value={option}
                                status={selectedAnswers[index] === option ? 'checked' : 'unchecked'}
                                onPress={() => handleSelectAnswer(index, option)}
                            />
                            <Text style={{ fontSize: 16 }}>{option}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            ))}

            {!admin&&<TouchableOpacity onPress={submitQuiz} style={{ backgroundColor: "#007bff", padding: 15, borderRadius: 5, marginTop: 20 }}>
                <Text style={{ color: "white", fontSize: 18, textAlign: "center" }}>Submit Quiz</Text>
            </TouchableOpacity>}
        </View>
            </ScrollView>
        </SafeAreaView>
        
    );
};

export default Quiz;
