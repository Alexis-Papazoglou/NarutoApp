import { StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import CharacterCard from '../../Components/CharacterCard'
import { useNavigation } from '@react-navigation/native'
import useFetchAllCharacters from '../../Hooks/useFetchAllCharacters'

// TODO : Functionality to search characters by name even when the character is not fetched yet

export default function Characters() {
    const flatListRef = React.useRef();
    const [searchTerm, setSearchTerm] = useState('')
    const { characters, error, loading, fetchMore } = useFetchAllCharacters(24)
    const [filteredCharacters, setFilteredCharacters] = useState([])
    const navigation = useNavigation()

    useEffect(() => {
        setFilteredCharacters(
            characters.filter(character =>
                character.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
        )
    }, [characters, searchTerm])

    const handleBackToTop = () => {
        flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
    }

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
                    ref={flatListRef}
                    contentContainerStyle={{ paddingBottom: 100 }}
                    data={filteredCharacters}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.charView}>
                            <CharacterCard navigation={navigation} character={item} />
                        </View>
                    )}
                    numColumns={3}
                    ListFooterComponent={
                        <View style={styles.footer}>
                            <TouchableOpacity style={styles.button} onPress={fetchMore}>
                                <Text style={styles.buttonText}>Show more</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleBackToTop}>
                                <Text style={styles.backToTopText}>Back to top</Text>
                            </TouchableOpacity>
                        </View>
                    }
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
        justifyContent: 'center',
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
    footer: {
        width: '100%',
        alignItems: 'center',
        marginTop: 20,
    },
    button: {
        backgroundColor: 'orange',
        paddingHorizontal: 40,
        paddingVertical: 10,
        borderRadius: 10,
        shadowColor: 'orange',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.5,
        shadowRadius: 20,
        elevation: 5,
    },
    buttonText: {
        color: 'black',
        fontSize: 24,
    },
    backToTopText: {
        color: 'white',
        fontSize: 18,
        marginTop: 10,
    },
})