//import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

// navigator
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator, TransitionPresets, } from '@react-navigation/stack';

// screens
import Login from "./Screens/login";
import Home from "./Screens/home";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false, gestureEnabled: true, cardOverlayEnabled: true, ...TransitionPresets.SlideFromRightIOS,}}>
        <Stack.Screen name="Login" component={Login} options={{headerShown: false}} />
        <Stack.Screen name="Home" component={Home} options={{headerShown: false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

