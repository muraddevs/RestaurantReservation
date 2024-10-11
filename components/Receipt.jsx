import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Alert } from 'react-native';

export default function Receipt({ route, navigation }) {
    const { restaurantName, selectedItems, total, tableNumber, guests, date, time } = route.params || {};
    const [isModalVisible, setModalVisible] = useState(false);
    const [isPaid, setIsPaid] = useState(false); // State to track if payment is made

    const handleCancel = () => {
        setModalVisible(false);
    };

    const handlePayment = () => {
        Alert.alert(
            'Confirm Payment',
            'Are you sure you want to proceed with the payment?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'OK',
                    onPress: () => {
                        setIsPaid(true); // Mark payment as successful
                        Alert.alert('Payment Successful!', 'Your payment has been processed.');
                    },
                },
            ]
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Receipt</Text>
            <Text style={styles.details}>Restaurant: {restaurantName}</Text>
            <Text style={styles.details}>Table Number: {tableNumber}</Text>
            <Text style={styles.details}>Guests: {guests}</Text>
            <Text style={styles.details}>Date: {date}</Text>
            <Text style={styles.details}>Time: {time}</Text>

            <View style={styles.itemsContainer}>
                {selectedItems.map((item, index) => (
                    <Text key={index} style={styles.item}>
                        {item.quantity} x {item.name} - ${item.price.toFixed(2)} each
                    </Text>
                ))}
            </View>

            <Text style={styles.total}>Total: ${total}</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.payButton, { backgroundColor: isPaid ? 'rgba(40,167,69,0.5)' : '#FFC107' }]} // Yellow if unpaid, green if paid
                    onPress={isPaid ? null : handlePayment} // Disable onPress if already paid
                    disabled={isPaid} // Disable button if already paid
                >
                    <Text style={styles.homeButtonText}>{isPaid ? 'Paid' : 'Pay'}</Text>
                </TouchableOpacity>
                {
                    !isPaid && (
                        <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(true)}>
                            <Text style={styles.homeButtonText}>Cancel</Text>
                        </TouchableOpacity>
                    )
                }
            </View>
            <Modal
                transparent={true}
                animationType="slide"
                visible={isModalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>Are you sure you want to cancel?</Text>
                        <View style={styles.modalButtonContainer}>
                            <TouchableOpacity style={styles.modalButton} onPress={handleCancel}>
                                <Text style={styles.modalButtonText}>Yes, cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
                                <Text style={styles.modalButtonText}>No, go back</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            <TouchableOpacity style={styles.homeButton} onPress={() => navigation.navigate('Home')}>
                <Text style={styles.homeButtonText}>Back to Home</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        marginTop: 50,
    },
    details: {
        fontSize: 16,
        marginBottom: 8,
    },
    itemsContainer: {
        marginVertical: 16,
    },
    item: {
        fontSize: 16,
        marginBottom: 4,
    },
    total: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 16,
    },
    homeButton: {
        backgroundColor: '#007BFF',
        padding: 12,
        borderRadius: 5,
        marginTop: 50,
    },
    homeButtonText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
    },
    buttonContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 50,
        marginBottom: 16,
    },
    payButton: {
        padding: 12,
        borderRadius: 5,
        width: 100,
        height: 50,
        alignItems: 'center',
    },
    cancelButton: {
        backgroundColor: '#FF0000',
        padding: 12,
        borderRadius: 5,
        width: 100,
        alignItems: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    },
    modalContent: {
        width: 300,
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalText: {
        fontSize: 18,
        marginBottom: 20,
    },
    modalButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    modalButton: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
        width: 120,
        alignItems: 'center',
    },
    modalButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});
