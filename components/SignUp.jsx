// components/SignUp.js
import { StatusBar } from 'expo-status-bar';
import {Text, View, TouchableOpacity, StyleSheet, TextInput, Image} from 'react-native';
import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import Google from "../icons/google.png";
import Apple from "../icons/apple-logo.png";
import Facebook from "../icons/facebook.png";
import ShowIcon from "../icons/view.png";
import HideIcon from "../icons/hide.png";

export default function SignUp({ navigation }) {  // Add navigation prop
    const [showPassword, setShowPassword] = useState(false);
    const [showRepeatPassword, setShowRepeatPassword] = useState(false);
    const [birthDate, setBirthDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [formattedDate, setFormattedDate] = useState('');

    const handleDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || birthDate;
        setShowDatePicker(false);
        setBirthDate(currentDate);

        // Format the date to a readable string (e.g., "YYYY-MM-DD")
        const formatted = currentDate.toISOString().split('T')[0]; // "2024-09-25"
        setFormattedDate(formatted);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.welcomeText}>
                Create Your Account
            </Text>

            {/* Name Input */}
            <TextInput
                style={styles.inputText}
                placeholder="Name"
                placeholderTextColor="#888"
            />

            {/* Email Input */}
            <TextInput
                style={styles.inputText}
                placeholder="Email"
                placeholderTextColor="#888"
                keyboardType="email-address"
            />

            {/* Birth Date Picker */}
            <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.inputText}>
                <Text style={styles.dateText}>
                    {formattedDate ? `Birth Date: ${formattedDate}` : 'Select Birth Date'}
                </Text>
            </TouchableOpacity>

            {showDatePicker && (
                <DateTimePicker
                    value={birthDate}
                    mode="date"
                    display="default"
                    onChange={handleDateChange}
                />
            )}

            {/* Password Input with Toggle */}
            <View style={styles.passwordContainer}>
                <TextInput
                    style={styles.inputPassword}
                    secureTextEntry={!showPassword}
                    placeholder="Password"
                    placeholderTextColor="#888"
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

            {/* Repeat Password Input with Toggle */}
            <View style={styles.passwordContainer}>
                <TextInput
                    style={styles.inputPassword}
                    secureTextEntry={!showRepeatPassword}
                    placeholder="Repeat Password"
                    placeholderTextColor="#888"
                />
                <TouchableOpacity
                    onPress={() => setShowRepeatPassword(!showRepeatPassword)}
                    style={styles.toggleButton}
                >
                    <Image
                        source={showRepeatPassword ? HideIcon : ShowIcon}
                        style={styles.iconToggle}
                    />
                </TouchableOpacity>
            </View>

            {/* Sign Up Button */}
            <TouchableOpacity style={styles.signupButton} onPress={() => {}}>
                <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>

            {/* Social Login Buttons */}
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

            {/* Navigate to Login Page */}
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.loginText}>
                    Already have an account? <Text style={styles.loginHighlight}>Login</Text>
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
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        width: '100%',
        maxWidth: 320,
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
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },
    toggleButton: {
        position: 'absolute',
        right: 10,
        top: 15,
        padding: 5,
        marginTop: -4,
    },
    signupButton: {
        backgroundColor: '#1e90ff',
        paddingVertical: 14,
        paddingHorizontal: 40,
        borderRadius: 8,
        marginTop: 30,
        width: '100%',
        maxWidth: 320,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2.62,
        elevation: 3,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    loginText: {
        fontSize: 14,
        color: '#888',
        fontWeight: '400',
        letterSpacing: 0.5,
        marginTop: 20,
        textAlign: 'center',
    },
    loginHighlight: {
        color: '#1e90ff',
        fontWeight: '700',
        letterSpacing: 0.7,
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    dateText: {
        fontSize: 16,
        color: '#333',
    },
    iconContainer: {
        flexDirection: 'row',
        marginTop: 40,
        justifyContent: 'space-around',
        width: '60%',
        marginBottom: 10,
    },
    iconStyle: {
        height: 40,
        width: 40,
        resizeMode: 'contain',
    },
    iconToggle: {
        height: 20,
        width: 20,
        resizeMode: 'contain',
    },
});
