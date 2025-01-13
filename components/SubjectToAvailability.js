
import React, { use, useState } from 'react';
import axios from 'axios'
import { StyleSheet, View, ImageBackground, Text, TouchableOpacity, TextInput, } from 'react-native';
import debounce from 'lodash.debounce';
export default function SubjectToAvailability({Name,setName,fieldName}) {
    const handlePress = () => {

    }
    const [Status,setStatus]=useState("");
    const [available,setAvailable] = useState(false);
    const availability = async (Name) => {
        try {
            // Sending a POST request to check username availability
            console.log(Name);
            const response = await axios.post('http://10.25.75.67:5000/api/Users/check', { Name });

            // Log the full response for debugging (optional)
            console.log('Server Response:', response);

            // Handle response based on the data received
            if (response.data.available) {
                setAvailable(true);
            } else {
                setStatus(`${fieldName} is unavailable`);
                setAvailable(false);
            }
        } catch (error) {
            // Log error details for debugging
            console.error('Error occurred while checking username availability:', error.message);


        }

    }
    const delayCheckAvailability = debounce((Name) => {
        availability(Name);
    }, 500);
    const checkName = (text) => {
        {
            setName(text);
            if(Name!=''){
                availability(Name);
            }
        }
    }

    return (
        <View style={{
            width: "90%",
            alignItems: "center",
        }}>
            <TextInput style={styles.input}
                placeholder={fieldName}
                value={Name}
                onChangeText={checkName}></TextInput>
            {(Status != '') &&
                <Text style={[styles.text, { color: available ? "green" : "red" }]}>{Status}</Text>}
        </View>
           );
}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f3f2',

    },
    text: {
        textAlign: "center",
        fontSize: 10,
        backgroundColor: "white",
        opacity: 0.6,
        fontWeight: 'bold',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    button: {
        backgroundColor: '#007bff',
        paddingVertical: 15,
        borderRadius: 5,
        alignItems: 'center',
        width: '50%',
        margin: 5,

    }, input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom:5,
        paddingHorizontal: 10,
        width: '99%',
        backgroundColor: 'white',
        opacity: 0.6,
    },
    buttonText: {
        color: 'rgba(255,255,255,1)',
        fontSize: 16,
        fontWeight: 'bold',
    },
});