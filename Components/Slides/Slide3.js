import { View, Text, StyleSheet, Touchable, TouchableOpacity } from 'react-native'
import React from 'react'

export default function Slide3({ handleNextSlide }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Slide3</Text>
      <TouchableOpacity style={styles.continue} onPress={handleNextSlide}>
        <Text>Continue</Text>
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
  continue: {
    backgroundColor: 'white',
    width: 100,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  }
})
