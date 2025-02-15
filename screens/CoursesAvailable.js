import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import CourseDetailsToJoin from '../components/CourseDetailsToJoin';
import { GLOBAL_CONFIG } from '../components/global_config';

const CoursesAvailable = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchCourses = () => {
        axios.get(`http://${GLOBAL_CONFIG.SYSTEM_IP}:5000/coursesAvailable`)
            .then((response) => {
                setCourses(response.data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
            
    };

    useFocusEffect(
        React.useCallback(() => {
            fetchCourses();
        }, [])
    );

    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#007BFF" />
                <Text style={styles.loadingText}>Loading courses...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.centered}>
                <Text style={styles.errorText}>Error loading courses: {error}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {courses.length > 0 ? (
                    courses.map((course) => (
                        <CourseDetailsToJoin
                            key={course._id}
                            course={course.subject}
                            instructor={course.instructor}
                            courseId={course.classId}   
                        />
                    ))
                ) : (
                    <View style={styles.noCoursesContainer}>
                        <Text style={styles.noCoursesText}>No courses available</Text>
                    </View>
                )}
            </ScrollView>
        </View>
    );
};

export default CoursesAvailable;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    scrollContainer: {
        flexGrow: 1,
        paddingVertical: 20,
        paddingHorizontal: 16,
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#007BFF',
    },
    errorText: {
        fontSize: 16,
        color: '#D9534F',
        textAlign: 'center',
    },
    noCoursesContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    noCoursesText: {
        fontSize: 18,
        color: '#6C757D',
        textAlign: 'center',
    },
});
