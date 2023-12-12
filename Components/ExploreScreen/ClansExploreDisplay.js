import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import useFetchAPI from '../../Hooks/useFetchAPI';
import ClanCard from './ClanCard';

export default function ClansExploreDisplay({ navigation }) {
    const [clans, setClans] = useState(null);
    const { data, error } = useFetchAPI('clans', { limit: 4 });

    useEffect(() => {
        if (data && data.clans) {
            setClans(data.clans);
        }
    }, [data]);

    if (!clans) {
        return <Text>Loading...</Text>;
    } else if (error) {
        return <Text>{error}</Text>;
    } else {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.itemText}>Clans:</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Clans')}>
                        <Text style={styles.viewAllText}>View All</Text>
                    </TouchableOpacity>
                </View>
                {clans.map((clan) => (
                    <ClanCard
                        key={clan.id}
                        clan={clan}
                        navigation={navigation}
                        width={40} // replace with the desired width
                        height={40} // replace with the desired height
                    />
                ))}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        padding: 12,
        backgroundColor: '#121212', // Dark background
        gap: 10,
        borderRadius: 10, // Rounded corners
        shadowColor: 'orange',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.3,
        shadowRadius: 3.84,
        elevation: 3,
        borderColor: 'black',
        borderWidth: 1,
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 10, // Rounded corners
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5, // Shadow for Android
    },
    text: {
        fontSize: 32,
        color: '#fff', // White text
    },
    viewAll: {
        fontSize: 18,
        color: '#fff', // White text
        textAlign: 'center',
        marginTop: 10,
    },
    itemText: {
        fontSize: 20,
        color: 'white',
        paddingBottom: 4,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    viewAllText: {
        color: 'orange',
        fontSize: 18,
    },
});