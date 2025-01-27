import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from "react-native";
import { GLOBAL_CONFIG } from '../../components/global_config';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Dates({ navigation, route }) {
  const {course} = route.params;
  const [dates, setDates] = useState([]);
  const [attendedDates, setAttendedDates] = useState([]); 

  const getDates = async () => {
    try {
      let user=await AsyncStorage.getItem('uname');
      user=user.toLowerCase();
      const response = await axios.post(`http://${GLOBAL_CONFIG.SYSTEM_IP}:5000/api/Attendance/dates`, {
        course: course
      });
      const attendanceData=response.data;
      const attended = await axios.post(`http://${GLOBAL_CONFIG.SYSTEM_IP}:5000/api/Attendance/UserAttendance`,
        {course: course, user: user}
      );
      const dateArray = attendanceData.map(entry => entry.date);
      setDates(dateArray);
      
      setAttendedDates(attended);
      console.log("Dates:", dates); 
      console.log("Attended dates",attended)
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getDates();
  }, []);


  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={['top']}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          {dates.map((item) => (
            <TouchableOpacity
              key={item}
              style={[styles.tab, attendedDates.data.includes(item) ? styles.attendedTab : styles.missedTab]}
            >
              <Text style={styles.tabText}>{item}</Text>
            </TouchableOpacity>
          ))}
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
    backgroundColor: 'gray',
  },
  tab: {
    paddingVertical: 10,
    borderRadius: 5,
    alignSelf: 'center',
    alignItems: 'center',
    width: '80%',
    marginBottom: 10,
  },
  attendedTab: {
    backgroundColor: 'green', // Green for attended
  },
  missedTab: {
    backgroundColor: 'red', // Red for missed
  },
  tabText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#005d5f',
    paddingVertical: 10,
    borderRadius: 5,
    alignSelf: 'center',
    alignItems: 'center',
    width: '60%',
    marginBottom: 10,
  },
});
