import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity, StyleSheet, TextInput, Alert } from 'react-native';
import axios from 'axios';

export default function Login({ navigation }) {
    const [username, setUsername] = useState('');  // State for username input
    const [password, setPassword] = useState('');  // State for password input
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async () => {
        try {
            const response = await axios.post('https://dummyjson.com/auth/login', {
                username: username,
                password: password,
            }, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.data.accessToken ) {
                console.log('Login successful:', response.data);
                Alert.alert('Login successful');
                navigation.navigate('Home', { username });  // Pass username to Home
            } else {
                Alert.alert('Login failed');
            }
        } catch (error) {
            console.error('Login error:', error);
            Alert.alert('An error occurred', error.response ? error.response.data.message : 'Please try again.');
        }
    };

    const handleLoginTest = () =>{
        console.log('Login successful:');
        Alert.alert('Login successful');
        navigation.navigate('Home', {username});
    }


    return (
        <View style={styles.container}>
            <Text style={styles.welcomeText}>Welcome Back!</Text>

            {/* Username Input */}
            <TextInput
                style={styles.inputText}
                placeholder="Username"
                placeholderTextColor="#888"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
            />

            {/* Password Input */}
            <View style={styles.passwordContainer}>
                <TextInput
                    style={styles.inputPassword}
                    secureTextEntry={!showPassword}
                    placeholder="Password"
                    placeholderTextColor="#888"
                    value={password}
                    onChangeText={setPassword}
                    autoCapitalize="none"
                />
                <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                    style={styles.toggleButton}
                >
                    <Text style={styles.toggleText}>
                        {showPassword ? "Hide" : "Show"}
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Login Button */}
            <TouchableOpacity style={styles.loginButton} onPress={handleLoginTest}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            {/* Navigate to SignUp Page */}
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                <Text style={styles.signupText}>
                    Don't have an account? <Text style={styles.signupHighlight}>Sign up!</Text>
                </Text>
            </TouchableOpacity>

            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    inputText: {
        backgroundColor: '#fff',
        width: '100%',
        maxWidth: 320,
        height: 50,
        padding: 10,
        marginTop: 20,
        borderRadius: 8,
        fontSize: 16,
        color: '#333',
        borderColor: '#ddd',
        borderWidth: 1,
        elevation: 2,
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        width: '100%',
        maxWidth: 320,
        position: 'relative',
    },
    inputPassword: {
        flex: 1,
        backgroundColor: '#fff',
        height: 50,
        padding: 10,
        paddingRight: 60,
        borderRadius: 8,
        fontSize: 16,
        color: '#333',
        borderColor: '#ddd',
        borderWidth: 1,
        elevation: 2,
    },
    toggleButton: {
        position: 'absolute',
        right: 15,
        top: 15,
    },
    toggleText: {
        fontSize: 14,
        color: '#1e90ff',
        fontWeight: '600',
    },
    loginButton: {
        backgroundColor: '#1e90ff',
        paddingVertical: 14,
        paddingHorizontal: 40,
        borderRadius: 8,
        marginTop: 30,
        width: '100%',
        maxWidth: 320,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    signupText: {
        fontSize: 14,
        color: '#888',
        fontWeight: '400',
        letterSpacing: 0.5,
        marginTop: 20,
        textAlign: 'center',
    },
    signupHighlight: {
        color: '#1e90ff',
        fontWeight: '700',
        letterSpacing: 0.7,
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
});
