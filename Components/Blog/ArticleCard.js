import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function ArticleCard({ article }) {
  return (
    <View style={styles.container}>
      <Text>ArticleCard</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 200,
    height: 200,
    backgroundColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center'
  },
})