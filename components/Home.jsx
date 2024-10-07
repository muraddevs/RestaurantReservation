import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';

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

    const renderItem = ({ item, index }) => (
        <View key={index} style={styles.restaurantWrapper}>
            <Image
                source={{ uri: item.imageUrl }}
                style={styles.restaurantImage}
                resizeMode="cover"
            />
            <Text style={styles.restaurantName}>{item.name}</Text>

            <View style={styles.buttonGroup}>
                <TouchableOpacity
                    style={styles.orderButton}
                    onPress={() => navigation.navigate('Menu', { restaurantName: item.name })}
                >
                    <Text style={styles.buttonText}>Order from Menu</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.reserveButton}
                    onPress={() => navigation.navigate('ReserveTable', { restaurantName: item.name })}
                >
                    <Text style={styles.buttonText}>Reserve a Table</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.welcomeText}>
                Welcome {username ? (
                <Text style={styles.usernameText}>{username}</Text>
            ) : (
                <Text>No username provided</Text>
            )}!
            </Text>

            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <FlatList
                    data={restaurants}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    contentContainerStyle={styles.flatListContent}
                    decelerationRate="fast"
                    snapToAlignment="start"
                    pagingEnabled
                    showsVerticalScrollIndicator={false}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fafafa',
        padding: 15,
    },
    welcomeText: {
        fontSize: 24, // Reduced slightly for better balance
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginBottom: 20,
    },
    usernameText: {
        fontSize: 24, // Reduced to match the welcome text
        color: '#FF6347',
        fontWeight: '600',
    },
    flatListContent: {
        paddingVertical: 20,
        alignItems: 'center',
    },
    restaurantWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        backgroundColor: '#fff',
        padding: 20,
        width: 340,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.15,
        shadowRadius: 10,
        elevation: 5,
    },
    restaurantImage: {
        width: 300,
        height: 200,
        borderRadius: 15,
    },
    restaurantName: {
        marginTop: 15,
        fontSize: 20, // Slightly smaller for better layout
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
    },
    buttonGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between', // Space between buttons
        marginTop: 15,
    },
    orderButton: {
        backgroundColor: '#28a745',
        paddingVertical: 10, // Reduced padding for a more compact look
        paddingHorizontal: 15,
        borderRadius: 8,
        marginHorizontal: 10, // More space between buttons
        maxWidth: 150, // Reduced width
        maxHeight: 50, // Reduced height
    },
    reserveButton: {
        backgroundColor: '#dc3545',
        paddingVertical: 10, // Reduced padding for a more compact look
        paddingHorizontal: 15,
        borderRadius: 8,
        marginHorizontal: 10, // More space between buttons
        maxWidth: 150, // Reduced width
        maxHeight: 50, // Reduced height
    },
    buttonText: {
        color: '#fff',
        fontSize: 14, // Reduced font size to fit within the buttons
        fontWeight: '500',
        textAlign: 'center',
    },
});
