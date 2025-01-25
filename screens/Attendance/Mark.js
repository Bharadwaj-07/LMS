import React, { useState, useEffect, useRef, } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { GLOBAL_CONFIG } from '../../components/global_config';
import { Alert, Modal, Pressable } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import axios from "axios";
import API from "../../Middleware/API";
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function Mark({navigation,route}){
    const course=route.params.course;
    const date=new Date();
    const formattedDate = date.toISOString().split('T')[0];
    const [students,setStudents]=useState([]);
    const [selectedStudents, setSelectedStudents] = useState([]);
    const getStudents=async()=>{
        try {
            const response = await axios.get(`http://${GLOBAL_CONFIG.SYSTEM_IP}:5000/api/Attendance/students`,{params:{ course: course}});
            console.log("Students:", response.data); // Log actual courses data
            setStudents(response.data);
        }
        catch(e){
            console.log(e);
        }
    }
    useEffect(()=>{
        getStudents();
    },[]);
    const handleCheck = (student) => {
        setSelectedStudents((prevState) => {
          if (prevState.includes(student)) {
            return prevState.filter((item) => item !== student); 
          } else {
            return [...prevState, student]; 
          }
        });
      };
    
      const handleSubmit = async () => {
        try {
            const response = await axios.post(`http://${GLOBAL_CONFIG.SYSTEM_IP}:5000/api/Attendance/attendance`, {
                date: formattedDate,
                course: course,
                attendance: selectedStudents,
            });
            console.log(response.data);
            Alert.alert("Attendance marked successfully");
        } catch (e) {
          console.log(e);
        }
      };
    
      return (
        <SafeAreaProvider>
          <SafeAreaView style={styles.container} edges={['top']}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
              {students.map((item) => (
                <View key={item} style={styles.checkboxContainer}>
                  <CheckBox
                    value={selectedStudents.includes(item)}
                    onValueChange={() => handleCheck(item)}
                  />
                  <Text style={styles.buttonText}>{item}</Text>
                </View>
              ))}
              <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
            </ScrollView>
          </SafeAreaView>
        </SafeAreaProvider>
      );
}

const styles = StyleSheet.create({
    buttonText: {
      color: 'rgba(255,255,255,1)',
      fontSize: 16,
      fontWeight: 'bold',
    },
    container: {
      flex: 1,
      // Ensure parent is relatively positioned
      backgroundColor: 'gray',
    },
    button: {
      backgroundColor: '#005d5f',
      paddingVertical: 5,
      borderRadius: 5,
      alignSelf: 'center',
      alignItems: 'center',
      width: '60%',
      marginBottom: 10,
  
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
      alignSelf: 'center',
    },
    containerModal: {
      flex: 1,
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
      // Ensure parent is relatively positioned
      backgroundColor: 'gray',
    }, centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    rectangle: {
      flex: 1,
      width: '80%', // Adjust as needed   
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
    },
    addIcon: {
      position: 'absolute',
      bottom: 30,
      right: 30,
      width: 50,
      height: 70,
      resizeMode: 'contain',// Android-specific shadow
    },
    modalView: {
      margin: 20,
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
    rectangle: {
      width: '80%', // Adjust as needed
      padding: 20,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      backgroundColor: "rgba(255,255,255,0.7)",
      borderRadius: 10,
    },
    medium_icon: {
      fontSize: 40,
      width: '100%',
      height: '100%',
      resizeMode: 'contain',
    },
  });
  
  