import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Home from './components/Home';
import Menu from './components/Menu';
import Order from './components/Order';
import ReserveTable from './components/ReserveTable';

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
                    name="Menu"
                    component={Menu}
                    options={({ route }) => ({
                        title: `Menu of ${route.params?.restaurantName || 'Restaurant'}`,  // Dynamic title
                    })}
                />
                <Stack.Screen
                    name="Order"
                    component={Order}
                    options={{ title: 'Review Your Order' }}  // Static title for the order page
                />
                <Stack.Screen
                    name={"ReserveTable"}
                    component={ReserveTable} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
