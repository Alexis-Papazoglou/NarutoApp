import { StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import ClanCard from '../../Components/ExploreScreen/ClanCard'
import { useNavigation } from '@react-navigation/native'
import useFetchAllClans from '../../Hooks/useFetchAllClans'

export default function Clans() {
  const flatListRef = React.useRef();
  const [searchTerm, setSearchTerm] = useState('')
  const { clans, error, loading, fetchMore } = useFetchAllClans(24)
  const [filteredClans, setFilteredClans] = useState([])
  const navigation = useNavigation()

  useEffect(() => {
    setFilteredClans(
      clans.filter(clan =>
        clan.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
  }, [clans, searchTerm])

  const handleBackToTop = () => {
    flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search clans"
        placeholderTextColor={'grey'}
        color={'white'}
        value={searchTerm}
        onChangeText={setSearchTerm}
      />
      {error ? (
        <Text style={styles.errorText}>Error: {error.message}</Text>
      ) : (
        <FlatList
          ref={flatListRef}
          contentContainerStyle={{ paddingBottom: 100 }}
          data={filteredClans}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.clanView}>
              <ClanCard key={item.id} navigation={navigation} clan={item} width={40} height={40} />
            </View>
          )}
          numColumns={1}
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
    marginTop: 10,
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
  clanView: {
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
});