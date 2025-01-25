
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



