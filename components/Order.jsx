import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Button, Alert } from 'react-native';

export default function Order({ route, navigation }) {
    const { restaurantName, selectedItems } = route.params || {};
    const [items, setItems] = useState(selectedItems);

    const calculateTotal = () => {
        return items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };

    const handlePlaceOrder = () => {
        Alert.alert('Order Confirmed', `Your order has been placed at ${restaurantName}!`, [
            { text: 'OK', onPress: () => navigation.navigate('Home') },
        ]);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Your Order at {restaurantName}</Text>
            <ScrollView>
                {items.map((item, index) => (
                    <View key={index} style={styles.orderItem}>
                        <Text style={styles.itemText}>
                            {item.name} - ${(item.price * item.quantity).toFixed(2)}   (x{item.quantity})

                        </Text>
                    </View>
                ))}
            </ScrollView>
            <View style={styles.footer}>
                <Text style={styles.totalText}>Total: ${calculateTotal()}</Text>
                <Button title="Place Order" onPress={handlePlaceOrder} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    header: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    orderItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        marginVertical: 5,
        backgroundColor: '#f9f9f9',
        borderRadius: 5,
    },
    itemText: {
        fontSize: 18,
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
