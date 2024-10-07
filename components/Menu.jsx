import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

export default function Menu({ route, navigation }) {
    const { restaurantName } = route.params || {};
    const [menuItems, setMenuItems] = useState([]);
    const [selectedItems, setSelectedItems] = useState({}); // Use an object to track quantity

    useEffect(() => {
        // Fetch dummy menu items for the selected restaurant
        const fetchMenu = async () => {
            try {
                const dummyMenu = [
                    { id: 1, name: 'Burger', price: 8.99 },
                    { id: 2, name: 'Pizza', price: 12.99 },
                    { id: 3, name: 'Pasta', price: 10.99 },
                    { id: 4, name: 'Salad', price: 6.99 },
                    { id: 5, name: 'Fries', price: 3.99 },
                ];
                setMenuItems(dummyMenu);
            } catch (error) {
                console.error('Error fetching menu items:', error);
            }
        };

        fetchMenu();
    }, []);

    const handleSelectItem = (item) => {
        setSelectedItems((prevItems) => {
            const newItems = { ...prevItems };
            if (newItems[item.id]) {
                newItems[item.id].quantity += 1; // Increment quantity if item exists
            } else {
                newItems[item.id] = { ...item, quantity: 1 }; // Add item with initial quantity 1
            }
            return newItems;
        });
    };

    const handleRemoveItem = (itemId) => {
        setSelectedItems((prevItems) => {
            const newItems = { ...prevItems };
            if (newItems[itemId].quantity > 1) {
                newItems[itemId].quantity -= 1; // Decrement quantity
            } else {
                delete newItems[itemId]; // Remove item if quantity becomes 0
            }
            return newItems;
        });
    };

    const handleProceedToOrder = () => {
        const selectedArray = Object.values(selectedItems); // Convert object to array
        navigation.navigate('Order', { restaurantName, selectedItems: selectedArray });
    };

    const calculateTotalPrice = (price, quantity) => price * quantity;

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Menu of {restaurantName}</Text>
            <ScrollView>
                {menuItems.map((item) => (
                    <View key={item.id} style={styles.menuItem}>
                        <Text style={styles.itemText}>{item.name} - ${item.price.toFixed(2)}</Text>
                        <TouchableOpacity
                            style={styles.addButton}
                            onPress={() => handleSelectItem(item)}
                        >
                            <Text style={styles.addButtonText}>Add to Order</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>

            {/* Selected Items */}
            {Object.keys(selectedItems).length > 0 && (
                <View style={styles.selectedContainer}>
                    <Text style={styles.subHeader}>Selected Items</Text>
                    {Object.values(selectedItems).map((item) => (
                        <View key={item.id} style={styles.selectedItem}>
                            <Text style={styles.itemText}>
                                {item.name} - ${calculateTotalPrice(item.price, item.quantity).toFixed(2)}
                            </Text>
                            <View style={styles.quantityContainer}>
                                <TouchableOpacity
                                    style={styles.quantityButton}
                                    onPress={() => handleRemoveItem(item.id)}
                                >
                                    <Text style={styles.quantityText}>-</Text>
                                </TouchableOpacity>
                                <Text style={styles.quantityText}>{item.quantity}</Text>
                                <TouchableOpacity
                                    style={styles.quantityButton}
                                    onPress={() => handleSelectItem(item)}
                                >
                                    <Text style={styles.quantityText}>+</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}
                </View>
            )}

            <View style={styles.footer}>
                <TouchableOpacity
                    title="Proceed to Order"
                    onPress={handleProceedToOrder}
                    style={styles.buttonStyle}
                    disabled={Object.keys(selectedItems).length === 0}>
                    <Text style={styles.addButtonText}>Proceed to Order</Text>
                </TouchableOpacity>
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
    subHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
    },
    menuItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        marginVertical: 5,
        backgroundColor: 'rgba(62,130,255,0.13)',
        borderRadius: 5,
    },
    selectedContainer: {
        marginTop: 20,
    },
    selectedItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        marginVertical: 5,
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
    },
    itemText: {
        fontSize: 18,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    quantityButton: {
        backgroundColor: 'rgba(0,122,255,0.29)',
        padding: 5,
        borderRadius: 5,
        marginHorizontal: 5,
        width: 35,
        height: 35,
        alignItems: 'center',
        justifyContent: 'center',
    },
    quantityText: {
        fontSize: 18,
        paddingHorizontal: 5,
    },
    addButton: {
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 5,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 14,
    },
    footer: {
        marginTop: 20,
        alignItems: 'center',
    },
    buttonStyle: {
        borderRadius: 5,
        padding: 10,
        backgroundColor: '#007AFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
