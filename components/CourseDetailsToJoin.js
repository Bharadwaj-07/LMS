import * as React from 'react';
import { SafeAreaView, ScrollView, View, StyleSheet, Text } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import {
    PaperProvider,
    Card,
    Button,
    Title,
    Paragraph,
} from 'react-native-paper';

const CourseDetailsToJoin = ({ course, instructor, courseId }) => {

    const handlePress = () => {
        console.log('Card pressed');
    };

    const handleLongPress = () => {
        console.log('Card long-pressed');
    };

    // Extract the subject code before "i-phun"
    const subjectCode = courseId.split('-')[0] || 'Unknown';

    return (
        <View>
            <ScrollView>
                <Card
                    mode="elevated"
                    onPress={handlePress}
                    onLongPress={handleLongPress}
                    style={{
                        flex: 1, margin: 10, borderWidth: 1,
                        borderColor: '#3C0A6B',
                        borderRadius: 10,
                        shadowColor: '#3C0A6B',
                        shadowOffset: { width: 2, height: 2 },
                        shadowOpacity: 0.2,
                        shadowRadius: 10,
                        elevation: 10,
                    }}>
                    <Card.Content>
                        <Title style={{ fontSize: 30, fontWeight: 'bold', marginBottom: 10 }}>{course}</Title>
                        <Paragraph style={{ fontSize: 21, marginBottom: 10, fontWeight: '500' }}>{instructor}</Paragraph>
                        <Paragraph style={{ fontSize: 18, marginBottom: 5, fontWeight: '400' }}>
                            CourseId To Join: <Text style={{ fontSize: 15, fontWeight: 'bold' }} >{courseId}</Text>
                        </Paragraph>
                        <Paragraph style={{ fontSize: 18, marginBottom: 5, fontWeight: '400' }}>
                            Subject Code: <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{subjectCode}</Text>
                        </Paragraph>
                    </Card.Content>
                    <Card.Actions>
                        <Button onPress={handlePress} style={{
                            backgroundColor: '#3C0A6B',
                        }}>
                            <Ionicons name="copy-outline" color='white' size={20} />
                        </Button>
                    </Card.Actions>
                </Card>
            </ScrollView>
        </View>
    );
};

export default CourseDetailsToJoin;
