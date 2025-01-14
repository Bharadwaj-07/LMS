import React,{useState,useEffect,useRef,} from "react";
import { StyleSheet,View,Text } from "react-native";
export default function Home({navigation}){

    return(<View style={styles.container}>
        <View style={styles.rectangle}>
            <Text style={styles.title}>Home.</Text>
        </View>
    </View>)
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
    backgroundColor: 'white',
    opacity:0.8,

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
