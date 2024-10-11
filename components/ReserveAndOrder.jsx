import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, Modal, FlatList, Image } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function ReserveAndOrder({ route, navigation }) {
    const { restaurantName } = route.params || {};
    const [guests, setGuests] = useState(0);
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [time, setTime] = useState(new Date());
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [items, setItems] = useState([]);
    const [selectedItems, setSelectedItems] = useState({});
    const [tableNumber, setTableNumber] = useState(null);
    const [reserved, setReserved] = useState(false);
    const [availableTables] = useState([...Array(20).keys()].map((i) => i + 1));
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
            `Table ${tableNumber} for ${guests} guests at ${restaurantName} on ${date.toLocaleDateString()} at ${time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}. Do you want to order food for your table?`,
            [
                {
                    text: "Yes",
                    onPress: () => {
                        setReserved(true);
                        fetchMenu();
                    }
                },
                {
                    text: "No",
                    onPress: () => {
                        Alert.alert("Reservation Successful", "You have successfully reserved the table.");
                        navigation.navigate('Home');
                    }
                }
            ]
        );

        setGuests(guests);
        setShowDatePicker(false);
        setShowTimePicker(false);
    };

    const fetchMenu = () => {
        const dummyMenu = [
            { id: 1, name: 'Burger', price: 8.99, imageUrl: 'https://dummyimage.com/300x200/000/fff.png&text=Burger' },
            { id: 2, name: 'Pizza', price: 12.99, imageUrl: 'https://dummyimage.com/300x200/000/fff.png&text=Pizza' },
            { id: 3, name: 'Pasta', price: 10.99, imageUrl: 'https://dummyimage.com/300x200/000/fff.png&text=Pasta' },
            { id: 4, name: 'Salad', price: 6.99, imageUrl: 'https://dummyimage.com/300x200/000/fff.png&text=Salad' },
            { id: 5, name: 'Fries', price: 3.99, imageUrl: 'https://dummyimage.com/300x200/000/fff.png&text=Fries' },
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
        if (!items || items.length === 0) return 0;

        return items.reduce((total, item) => {
            const quantity = selectedItems[item.id]?.quantity || 0;
            return total + item.price * quantity;
        }, 0);
    };

    const handlePlaceOrder = () => {
        const total = calculateTotal();

        if (Object.keys(selectedItems).length === 0 || total <= 0) {
            Alert.alert("No Items Selected", "Please select at least one item to place an order.");
            return;
        }

        const selectedItemsArray = Object.keys(selectedItems).map(key => {
            const item = items.find(i => i.id === parseInt(key));
            return {
                name: item?.name || '',
                price: item?.price || 0,
                quantity: selectedItems[key]?.quantity || 0,
            };
        });

        navigation.navigate('Receipt', {
            restaurantName,
            selectedItems: selectedItemsArray,
            total: total.toFixed(2),
            tableNumber,
            guests,
            date: date.toLocaleDateString(),
            time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        });

        Alert.alert(
            "Order Placed",
            `Your order for table ${tableNumber} has been placed.`,
            [
                {
                    text: "OK",
                    onPress: () => {
                        setSelectedItems({});
                    },
                },
            ]
        );
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
                                <Image source={{ uri: item.imageUrl }} style={styles.menuItemImage} />
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
                    <Text style={styles.totalText}>Total: ${calculateTotal().toFixed(2)}</Text>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.placeOrderButton} onPress={handlePlaceOrder}>
                            <Text style={styles.buttonText}>Place Order</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.cancelButton} onPress={handleCancelOrder}>
                            <Text style={styles.buttonText}>Cancel Order</Text>
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
        padding: 16,
        backgroundColor: '#fff'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
        marginTop: 20,
    },
    input: {
        borderWidth: 1,
        padding: 8,
        marginBottom: 25,
        borderRadius: 4,
        borderColor: '#ddd'
    },
    buttonStyle: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center'
    },
    menuItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16
    },
    menuItemImage: {
        width: 85,
        height: 85,
        marginRight: 10,
        borderRadius: 10
    },
    menuItemText: {
        fontSize: 18,
        flex: 1,
        marginLeft: 10
    },
    quantityControl: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    quantityButton: {
        padding: 0, // Adjust padding if necessary, set to 0 to control height better
        backgroundColor: '#007BFF',
        borderRadius: 5,
        marginHorizontal: 5,
        height: 35,
        width: 35,
        justifyContent: 'center', // Center vertically
        alignItems: 'center',     // Center horizontally
    },

    quantityButtonText: {
        color: '#fff',
        fontSize: 23,
        lineHeight: 30, // Match line height to button height for vertical centering
    },
    quantityText: {
        fontSize: 16,
        width: 30,
        textAlign: 'center',
    },
    totalText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 16,
        textAlign: 'right'
    },
    placeOrderButton: {
        backgroundColor: '#28A745FF',
        padding: 12,
        borderRadius: 5,
        marginBottom: 10
    },
    cancelButton: {
        backgroundColor: '#dc3545',
        padding: 12,
        borderRadius: 5
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '80%',
        height: 400
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10
    },
    modalItem: {
        padding: 10
    },
    modalItemText: {
        fontSize: 16
    },
    reserveButton: {
        backgroundColor: '#28A745FF',
        padding: 12,
        borderRadius: 5,
        marginTop: 16
    },
});
