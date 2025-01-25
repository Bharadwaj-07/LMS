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
import MainWindow from './screens/ClassRoom/MainWindow';
import ClassInput from './components/ClassInput'; 
const Stack = createStackNavigator();
const App=()=>{
  return (<NavigationContainer>
    <Stack.Navigator initialRouteName='Dates'>
      <Stack.Screen name='Dates' component={Dates}/>
        <Stack.Screen name='Present' component={Present}/>
        <Stack.Screen name='Mark' component={Mark}/>
    </Stack.Navigator>
  </NavigationContainer>)
  // return (<ClassInput></ClassInput>);
 
}
export default App;
