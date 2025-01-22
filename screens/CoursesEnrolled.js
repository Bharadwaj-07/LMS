import { StyleSheet, Text, View, ScrollView } from 'react-native';
import CardDetails from '../components/CardDetails';


const CoursesEnrolled = () => {
    return (<View style={styles.container}>
        <ScrollView>
            <CardDetails course="Industrial Software Engineering" instructor="Sridhar Chimalakonda" />
            <CardDetails course="Industrial Software Engineering" instructor="Sridhar Chimalakonda" />
            <CardDetails course="Industrial Software Engineering" instructor="Sridhar Chimalakonda" />
            <CardDetails course="Industrial Software Engineering" instructor="Sridhar Chimalakonda" />
            <CardDetails course="Industrial Software Engineering" instructor="Sridhar Chimalakonda" />
            <CardDetails course="Industrial Software Engineering" instructor="Sridhar Chimalakonda" />
            <CardDetails course="Industrial Software Engineering" instructor="Sridhar Chimalakonda" />
            <CardDetails course="Industrial Software Engineering" instructor="Sridhar Chimalakonda" />
            <CardDetails course="Industrial Software Engineering" instructor="Sridhar Chimalakonda" />
        </ScrollView>
    </View>)

}

export default CoursesEnrolled;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});