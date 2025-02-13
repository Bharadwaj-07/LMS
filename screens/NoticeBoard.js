import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GLOBAL_CONFIG } from '../components/global_config';

export default function NoticeBoard({ navigation,route }) {
    const [notices, setNotices] = useState([]);
    const admin=route.params.admin;
    console.log(admin.admin);
    const [message, setMessage] = useState('');
    const [userId, setUserId] = useState('');
    const flatListRef = useRef(null); // Reference to FlatList

    useEffect(() => {
        fetchNotices();
        getUserId();
    }, []);

    const getUserId = async () => {
        try {
            const storedUserId = await AsyncStorage.getItem('uname');
            setUserId(storedUserId || '');
        } catch (error) {
            console.error('Error fetching user ID:', error);
        }
    };

    const fetchNotices = async () => {
        try {
            const response = await axios.get(`http://${GLOBAL_CONFIG.SYSTEM_IP}:5000/api/notices`);
            setNotices(response.data);
        } catch (error) {
            console.error("Error fetching notices:", error);
        }
    };

    const postNotice = async () => {
        if (!message.trim()) {
            Alert.alert("Error", "Message cannot be empty!");
            return;
        }

        try {
            await axios.post(`http://${GLOBAL_CONFIG.SYSTEM_IP}:5000/api/notices/add`, {
                message,
                uname: userId,
                isAdmin:admin
            });
            setMessage('');
            fetchNotices(); // Refresh the notice list

            // Scroll to the bottom after a short delay
            setTimeout(() => {
                flatListRef.current?.scrollToEnd({ animated: true });
            }, 300);
        } catch (error) {
            console.error("Error posting notice:", error);
            Alert.alert("Error", "Unable to post message.");
        }
    };

    return (
        <KeyboardAvoidingView 
            style={styles.container}
            behavior='padding'
            
        >
            <Text style={styles.header}>Notice Board</Text>
            <FlatList
                ref={flatListRef} // Attach ref to FlatList
                data={notices}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <View style={[styles.notice,item.isAdmin ? styles.adminNotice : styles.userNotice]}>
                        <Text style={styles.noticeText}>
                            <Text style={styles.noticeUser}>{item.uname}:</Text> {item.message}
                        </Text>
                        <Text style={styles.noticeTime}>{new Date(item.timestamp).toLocaleString()}</Text>
                    </View>
                )}
                onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })} 
                onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })}
            />
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Write a notice..."
                    value={message}
                    onChangeText={setMessage}
                />
                <TouchableOpacity style={styles.button} onPress={postNotice}>
                    <Text style={styles.buttonText}>Post</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F6F4',
    },
    header: {
        fontSize: 26,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 10,
        color: '#3C0A6B',
    },
    scrollView: {
        flex: 1,
        marginBottom: 60, // Ensures space for the input box
    },
    scrollContainer: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    notice: {
        padding: 10,
        marginVertical: 5,
        backgroundColor: '#EEE',
        borderRadius: 8,
    },
    noticeText: {
        fontSize: 16,
    },
    noticeUser: {
        fontWeight: 'bold',
        color: '#3C0A6B',
    },
    noticeTime: {
        fontSize: 12,
        color: 'gray',
        marginTop: 5,
        textAlign: 'right',
    },
    inputContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: '#DDD',
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#3C0A6B',
        borderRadius: 8,
        padding: 10,
        marginRight: 10,
    },
    button: {
        backgroundColor: '#3C0A6B',
        padding: 10,
        borderRadius: 8,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },    userNotice: {
        backgroundColor: '#EEE',  // Normal user messages (light gray)
    },
    adminNotice: {
        backgroundColor: '#FFD700', // Admin messages (gold)
    },
});