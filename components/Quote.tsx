import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ThemedView } from './ThemedView'
import { ThemedText } from './ThemedText'
// import { fetch } from 'expo/fetch'

const Quote = () => {
  const [quote, setQuote] = useState<string>("")
  const RANDOM_QUOTE_API = "https://zenquotes.io/api/today"

  useEffect(() => {
    fetch(RANDOM_QUOTE_API)
    .then((response) => response.json())
    .then((data) => {
      setQuote(data[0].q)
    })
  },[])
  fetch(RANDOM_QUOTE_API)
  .then((response) => response.json())
  .then((data) => {
    console.log(data)
  })

  return (
    <ThemedView>
      <ThemedText></ThemedText>
    </ThemedView>
  )
}

export default Quote

const styles = StyleSheet.create({})