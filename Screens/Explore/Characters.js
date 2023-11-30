import { StyleSheet, Text, View, TextInput, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import CharacterCard from '../../Components/CharacterCard'
import useFetchAPI from '../../Hooks/useFetchAPI'
import { useNavigation } from '@react-navigation/native'

export default function Characters() {
    const [searchTerm, setSearchTerm] = useState('')
    const { data, error } = useFetchAPI('characters')
    const [characters, setCharacters] = useState([])
    const navigation = useNavigation()

    useEffect(() => {
        if (data && data.characters) {
            setCharacters(data.characters)
        }
    }, [data])

    const filteredCharacters = characters.filter(character =>
        character.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Search characters"
                placeholderTextColor={'grey'}
                color={'white'}
                value={searchTerm}
                onChangeText={setSearchTerm}
            />
            {error ? (
                <Text style={styles.errorText}>Error: {error}</Text>
            ) : (
                <FlatList
                    contentContainerStyle={{ paddingBottom: 100 }}
                    data={filteredCharacters}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.charView}>
                            <CharacterCard navigation={navigation} character={item} />
                        </View>
                    )}
                    numColumns={3}
                />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        paddingVertical: 20,
        paddingHorizontal: 10,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginVertical: 12,
        paddingHorizontal: 10,
        borderRadius: 5,
        backgroundColor: '#2D2D2D',
    },
    errorText: {
        fontSize: 20,
        color: 'red',
    },
    charView: {
        flex: 1,
        alignItems: 'center',
        marginVertical: 10,
    },
})