import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useState } from 'react';
import React from 'react'
import Authenticate from '../Authenticate'

export default function Slide2({ handleNextSlide }) {

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        <Text style={styles.whiteText}>Let's</Text>
        <Text style={styles.orangeText}> LOG IN </Text>
        <Text style={styles.orangeText}>, shouldn't</Text>
        <Text style={styles.whiteText}> WE?</Text>
      </Text>
      <Authenticate handleNextSlide={handleNextSlide}/>
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
    width: 300,
    textAlign: 'center',
    fontSize: 40,
  },
  whiteText: {
    color: 'white',
  },
  orangeText: {
    color: 'orange',
  },
})
