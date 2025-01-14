import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, TextInput, TouchableOpacity, Alert, Form } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from "axios"
export default function LoginPage({ navigation }) {
  const [UserName, setUname] = useState('');
  const [password, setPassword] = useState('');
  const [authenticate, setAuthenticate] = useState(false);
  const [failure, setFailure] = useState(false);
  const ForgotPassword = () => {
    Alert.alert("Please contact the concerned TA");
  };
  HandleLogin = async (UserName, password) => {
    if (password != "" && UserName != "") {
      try {
        // Send the POST request to the backend API
        const response = await axios.post('http://10.25.75.67:5000/api/Users/login', { uname: UserName, passwd: password });
        console.log(response.data);
        setAuthenticate(response.data.verified);
        if (response.data.verified) {
          setUname("");
          setPassword("");
          setFailure(false);
          navigation.navigate("Home");
        }
        if(!response.data.verified) {
          console.log(failure);
          setFailure(true);
        }
      } catch (error) {
        // Handle error
        setStatus('Error saving data');
        console.error('Error:', error);
      }
    }

  }
  return (

    <ImageBackground source={require("../../assets/IIT_Admin_Block.png")}
      style={styles.container}>

      <View style={styles.rectangle}>
        <Image source={require("../../assets/hat_icon.png")}
          style={styles.medium_icon}
        />

        {/* Roll Number Input */}
        <TextInput
          style={styles.input}
          placeholder="User Name"
          value={UserName}
          onChangeText={setUname}
        />

        {/* Password Input */}
        <TextInput
          style={styles.input}
          placeholder="Enter Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        {(failure) && <Text style={styles.title}>Wrong Username or Password!!</Text>}
        {/*Forgot Password */}
        <TouchableOpacity style={styles.small_button} onPress={ForgotPassword}><Text style={styles.small_text}>Forgot Password?</Text></TouchableOpacity>
        {/* Login Button */}
        <TouchableOpacity style={styles.button} onPress={() => HandleLogin(UserName, password)} >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        {/* New User */}
        <TouchableOpacity style={styles.small_button} onPress={() => navigation.navigate("Signup")}><Text style={styles.small_text}>New User? Sign Up</Text></TouchableOpacity>

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
    width: 70,
    height: 70,
    resizeMode: "contain",
    border: 5,
    padding: 10,
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
    marginBottom: 15,
    paddingHorizontal: 10,
    width: '85%',
    backgroundColor: 'white',
    opacity: 0.6,
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
