import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginPage from './screens/Login/login'; // Adjust paths to your screens
import Signup from './screens/Login/signup';
import Details from './screens/Login/Details';
import Password from './screens/Login/Password';
import Home from './screens/Home';
import MainWindow from './screens/ClassRoom/MainWindow';
import ClassInput from './components/ClassInput'; 
const Stack = createStackNavigator();
const App=()=>{
  return (<NavigationContainer>
    <Stack.Navigator initialRouteName='Login'>
      <Stack.Screen name='Login' component={LoginPage}/>
      <Stack.Screen name="Home" component={Home}/>
      <Stack.Screen name='Signup' component={Signup}/>
      <Stack.Screen name='Details' component={Details}/>
      <Stack.Screen name='Password' component={Password}/>
      <Stack.Screen name='Class Room' component={MainWindow}/>
    </Stack.Navigator>
  </NavigationContainer>)
  // return (<ClassInput></ClassInput>);
 
}
export default App;
// import React, { useState } from 'react';
// import { StyleSheet, Text, View, Image, ImageBackground, TextInput, TouchableOpacity, ScrollView, } from 'react-native';
// import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
// export default function CourseDetails({courseCode,courseName,Instructor,Credits,Description,Department}) {
//     return (
//         <SafeAreaProvider>
//           <SafeAreaView style={styles.container}>
//             <ScrollView style={styles.container}contentContainerStyle={{ flexGrow: 1 }}>
//                 <View style={styles.rectangle}>
//                     <Text style={styles.text}>Course Code: {courseCode}</Text>
//                     <Text style={styles.text}>Course Name: {courseName}</Text>
//                     <Text style={styles.text}>Instructor: {Instructor}</Text>
//                     <Text style={styles.text}>Credits: {Credits}</Text>
//                     <Text style={styles.text}>Description: {Description}</Text>
//                     <Text style={styles.text}>Department: {Department}</Text>
//                 </View>
//             </ScrollView>
//             </SafeAreaView>
//         </SafeAreaProvider>
//     );

// }
// styles=StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: 'white',
//     },
//     rectangle: {
//         backgroundColor: '#ff9',
//         padding: 10,
//         margin: 10,
//         borderRadius: 10,
//         opacity: 0.8,
//     },
//     text: {
//         fontSize: 16,
//         fontWeight: 'bold',
//         padding: 5,
//     },
// });