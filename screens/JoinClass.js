import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { FontAwesome } from '@expo/vector-icons';

const JoinClass = () => {
    const [classCode, setClassCode] = useState('');
    const [loading, setLoading] = useState(false);
    const join = async () => {
        if (!classCode) {
            Alert.alert('Error', 'Please enter a class code!');
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post('http://', {
                classCode,
            });
            if (response.status === 200) {
                Alert.alert('Success', 'You have successfully joined the class!');
            }
        } catch (error) {
            Alert.alert('Error', 'Unable to join the class. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (

        <View style={styles.container}>
            <Text style={styles.title}>Join Classroom</Text>

            <View style={styles.fieldContainer}>
                <Text style={styles.label}>Course ID</Text>
                <View style={styles.inputContainer}>
                    <FontAwesome name="building" size={20} color="#3C0A6B" />
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Class Code"
                        value={classCode}
                        onChangeText={setClassCode}
                        keyboardType="default"
                    />
                </View>
            </View>


            <TouchableOpacity style={styles.button} onPress={join}>
                <Text style={styles.buttonText}>Join</Text>
            </TouchableOpacity>
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        padding: 20,
        backgroundColor: '#f9f9f9',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#333',
    },
    fieldContainer: {
        marginBottom: 15,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#555',
        marginBottom: 5,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingHorizontal: 10,
    },
    input: {
        flex: 1,
        padding: 10,
        fontSize: 16,
        color: '#333',
    },
    button: {
        backgroundColor: '#3C0A6B',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default JoinClass;
