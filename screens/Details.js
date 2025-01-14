import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, TextInput, TouchableOpacity, } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SubjectToAvailability from '../components/SubjectToAvailability';
import { newUser,setUserDetails } from './signup'; 
import {ValidateAge,ValidateEmail,ValidateName,ValidatePhoneNumber,ValidateUserName} from "../components/Validations";
// import { set } from 'mongoose';
export default function Details({ route,navigation }) {
  const{Uname}=route.params;
  const [email, setEmail] = useState('');
  const [ValidEmail,setVEmail]=useState(true);
  const [Name, setName] = useState("");
  const [ValidName,setVName]=useState(true);
  const [Age, setAge] = useState("");
  const [ValidAge,setVAge]=useState(true);
  const [College, setCollege] = useState("");
  const [ValidCollege,setVCollege]=useState(true);
  const [Number, setNumber] = useState("");
  const [ValidNumber,setVNumber]=useState(true);
  const [ValidUser,setVUser]=useState(false);
  const [Inputs,setInputs]=useState(false);
    const handleDetails = () => {
    setVUser(true);
    
    console.log("visited");
    console.log(email);
    if(!ValidateEmail(email)){
      console.log("invalid");
      setVEmail(false);
      setVUser(false);
    }
    else{
      setVEmail(true);
      console.log(ValidEmail);
    }
    if(!ValidateAge(Age)){
      setVAge(false);
      setVUser(false);
    }
    else{
      setVAge(true);
    }
    if(!ValidateName(College)){
      setVCollege(false);
      setVUser(false);
    }
    else{
      setVCollege(true);
    }
    if(!ValidatePhoneNumber(Number)){
      setVNumber(false);
      setVUser(false);
    }
    else{
      setVNumber(true);
    }
    if(!ValidateName(Name)){
      setVName(false);
      setVUser(false);
    }
    else{
      setVName(true);
    }
    setInputs(false);
    if(ValidUser){
    const UserDetails={
      Uname,
      email,
      Age,
      College,
      Number, 
      Name,
    }
    console.log(UserDetails);
    navigation.navigate("Password",UserDetails);}
    else{
      setInputs(true);
    }
  }
  
  return (

    <ImageBackground source={require("../assets/IIT_Admin_Block.png")}
      style={styles.container}>

      <View style={styles.rectangle}>
        <Image source={require("../assets/hat_icon.png")}
          style={styles.medium_icon}
        />
        {(!ValidUser&&Inputs)&&<Text style={[styles.text, { color:"red" }]}>Invalid Inputs</Text>}
        {/**Name Input */}
        <TextInput style={[styles.input,{borderColor:ValidName?'white':'red'}]}
          placeholder='name'
          value={Name}
          onChangeText={setName}>
          </TextInput>

        {/* email Input */}
        <SubjectToAvailability
          Name={email}
          setName={setEmail}
          fieldName="email"
          Color={ValidEmail}>
          </SubjectToAvailability>
         
        <SubjectToAvailability style={styles.input}
          Name={Number}
          setName={setNumber}
          fieldName="number"
          Color={ValidNumber}></SubjectToAvailability>
         
        <TextInput style={[styles.input,{borderColor:ValidAge?'white':'red'}]}
          placeholder='age'
          value={Age}
          onChangeText={setAge}></TextInput>
        
        <TextInput style={[styles.input,{borderColor:ValidCollege?'white':'red'}]}
          placeholder='college'
          value={College}
          onChangeText={setCollege}></TextInput>
        
        <TouchableOpacity style={styles.button}
          onPress={()=>handleDetails()}><Text style={styles.buttonText}>Next</Text></TouchableOpacity>
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
