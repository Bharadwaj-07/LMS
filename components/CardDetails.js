import * as React from 'react';
import { SafeAreaView, ScrollView, View, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import {
    PaperProvider,
    Card,
    Button,
    Title,
    Paragraph,
} from 'react-native-paper';

const CardDetails = ({ course, instructor }) => {
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
                        <Title>{course}</Title>
                        <Paragraph>{instructor}</Paragraph>
                    </Card.Content>
                    <Card.Actions>
                        <Button onPress={() => console.log('Button 2 pressed')} style={{
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

