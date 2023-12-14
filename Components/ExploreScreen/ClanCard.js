import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import CharacterCard from './CharacterCard'
import useFetchAPI from '../../Hooks/useFetchAPI'

export default function ClanCard({ clan, navigation, width, height }) {
  const [characters, setCharacters] = useState([]);
  const { data: characterData, loading } = clan.characters && clan.characters[0] ? useFetchAPI(`characters/${clan.characters[0]}`) : { data: null, loading: false };
  const { data: characterData2, loading: loading2 } = clan.characters && clan.characters[1] ? useFetchAPI(`characters/${clan.characters[1]}`) : { data: null, loading: false };

  useEffect(() => {
    let characters = [];
    if (characterData) {
      characters.push({ data: characterData, loading });
    }
    if (characterData2) {
      characters.push({ data: characterData2, loading: loading2 });
    }
    setCharacters(characters);
  }, [characterData, characterData2, loading, loading2]);

  if (loading || loading2) {
    return <ActivityIndicator size="large" color="orange" />;
  }

  return (
    <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('SpecificClan', { clan })}>
      <View style={styles.textContainer}>
        <View style={styles.leftContainer}>
          <Text style={styles.name}>{clan.name} Clan</Text>
        </View>
        <View style={styles.rightContainer}>
          {characters.length > 0 && characters[0].data && <CharacterCard width={width} height={height} character={characters[0].data} navigation={navigation} />}
          {characters.length > 1 && characters[1].data && <CharacterCard width={width} height={height} character={characters[1].data} navigation={navigation} />}
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    width: '100%',
    height: 60,
    borderRadius: 10,

    shadowColor: 'orange',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.7,
    shadowRadius: 3.84,
    elevation: 3,
    borderColor: 'orange',
    borderWidth: 1,
  },
  textContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  rightContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    gap: 10,
    marginRight: 10,
  },
  name: {
    fontSize: 12,
    textAlign: 'right',
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: 'black',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    padding: 8,
  },
})