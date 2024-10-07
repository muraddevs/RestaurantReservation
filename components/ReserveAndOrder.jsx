import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function ReserveAndOrder({ route, navigation }) {
    const { restaurantName } = route.params || {};
    const [guests, setGuests] = useState('');
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [time, setTime] = useState(new Date());
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [items, setItems] = useState([]);
    const [selectedItems, setSelectedItems] = useState({});

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

        // Reset the reservation fields and prepare for ordering
        setGuests('');
        setShowDatePicker(false);
        setShowTimePicker(false);
        fetchMenu(); // Fetch menu after reservation
    };

    const fetchMenu = () => {
        // Dummy menu items for the selected restaurant
        const dummyMenu = [
            { id: 1, name: 'Burger', price: 8.99 },
            { id: 2, name: 'Pizza', price: 12.99 },
            { id: 3, name: 'Pasta', price: 10.99 },
            { id: 4, name: 'Salad', price: 6.99 },
            { id: 5, name: 'Fries', price: 3.99 },
        ];
        setItems(dummyMenu); // Set the menu items
    };


    const handleIncreaseQuantity = (item) => {
        setSelectedItems((prevItems) => {
            const newItems = { ...prevItems };
            if (newItems[item.id]) {
                newItems[item.id].quantity += 1; // Increment quantity
            } else {
                newItems[item.id] = { ...item, quantity: 1 }; // Initialize quantity if item doesn't exist
            }
            return newItems;
        });
    };

    const handleDecreaseQuantity = (item) => {
        setSelectedItems((prevItems) => {
            const newItems = { ...prevItems };
            if (newItems[item.id] && newItems[item.id].quantity > 1) {
                newItems[item.id].quantity -= 1; // Decrement quantity if greater than 1
            } else {
                delete newItems[item.id]; // Remove item if quantity is 1
            }
            return newItems;
        });
    };


    const calculateTotal = () => {
        return Object.values(selectedItems).reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };

    const handlePlaceOrder = () => {
        if (Object.keys(selectedItems).length === 0) {
            Alert.alert("No Items Selected", "Please select items to order.");
            return;
        }
        Alert.alert('Order Confirmed', `Your order has been placed at ${restaurantName}! Total: $${calculateTotal()}`, [
            { text: 'OK', onPress: () => navigation.navigate('Home') },
        ]);
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

            <TouchableOpacity style={styles.buttonStyle} onPress={() => setShowDatePicker(true)}>
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

            <TouchableOpacity style={styles.buttonStyle} onPress={() => setShowTimePicker(true)}>
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

            <TouchableOpacity style={styles.buttonStyle} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Reserve Table</Text>
            </TouchableOpacity>

            <Text style={styles.header}>Order for your Table</Text>
            <ScrollView>
                {items.map((item) => (
                    <View key={item.id} style={styles.menuItem}>
                        <Text style={styles.menuItemText}>{item.name} - ${item.price.toFixed(2)}</Text>
                        <View style={styles.quantityControl}>
                            <TouchableOpacity onPress={() => handleDecreaseQuantity(item)} style={styles.quantityButton}>
                                <Text style={styles.quantityButtonText}>-</Text>
                            </TouchableOpacity>
                            <Text style={styles.quantityText}>{selectedItems[item.id]?.quantity || 0}</Text>
                            <TouchableOpacity onPress={() => handleIncreaseQuantity(item)} style={styles.quantityButton}>
                                <Text style={styles.quantityButtonText}>+</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </ScrollView>

            <View style={styles.footer}>
                <Text style={styles.totalText}>Total: ${calculateTotal()}</Text>
                <TouchableOpacity style={styles.buttonStyle} onPress={handlePlaceOrder}>
                    <Text style={styles.buttonText}>Place Order</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    header: {
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
    },
    menuItem: {
        padding: 15,
        marginVertical: 5,
        backgroundColor: '#f9f9f9',
        borderRadius: 5,
    },
    menuItemText: {
        fontSize: 18,
    },
    quantityControl: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    quantityButton: {
        width: 30,
        height: 30,
        backgroundColor: '#007AFF',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        marginHorizontal: 5,
    },
    quantityButtonText: {
        color: '#fff',
        fontSize: 20,
    },
    quantityText: {
        fontSize: 18,
        width: 30,
        textAlign: 'center',
    },
    footer: {
        marginTop: 20,
        alignItems: 'center',
    },
    totalText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
    },
});
