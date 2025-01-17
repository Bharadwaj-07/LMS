import React, { useState, useEffect, useRef, } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { GLOBAL_CONFIG } from '../components/global_config';
import { Alert, Modal, Pressable } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import axios from "axios";
export default function Home({navigate,route}) {
  const setModalVisibility = () => {
    setModalVisible(!modalVisible);
    setJoin(!join);
  }
  const[User,setUser]=useState(route.params);
  const [modalVisible, setModalVisible] = useState(false);
  const [join, setJoin] = useState(true);
  const courses=[];
  const getUserCourses = async () => {
    try {
      const response = await axios.post(`http://${GLOBAL_CONFIG.SYSTEM_IP}:5000/api/Users/getCourses`, { 
        uname: User
      });
      console.log("Courses:", response.data); // Log actual courses data
      return response.data; // Return the courses data if needed
    } catch (error) {
      console.error("Error fetching courses:", error); // Log errors
      throw error; // Re-throw the error if you need to handle it elsewhere
    }
  };
  //running the anonymous function is tricky
  (async () => {
    try {
      await getUserCourses();
      console.log("Checking");
    } catch (error) {
      console.error("Caught error:", error);
    }
  })();
  return (<SafeAreaProvider>
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {/* <Modal style={styles.container}></Modal> */}
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity style={styles.button}><Text style={styles.buttonText}>Create New Class</Text></TouchableOpacity>
            <TouchableOpacity style={styles.button}><Text style={styles.buttonText}>Join a Class</Text></TouchableOpacity>
          </View>
          {(!join) && <TouchableOpacity style={styles.addIcon} onPress={setModalVisibility}><Image source={require("../assets/back_arrow.jpg")} style={styles.addIcon}></Image></TouchableOpacity>
          }

        </View>
      </Modal>
      {(join) && <TouchableOpacity onPress={setModalVisibility}><Image source={require("../assets/add_symbol.png")} style={styles.addIcon}></Image></TouchableOpacity>
      }

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

