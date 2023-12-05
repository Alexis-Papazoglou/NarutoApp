import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ArticleCard from '../../Components/Blog/ArticleCard'

export default function BlogScreen() {

  //todo fetch all articles for firestore

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Writing Articles</Text>
      <ArticleCard />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center'
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: 'white'
  },
})
