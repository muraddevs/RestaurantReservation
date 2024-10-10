import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, Modal, FlatList } from 'react-native';
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
    const [tableNumber, setTableNumber] = useState(null);
    const [reserved, setReserved] = useState(false);
    const [availableTables] = useState([...Array(20).keys()].map((i) => i + 1)); // Array of table numbers
    const [isModalVisible, setModalVisible] = useState(false);

    const handleGuestsChange = (text) => {
        setGuests(text);
    };

    const handleSubmit = () => {
        if (!guests || guests <= 0) {
            Alert.alert("Invalid Input", "Please enter a valid number of guests.");
            return;
        }
        if (!tableNumber) {
            Alert.alert("Invalid Input", "Please select a table number.");
            return;
        }

        Alert.alert(
            "Reservation Confirmed",
            `Table ${tableNumber} for ${guests} guests at ${restaurantName} on ${date.toLocaleDateString()} at ${time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}.`
        );

        setGuests('');
        setShowDatePicker(false);
        setShowTimePicker(false);
        setReserved(true);
        fetchMenu();
    };

    const fetchMenu = () => {
        const dummyMenu = [
            { id: 1, name: 'Burger', price: 8.99 },
            { id: 2, name: 'Pizza', price: 12.99 },
            { id: 3, name: 'Pasta', price: 10.99 },
            { id: 4, name: 'Salad', price: 6.99 },
            { id: 5, name: 'Fries', price: 3.99 },
        ];
        setItems(dummyMenu);
    };

    const handleIncreaseQuantity = (item) => {
        setSelectedItems((prev) => ({
            ...prev,
            [item.id]: {
                ...prev[item.id],
                quantity: (prev[item.id]?.quantity || 0) + 1,
            },
        }));
    };

    const handleDecreaseQuantity = (item) => {
        setSelectedItems((prev) => {
            const newQuantity = (prev[item.id]?.quantity || 1) - 1;
            return {
                ...prev,
                [item.id]: {
                    ...prev[item.id],
                    quantity: newQuantity > 0 ? newQuantity : 0,
                },
            };
        });
    };

    const calculateTotal = () => {
        return items.reduce((total, item) => {
            const quantity = selectedItems[item.id]?.quantity || 0;
            return total + item.price * quantity;
        }, 0).toFixed(2);
    };

    const handlePlaceOrder = () => {
        Alert.alert("Order Placed", `Your order for table ${tableNumber} has been placed.`, [
            {
                text: "OK",
                onPress: () => {
                    setSelectedItems({});
                    navigation.navigate('Home'); // Replace 'Home' with the actual name of your home screen
                },
            },
        ]);
    };


    const handleCancelOrder = () => {
        setSelectedItems({});
        Alert.alert("Order Canceled", "Your order has been canceled.");
    };

    return (
        <View style={styles.container}>
            {!reserved ? (
                <>
                    <Text style={styles.title}>Reserve a Table at {restaurantName}</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Number of Guests"
                        keyboardType="numeric"
                        value={guests}
                        onChangeText={handleGuestsChange}
                    />

                    <TouchableOpacity style={styles.buttonStyle} onPress={() => setShowDatePicker(true)}>
                        <Text style={styles.buttonText}>
                            {date ? date.toLocaleDateString() : 'Select Date'}
                        </Text>
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
                        <Text style={styles.buttonText}>
                            {time ? time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Select Time'}
                        </Text>
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

                    <TouchableOpacity style={styles.buttonStyle} onPress={() => setModalVisible(true)}>
                        <Text style={styles.buttonText}>{tableNumber ? `Table ${tableNumber}` : 'Select Table Number'}</Text>
                    </TouchableOpacity>

                    {/* Modal for selecting table */}
                    <Modal visible={isModalVisible} animationType="slide" transparent={true}>
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                <Text style={styles.modalTitle}>Select a Table Number</Text>
                                <FlatList
                                    data={availableTables}
                                    keyExtractor={(item) => item.toString()}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity
                                            style={styles.modalItem}
                                            onPress={() => {
                                                setTableNumber(item);
                                                setModalVisible(false);
                                            }}
                                        >
                                            <Text style={styles.modalItemText}>Table {item}</Text>
                                        </TouchableOpacity>
                                    )}
                                />
                                <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                                    <Text style={styles.buttonText}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>

                    <TouchableOpacity style={styles.reserveButton} onPress={handleSubmit}>
                        <Text style={styles.buttonText}>Reserve Table</Text>
                    </TouchableOpacity>
                </>
            ) : (
                <>
                    <Text style={styles.title}>Order food for table {tableNumber} at {restaurantName}:</Text>
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
                        <TouchableOpacity style={[styles.buttonStyle, { backgroundColor: '#FF3B30' }]} onPress={handleCancelOrder}>
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </>
            )}
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
    reserveButton: {
        marginTop: 15,
        borderRadius: 5,
        padding: 10,
        backgroundColor: '#4ec74e',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    modalItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        width: '100%',
    },
    modalItemText: {
        fontSize: 18,
    },
    cancelButton: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#FF3B30',
        borderRadius: 5,
        alignItems: 'center',
    },
    menuItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    menuItemText: {
        fontSize: 18,
    },
    quantityControl: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    quantityButton: {
        backgroundColor: '#007AFF',
        borderRadius: 5,
        padding: 5,
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    quantityButtonText: {
        color: '#fff',
        fontSize: 25,
        marginTop: -8,
    },
    quantityText: {
        marginHorizontal: 10,
        fontSize: 18,
    },
    footer: {
        marginTop: 20,
        alignItems: 'center',
    },
    totalText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
});
