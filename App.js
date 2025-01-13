import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginPage from './screens/login'; // Adjust paths to your screens
import Signup from './screens/signup';
import Details from './screens/Details';
import Password from './screens/Password';
const Stack = createStackNavigator();
const App=()=>{
  return (<NavigationContainer>
    <Stack.Navigator initialRouteName='Login'>
      <Stack.Screen name='Login' component={LoginPage}/>
      <Stack.Screen name='Signup' component={Signup}/>
      <Stack.Screen name='Details' component={Details}/>
      <Stack.Screen name='Password' component={Password}/>
    </Stack.Navigator>
  </NavigationContainer>)
}
export default App;