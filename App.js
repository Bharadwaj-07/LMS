import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CoursesAvailable from './screens/CoursesAvailable';
import Dashboard from './screens/CoursesEnrolled';
import Profile from './screens/Profile';
import JoinClass from './screens/JoinClass';
import CreateClass from './screens/CreateClass';


export default function App() {
  const Tab = createBottomTabNavigator();
  const Drawer = createDrawerNavigator();

  const TabNavigator = () => {
    return (
      <Tab.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#3C0A6B' },
          headerTintColor: 'white',
          tabBarActiveTintColor: 'white',
          tabBarActiveBackgroundColor: '#3C0A6B',
        }}
      >
        <Tab.Screen
          name="Courses Enrolled"
          component={Dashboard}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="book" color={color} size={size} />
            ),
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Courses Available"
          component={CoursesAvailable}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="reader-outline" color={color} size={size} />
            ),
            headerShown: false,
          }}
        />
      </Tab.Navigator>
    );
  };

  const DrawerNavigator = () => {
    return (
      <Drawer.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#3C0A6B' },
          headerTintColor: 'white',
          drawerActiveTintColor: "white",
          drawerInactiveTintColor: "Black",
          drawerActiveBackgroundColor: '#3C0A6B',
          drawerStyle: {
            backgroundColor: '#D4BEE4',
            width: 300,
          },
          drawerHideStatusBarOnOpen: true,
          drawerLabelStyle: {
            fontSize: 15,
          },
        }}
      >
        <Drawer.Screen
          name="Dashboard"
          component={TabNavigator}
          options={{
            drawerIcon: ({ color }) => (
              <Ionicons name="home" size={25} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="Create Class"
          component={CreateClass}
          options={{
            drawerIcon: ({ color }) => (
              <Ionicons name="add-outline" size={25} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="Join Class"
          component={JoinClass}
          options={{
            drawerIcon: ({ color }) => (
              <Ionicons name="return-down-forward-outline" size={25} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="Profile"
          component={Profile}
          options={{
            drawerIcon: ({ color }) => (
              <Ionicons name="person" size={25} color={color} />
            ),
          }}
        />
      </Drawer.Navigator>
    );
  };

  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer>
        <DrawerNavigator />
      </NavigationContainer>
    </>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
