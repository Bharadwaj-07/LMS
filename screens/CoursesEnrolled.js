import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import CardDetails from '../components/CardDetails';
import data from '../env.js'


const CoursesEnrolled = () => {
    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    const fetchClasses = () => {
        console.log(data.ip)
        axios.get(`http://${data.ip}:3000/createClass`)
            .then((response) => {
                console.log(response.data)
                setClasses(response.data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    };

    useFocusEffect(
        React.useCallback(() => {
            fetchClasses();
        }, [])
    );


    if (loading) {
        return (
            <View style={styles.message}>
                <Text>Loading classes...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.message}>
                <Text>Error loading classes: {error}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                {classes.map((classItem) => (
                    <CardDetails
                        key={classItem._id}
                        course={classItem.className}
                        instructor={classItem.instructorName}
                        id={classItem._id}
                        fetchClasses={fetchClasses}

                    />
                ))}
            </ScrollView>
        </View>
    );

}

export default CoursesEnrolled;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    message: {
        flex: 1,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center'
    }
});