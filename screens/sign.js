import React, { useState } from 'react';
import { StyleSheet, Text, View, Image,ImageBackground, TextInput, TouchableOpacity, Alert,Form} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SubjectToAvailability from '../components/availability_status';
export default function Details({navigation}) {
  const [Name,setName] = useState('');
  const [email, setEmail] = useState('');
  return (
      
      <ImageBackground source={require("../assets/IIT_Admin_Block.png")}
      style={styles.container}>
        
      <View style={styles.rectangle}>
        <Image source={require("../assets/hat_icon.png")}
        style={styles.medium_icon}
        />
        {/* email Input */}
       <SubjectToAvailability {...{email,setEmail,fieldName:"Email"}}/>
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
    backgroundColor:'white',
    opacity:0.6,
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
