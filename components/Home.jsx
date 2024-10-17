import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    FlatList,
    ActivityIndicator,
    TouchableOpacity,
    ScrollView,
    TextInput
} from 'react-native';

export default function ReserveAndOrder({ route, navigation }) {
    const { username } = route.params || {};
    const [restaurants, setRestaurants] = useState([]);
    const [topPicks, setTopPicks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState('');
    const [filteredRestaurants, setFilteredRestaurants] = useState([]);
    const [filteredTopPicks, setFilteredTopPicks] = useState([]);

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
                setFilteredRestaurants(restaurantArray); // Initialize filteredRestaurants
            } catch (error) {
                console.error("Error fetching restaurant data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchRestaurants();
    }, []);

    useEffect(() => {
        // Fetch dummy top picks data
        const fetchTopPicks = async () => {
            try {
                const topPicksArray = [];
                for (let i = 0; i < 5; i++) { // Fetch 5 dummy top picks
                    topPicksArray.push({
                        name: `Top Pick ${i + 1}`,
                        imageUrl: `https://dummyimage.com/300x200/000/fff.png&text=Top+Pick+${i + 1}`,
                    });
                }
                setTopPicks(topPicksArray);
                setFilteredTopPicks(topPicksArray); // Initialize filteredTopPicks
            } catch (error) {
                console.error("Error fetching top picks data:", error);
            }
        };

        fetchTopPicks();
    }, []);

    const handleSearch = (text) => {
        setSearchText(text);

        const newFilteredRestaurants = restaurants.filter((restaurant) =>
            restaurant.name.toLowerCase().includes(text.toLowerCase())
        );

        const newFilteredTopPicks = topPicks.filter((pick) =>
            pick.name.toLowerCase().includes(text.toLowerCase())
        );

        setFilteredRestaurants(newFilteredRestaurants);
        setFilteredTopPicks(newFilteredTopPicks);
    };

    const renderItem = ({ item, index }) => (
        <View key={index} style={styles.restaurantWrapper}>
            <Image
                source={{ uri: item.imageUrl }}
                style={styles.restaurantImage}
                resizeMode="cover"
            />
            <Text style={styles.restaurantName}>{item.name}</Text>

            <TouchableOpacity
                style={styles.reserveAndOrderButton}
                onPress={() => navigation.navigate('ReserveAndOrder', { restaurantName: item.name })}
            >
                <Text style={styles.buttonText}>Reserve & Order</Text>
            </TouchableOpacity>
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

            <TextInput
                style={styles.input}
                placeholder="Search"
                value={searchText}
                onChangeText={(text) => handleSearch(text)} // Dynamically update items as users type
                onSubmitEditing={() => handleSearch(searchText)}
            />

            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <ScrollView
                    scrollEventThrottle={16}
                    showsVerticalScrollIndicator={false} // Hide vertical scroll indicator
                    contentContainerStyle={styles.scrollViewContent}
                >
                    {/* First Horizontal FlatList */}
                    <Text
                        style={styles.sectionTitle}
                    >Popular</Text>
                    <FlatList
                        data={filteredRestaurants}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index.toString()}
                        contentContainerStyle={styles.flatListContent}
                        decelerationRate="fast"
                        snapToAlignment="start"
                        pagingEnabled
                    />

                    {/* Second Horizontal FlatList */}
                    <Text
                        style={styles.sectionTitle}
                    >Top Picks</Text>
                    <FlatList
                        data={filteredTopPicks}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index.toString()}
                        contentContainerStyle={styles.flatListContent}
                        decelerationRate="fast"
                        snapToAlignment="start"
                        pagingEnabled
                    />
                </ScrollView>
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
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginBottom: 30,
        marginTop: 10,
    },
    usernameText: {
        fontSize: 24,
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
        margin: 3,
    },
    restaurantImage: {
        width: 300,
        height: 200,
        borderRadius: 15,
    },
    restaurantName: {
        marginTop: 15,
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
    },
    reserveAndOrderButton: {
        backgroundColor: '#007bff',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 8,
        marginTop: 15,
        maxWidth: 150,
        maxHeight: 50,
    },
    buttonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '500',
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
});
