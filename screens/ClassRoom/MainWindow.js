import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, TextInput, TouchableOpacity, Alert, Form } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from "axios"
import { GLOBAL_CONFIG } from '../../components/global_config';
import ClassTab from '../../components/classTab';
export default function MainWindow({navigation,route}) {
    return(
    <View style={styles.container}>
        <View style={styles.centeredView}>
            <View style={[styles.rectangle,{width:"100%",alignItems:"center"}]}>
                <Text style={{fontSize:20,fontWeight:"bold",height:30}}>{route.params}</Text>
            </View>
            <TouchableOpacity style={[styles.modalView, { backgroundColor: "#13f" }]}>
                <Text style={styles.buttonText}>Notice Board</Text></TouchableOpacity>
            <TouchableOpacity style={[styles.modalView, { backgroundColor: "#7ef" }]}>
                <Text style={styles.buttonText}>Attendance</Text></TouchableOpacity>
            <TouchableOpacity style={[styles.modalView, { backgroundColor: "#91f" }]}>
                <Text style={styles.buttonText}>Progress</Text></TouchableOpacity>
            <TouchableOpacity style={[styles.modalView, { backgroundColor: "#e11" }]}>
                <Text style={styles.buttonText}>Assignments</Text></TouchableOpacity>
        </View>
    </View>);
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    centeredView: {
        flex: 1,
        position: 'relative',
        alignItems: 'center',
        top:20,
        marginTop: 22,
    },
    modalView: {
        margin: 5,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        width:"80%",
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
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        margin: 10,
        width: 200,
        backgroundColor: '#2196F3',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 20,
    },
    addIcon: {
        width: 50,
        height: 50,
    },
    rectangle: {
        width: '90%', // Adjust as needed
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: "rgba(119, 9, 9, 0.7)",
      }
});