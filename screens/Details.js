import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, TextInput, TouchableOpacity, Alert, Form } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SubjectToAvailability from '../components/SubjectToAvailability';
export default function Details({ navigation }) {
  const [email, setEmail] = useState('');
  const [Name, setName] = useState("");
  const [Age, setAge] = useState();
  const [College,setCollege] = useState("");
  const [Number,setNumber] = useState("");
  const handleDetails=() => {}
  return (

    <ImageBackground source={require("../assets/IIT_Admin_Block.png")}
      style={styles.container}>

      <View style={styles.rectangle}>
        <Image source={require("../assets/hat_icon.png")}
          style={styles.medium_icon}
        />
        {/**Name Input */}
        <TextInput style={styles.input}
          placeholder='Name'
          value={Name}
          onChangeText={setName}></TextInput>
        {/* email Input */}
        <SubjectToAvailability
          Name={email}
          setName={setEmail}
          fieldName="Email" />
        <SubjectToAvailability style={styles.input}
          Name={Number}
          setName={setNumber}
          fieldName="Phone Number"></SubjectToAvailability>
        <TextInput style={styles.input}
          placeholder='Age'
          value={Age}
          onChangeText={setAge}></TextInput>

        <TextInput style={styles.input}
          placeholder='College'
          value={College}
          onChangeText={setCollege}></TextInput>
          <TouchableOpacity style={styles.button} 
            onPress={handleDetails}><Text style={styles.buttonText}>Next</Text></TouchableOpacity>
      </View>

    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  small_button: {
    fontSize: 12,
    padding: 10,
  },
  small_text: {
    fontSize: 14,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f3f2',

  },
  medium_icon: {
    opacity: 1,
    width: 40,
    height: 40,
    resizeMode: "contain",
    border: 5,
    padding: 10,
  },
  rectangle: {
    width: '90%', // Adjust as needed
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.7)",
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 5,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    opacity: 0.6,
    width: "89%",
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    width: '60%'

  },
  buttonText: {
    color: 'rgba(255,255,255,1)',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
