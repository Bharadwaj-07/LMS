import React, { useState, useEffect, useRef, } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { GLOBAL_CONFIG } from '../../components/global_config';
import { Alert, Modal, Pressable } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import axios from "axios";
import API from "../../Middleware/API";
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function Dates({navigation,route}){
        const HandleAttendance=()=>{};
        const course='CS101';
        const [dates,setDates]=useState([]);
        const getDates=async()=>{
                try {
                        const response = await axios.post(`http://${GLOBAL_CONFIG.SYSTEM_IP}:5000/api/Attendance/dates`, { 
                          course: course
                        });
                        console.log("Dates:", response.data); // Log actual courses data
                        setDates(response.data);
                }
                catch(e){
                        console.log(e);
                }
        }
        useEffect(()=>{
                getDates();
        },[]);
        return (
                <SafeAreaProvider>
                    <SafeAreaView style={styles.container} edges={['top']}>
                        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                            {dates.map((item) => (
                                <TouchableOpacity
                                    key={item.date}
                                    style={styles.button}
                                    onPress={() => {
                                        navigation.navigate('Present', { course: course, date: item });
                                    }}
                                >
                                    <Text style={styles.buttonText}>{item.date}</Text>
                                </TouchableOpacity>
                            ))}
                                <TouchableOpacity style={styles.button} onPress={() => {
                                        navigation.navigate('Mark', { course: course });
                                    }}>
                                        <Text style={styles.buttonText}>Take Attendance</Text>
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
      
      