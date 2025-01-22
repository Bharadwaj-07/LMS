import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';
import CourseDetailsToJoin from '../components/CourseDetailsToJoin';
import data from '../env.js'
const CoursesAvailable = () => {

    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchCourses = () => {
        console.log(data.ip)
        axios.get(`http://${data.ip}:3000/coursesAvailable`)
            .then((response) => {
                console.log(response.data)
                setCourses(response.data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    };
    useEffect(() => {
        fetchCourses();
        const interval = setInterval(() => {
            fetchCourses();
        }, 5000);
        return () => clearInterval(interval);
    }, []);


    if (loading) {
        return (
            <View style={styles.message}>
                <Text>Loading courses...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.message}>
                <Text>Error loading courses: {error}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                {courses.map((course) => (
                    <CourseDetailsToJoin
                        key={course._id}
                        course={course.subject}
                        instructor={course.instructor}
                        courseId={course.courseId}
                    />
                ))}
            </ScrollView>
        </View>
    );
};

export default CoursesAvailable;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    message: {
        flex: 1,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center'
    }
});