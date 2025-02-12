import * as React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState,useEffect,useFocusEffect } from 'react';
import { SafeAreaView, ScrollView, View, StyleSheet, Alert } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import axios from 'axios';
import { GLOBAL_CONFIG } from './global_config';
// import data from '../env.js'
import {
    PaperProvider,
    Card,
    Button,
    Title,
    Paragraph,
} from 'react-native-paper';


const CardDetails = ({ course, instructor, id, fetchClasses,navigation }) => {
    const handlePress = () => {
        console.log('Card pressed');
        navigation.navigate('Classroom',  course );
    };
    const [admin,setAdminData]=React.useState(false);
    const findAdmin = async() => {
        
        const userId = await AsyncStorage.getItem('uname');
        const user=userId.toLowerCase();
        console.log("User",user);
        try{
        const response = await axios.post(`http://${GLOBAL_CONFIG.SYSTEM_IP}:5000/api/Attendance/Admin`, {
            course,
            user,
        });
        console.log(response.data.admin);
        setAdminData(response.data.admin);
        return(response.data.admin);}
        catch (error) {
            console.error("Error fetching admin data:", error);
            Alert.alert("Error", "Unable to fetch admin data.");
        }
        return false;

    }

        findAdmin();
    const handleLongPress = () => {
        console.log('Card long-pressed');
    };

    
    

    const deleteClass = async (classId) => {
        try {
            let userId = await AsyncStorage.getItem('uname');
            console.log(classId,userId);
            const response = await axios.delete(`http://${GLOBAL_CONFIG.SYSTEM_IP}:5000/createClass/${classId}/${userId}/${admin}/${instructor}`);
            console.log(response.data.message);
            Alert.alert('Success', 'Classroom deleted successfully!');
            fetchClasses()
        } catch (error) {
            console.error('Error deleting class:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <View>
            <ScrollView>
                <Card
                    mode="elevated"
                    onPress={handlePress}
                    onLongPress={handleLongPress}
                    style={{ flex: 1, margin: 10 }}>
                    <Card.Content>
                        <Title style={{ fontSize: 25, fontWeight: '350', marginBottom: '5' }}>{course}</Title>
                        <Paragraph style={{ fontSize: 20, marginBottom: '5' }}>{instructor}</Paragraph> 
                        {admin ? <Paragraph style={{ fontSize: 20, marginBottom: '5' }}>Admin</Paragraph> : null}
                    </Card.Content>
                    <Card.Actions>
                        <Button onPress={() => deleteClass(course)} style={{
                            backgroundColor: '#3C0A6B',
                        }}>
                            <Ionicons name="trash-outline" color='white' size={20} />
                        </Button>
                    </Card.Actions>
                </Card>
            </ScrollView>
        </View >
    );
};

export default CardDetails;

