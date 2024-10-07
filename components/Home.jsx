import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, ActivityIndicator, Button, TouchableOpacity } from 'react-native';
import axios from 'axios';

export default function Home({ route, navigation }) {
    const { username } = route.params || {};
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch dummy restaurant data
        const fetchRestaurants = async () => {
            try {
                const restaurantArray = [];
                for (let i = 0; i < 5; i++) { // Fetch 5 dummy restaurants
                    // Dummy data for restaurants
                    restaurantArray.push({
                        name: `Restaurant ${i + 1}`,
                        imageUrl: `https://dummyimage.com/300x200/000/fff.png&text=Restaurant+${i + 1}`,
                    });
                }
                setRestaurants(restaurantArray);
            } catch (error) {
                console.error("Error fetching restaurant data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchRestaurants();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.welcomeText}>Welcome {username ? (
                <Text style={styles.usernameText}>{username}</Text>
            ) : (
                <Text>No username provided</Text>
            )}!</Text>

            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <ScrollView contentContainerStyle={styles.restaurantContainer}
                            showsVerticalScrollIndicator={false}>
                    {restaurants.map((restaurant, index) => (
                        <View key={index} style={styles.restaurantWrapper}>
                            <Image
                                source={{ uri: restaurant.imageUrl }}
                                style={styles.restaurantImage}
                                resizeMode="cover"
                            />
                            <Text style={styles.restaurantName}>{restaurant.name}</Text>

                            <View style={styles.buttonGroup}>
                                <TouchableOpacity
                                    style={styles.orderButton}
                                    onPress={() => navigation.navigate('Menu', { restaurantName: restaurant.name })}
                                >
                                    <Text style={styles.buttonText}>Order from Menu</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.reserveButton}
                                    onPress={() => navigation.navigate('ReserveTable', { restaurantName: restaurant.name })}
                                >
                                    <Text style={styles.buttonText}>Reserve a Table</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}
                </ScrollView>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        padding: 10,
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    usernameText: {
        fontSize: 25,
        color: '#333',
        marginBottom: 20,
    },
    restaurantContainer: {
        alignItems: 'center',
    },
    restaurantWrapper: {
        marginVertical: 15,
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: '#fff',
        padding: 15,
        width: 330,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    restaurantImage: {
        width: 300,
        height: 200,
        borderRadius: 10,
    },
    restaurantName: {
        marginTop: 10,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    buttonGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
    },
    orderButton: {
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    reserveButton: {
        backgroundColor: '#FF5733',
        padding: 10,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});
