import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function ReserveTable({ route, navigation }) {
    const { restaurantName } = route.params || {};
    const [guests, setGuests] = useState('');
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [time, setTime] = useState(new Date());
    const [showTimePicker, setShowTimePicker] = useState(false);

    const handleGuestsChange = (text) => {
        setGuests(text);
    };

    const handleSubmit = () => {
        if (!guests || guests <= 0) {
            Alert.alert("Invalid Input", "Please enter a valid number of guests.");
            return;
        }

        Alert.alert(
            "Reservation Confirmed",
            `Table for ${guests} at ${restaurantName} on ${date.toLocaleDateString()} at ${time.toLocaleTimeString()}.`
        );

        // Navigate back to the Home screen or other actions
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Reserve a Table at {restaurantName}</Text>

            <TextInput
                style={styles.input}
                placeholder="Number of Guests"
                keyboardType="numeric"
                value={guests}
                onChangeText={handleGuestsChange}
            />

            <TouchableOpacity
                style={styles.buttonStyle}
                onPress={() => setShowDatePicker(true)}>
                <Text style={styles.buttonText}>Select Date</Text>
            </TouchableOpacity>

            {showDatePicker && (
                <DateTimePicker
                    value={date}
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => {
                        setShowDatePicker(false);
                        if (selectedDate) {
                            setDate(selectedDate);
                        }
                    }}
                />
            )}

            <TouchableOpacity
                style={styles.buttonStyle}
                onPress={() => setShowTimePicker(true)}>
                <Text style={styles.buttonText}>Select Time</Text>
            </TouchableOpacity>

            {showTimePicker && (
                <DateTimePicker
                    value={time}
                    mode="time"
                    display="default"
                    onChange={(event, selectedTime) => {
                        setShowTimePicker(false);
                        if (selectedTime) {
                            setTime(selectedTime);
                        }
                    }}
                />
            )}

            <TouchableOpacity
                style={styles.buttonStyle}
                onPress={handleSubmit}>
                <Text style={styles.buttonText}>Reserve Table</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
        fontSize: 16,
    },
    buttonStyle: {
        marginTop: 15,
        borderRadius: 5,
        padding: 10,
        backgroundColor: '#007AFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
