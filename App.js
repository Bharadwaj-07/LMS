
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginPage from './screens/Login/login'; // Adjust paths to your screens
import Signup from './screens/Login/signup';
import Details from './screens/Login/Details';
import Password from './screens/Login/Password';
import Home from './screens/Home';
import Dates from './screens/Attendance/Dates';
import Present from './screens/Attendance/Present';
import Mark from './screens/Attendance/Mark';
import UserDates from './screens/Attendance/UserDates';
import MainWindow from './screens/ClassRoom/MainWindow';
import ClassInput from './components/ClassInput'; 
import AdminMarks from './screens/AdminMarks';
import StudentMarks from './screens/StudentMarks';
const Stack = createStackNavigator();
const App=()=>{
  return (<NavigationContainer>
    <Stack.Navigator initialRouteName='Login'>
      <Stack.Screen name='Login' component={LoginPage}/>
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}/>
      <Stack.Screen name='Signup' component={Signup}/>
      <Stack.Screen name='Details' component={Details}/>
      <Stack.Screen name='Password' component={Password}/>
      <Stack.Screen name='Classroom' component={MainWindow}/>
      <Stack.Screen name='Dates' component={Dates}/>
      <Stack.Screen name='Present' component={Present}/>
      <Stack.Screen name='Mark' component={Mark}/>
      <Stack.Screen name='UserDates' component={UserDates}/>
      <Stack.Screen name='AdminMarks' component={AdminMarks}/>
      <Stack.Screen name='StudentMarks' component={StudentMarks}/>
    </Stack.Navigator>
  </NavigationContainer>)
 
}
export default App;



