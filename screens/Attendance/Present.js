import React, { use, useState,useEffect } from 'react';
import axios from 'axios'
import { StyleSheet, View, ImageBackground, Text, TouchableOpacity, TextInput, } from 'react-native';
import debounce from 'lodash.debounce';
import { GLOBAL_CONFIG } from '../../components/global_config';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
export default function AttendanceDate({navigation,route}){
    const [students,setStudents]=useState([]);
    console.log("Route:",route);
    const course=route.params.course;
    const date=route.params.date;
    const getStudents=async()=>{
        try {
            const response = await axios.get(`http://${GLOBAL_CONFIG.SYSTEM_IP}:5000/api/Attendance/attendance`,{params:{ course: course,
              date: date
            }});
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
    return (<SafeAreaView>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            {students.map(student=>(
                <View key={student}>
                    <Text>{student}</Text>
                </View>))}
           </ScrollView>
    </SafeAreaView>);

}