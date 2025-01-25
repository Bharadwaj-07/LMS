import * as React from 'react';
import { SafeAreaView, ScrollView, View, StyleSheet, Text } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { GLOBAL_CONFIG } from './global_config';
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
                        <Paragraph style={{ fontSize: 15, marginBottom: '5' }}>CourseId To Join : <Text style={{ fontSize: 15, fontWeight: 'bold' }} >{courseId}</Text>
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
        </View >
    );
};

export default CourseDetailsToJoin;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#fff',
    },
    idContainer: {
        flex: 5
    },
    id2Container: {
        flex: 1
    }
});