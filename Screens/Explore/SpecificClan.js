import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, FlatList } from 'react-native';
import CharacterCard from '../../Components/ExploreScreen/CharacterCard';

export default function SpecificClan({ route, navigation, width, height }) {
  const { clan } = route.params;
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const fetchedCharacters = [];
        for (const id of clan.characters) {
          const response = await fetch(`https://dattebayo-api.onrender.com/characters/${id}`);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          fetchedCharacters.push(data);
        }
        setCharacters(fetchedCharacters);
        setLoading(false);
      } catch (error) {
        setError(error);
      }
    };

    fetchCharacters();
  }, [clan.characters]);

  if (loading) {
    return <ActivityIndicator style={styles.container} size="large" color="orange" />;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <CharacterCard width={width / 3} height={height / 3} character={item} navigation={navigation} />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{clan.name} clan</Text>
      <Text style={styles.members}>Members : </Text>
      <FlatList
        data={characters}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={3}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
    backgroundColor: 'black', 
    padding: 10,
  },
  title: {
    fontSize: 32,
    color: 'orange', 
    fontWeight: 'bold',
    marginBottom: 20,
  },
  members: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 20,
  },
  listContent: {
    padding: 10, 
    paddingBottom: 100,
  },
  itemContainer: {
    margin: 10, 
  },
});