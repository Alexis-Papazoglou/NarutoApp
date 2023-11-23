import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

export default function Slide2({ handleNextSlide }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Slide 2</Text>
      <TouchableOpacity onPress={handleNextSlide}>
        <Text style={styles.text}>Continue</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 20,
  },
})
