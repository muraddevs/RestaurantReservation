import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity, StyleSheet, TextInput, Alert, Image } from 'react-native';
import axios from 'axios';
import Google from "../icons/google.png";
import Apple from "../icons/apple-logo.png";
import Facebook from "../icons/facebook.png";
import ShowIcon from "../icons/view.png";
import HideIcon from "../icons/hide.png";

export default function Login({ navigation }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleLoginTest = () => {
        console.log('Login successful:');
        Alert.alert('Login successful');
        navigation.navigate('Home', { username });
    };

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
                    <Image
                        source={showPassword ? HideIcon : ShowIcon}
                        style={styles.iconToggle}
                    />
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

            {/* Social Login Icons */}
            <View style={styles.iconContainer}>
                <TouchableOpacity>
                    <Image style={styles.iconStyle} source={Google} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image style={styles.iconStyle} source={Apple} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image style={styles.iconStyle} source={Facebook} />
                </TouchableOpacity>
            </View>

            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 30,
        paddingVertical: 50,
    },
    welcomeText: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 40,
        color: '#333',
    },
    inputText: {
        backgroundColor: '#fff',
        width: '100%',
        height: 50,
        padding: 15,
        marginBottom: 20,
        borderRadius: 10,
        fontSize: 16,
        color: '#333',
        borderColor: '#ddd',
        borderWidth: 1,
        elevation: 3,
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        width: '100%',
    },
    inputPassword: {
        flex: 1,
        backgroundColor: '#fff',
        height: 50,
        padding: 15,
        borderRadius: 10,
        fontSize: 16,
        color: '#333',
        borderColor: '#ddd',
        borderWidth: 1,
        elevation: 3,
    },
    toggleButton: {
        position: 'absolute',
        right: 20,
        top: 15,
    },
    iconToggle: {
        height: 20,
        width: 20,
        resizeMode: 'contain',
    },
    loginButton: {
        backgroundColor: '#1e90ff',
        paddingVertical: 14,
        paddingHorizontal: 40,
        borderRadius: 10,
        marginTop: 10,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    signupText: {
        fontSize: 14,
        color: '#888',
        marginTop: 20,
        textAlign: 'center',
    },
    signupHighlight: {
        color: '#1e90ff',
        fontWeight: '700',
    },
    iconContainer: {
        flexDirection: 'row',
        marginTop: 30,
        justifyContent: 'space-around',
        width: '60%',
    },
    iconStyle: {
        height: 40,
        width: 40,
        resizeMode: 'contain',
    },
});
