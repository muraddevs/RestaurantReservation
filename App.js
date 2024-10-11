import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Home from './components/Home';
import Receipt from "./components/Receipt";

import ReserveAndOrder from "./components/ReserveAndOrder";

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen
                    name="Login"
                    component={Login}
                    options={{ headerShown: false }}  // Hide the header for the Login screen
                />
                <Stack.Screen
                    name="SignUp"
                    component={SignUp}
                    options={{ headerShown: false }}  // Hide the header for the SignUp screen
                />
                <Stack.Screen
                    name="Home"
                    component={Home}
                    options={{ title: 'Home' }}  // Show the header with title 'Home'
                />
                <Stack.Screen
                    name="ReserveAndOrder"  // Changed this line to correctly name the screen
                    component={ReserveAndOrder}
                />
                <Stack.Screen
                    name="Receipt"
                    component={Receipt}
                    options={{ headerShown: false }}  // Hide the header for the Login screen
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
