import * as React from 'react';
import { SafeAreaView, ScrollView, View, StyleSheet, Alert } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import axios from 'axios';
import data from '../env.js'
import {
    PaperProvider,
    Card,
    Button,
    Title,
    Paragraph,
} from 'react-native-paper';

const CardDetails = ({ course, instructor, id, fetchClasses }) => {
    const handlePress = () => {
        console.log('Card pressed');
    };

    const handleLongPress = () => {
        console.log('Card long-pressed');
    };

    const deleteClass = async (classId) => {
        try {
            const response = await axios.delete(`http://${data.ip}:3000/createClass/${classId}`);
            console.log(response.data.message);
            Alert.alert('Success', 'Classroom deleted successfully!');
            fetchClasses()
        } catch (error) {
            console.error('Error deleting class:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <View>
            <ScrollView>
                <Card
                    mode="elevated"
                    onPress={handlePress}
                    onLongPress={handleLongPress}
                    style={{ flex: 1, margin: 10 }}>
                    <Card.Content>
                        <Title style={{ fontSize: 25, fontWeight: '350', marginBottom: '5' }}>{course}</Title>
                        <Paragraph style={{ fontSize: 20, marginBottom: '5' }}>{instructor}</Paragraph>
                    </Card.Content>
                    <Card.Actions>
                        <Button onPress={() => deleteClass(id)} style={{
                            backgroundColor: '#3C0A6B',
                        }}>
                            <Ionicons name="trash-outline" color='white' size={20} />
                        </Button>
                    </Card.Actions>
                </Card>
            </ScrollView>
        </View >
    );
};

export default CardDetails;

