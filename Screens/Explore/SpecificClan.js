import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function SpecificClan({ route }) {
  const { clan } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{clan.name}</Text>
      {Object.entries(clan).map(([key, value], index) => (
        <View key={index} style={styles.item}>
          <Text style={styles.key}>{key}:</Text>
          <Text style={styles.value}>{value}</Text>
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Dark background
    padding: 10,
  },
  title: {
    fontSize: 32,
    color: '#fff', // White text
    marginBottom: 20,
  },
  item: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  key: {
    fontSize: 18,
    color: '#fff', // White text
    marginRight: 10,
  },
  value: {
    fontSize: 18,
    color: '#fff', // White text
  },
})