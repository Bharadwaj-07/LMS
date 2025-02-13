import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import QuizList from './screens/QuizList'; 
import QuizCreator from './screens/newQuiz';
const Stack = createStackNavigator();
const App=()=>{
  return (<NavigationContainer>
    <Stack.Navigator initialRouteName='QuizList'>
      <Stack.Screen name='QuizList' component={QuizList}/>
      <Stack.Screen name='CreateQuiz' component={QuizCreator}/>
    </Stack.Navigator>
  </NavigationContainer>)
  // return (<ClassInput></ClassInput>);
 
}
export default App;
