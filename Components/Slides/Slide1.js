import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Slide1Animation from '../../AnimationComponents/Slide1Animation'

export default function Slide1({ handleNextSlide }) {
  return (
    <View style={styles.container}>
      <View style={styles.animationContainer}>
        <Slide1Animation />
      </View>
      <View style={styles.textContainer}>
        <Text style={[styles.text, styles.textShadow]}>
          <Text style={{ color: 'white' }}>Welcome,</Text>
          <Text style={{ color: 'orange' }}> Shinobi !</Text>
        </Text>
        <TouchableOpacity style={styles.btn} onPress={handleNextSlide}>
          <Text style={styles.btnText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    gap: 40,
  },
  animationContainer: {
    flex: 1, // Adjust this value to move the animation higher or lower
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginRight: 5,
    width: '100%',
  },
  textContainer: {
    flex: 0.6, // Adjust this value to move the text higher or lower
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 50,
  },
  text: {
    fontSize: 35,
    textShadowColor: 'orange', // Add this line to apply text shadow
    textShadowOffset: {
      width: 0,
      height: 3,
    },
    textShadowRadius: 5, // Change this value to adjust the shadow radius
    elevation: 5,
    shadowOpacity: 0.3,
  },
  textShadow: {
    color: 'white', // Add this line to set the text color
  },
  btn: {
    backgroundColor: 'orange',
    paddingHorizontal: 32,
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
  btnText: {
    color: 'black',
    fontSize: 24,
  },
})