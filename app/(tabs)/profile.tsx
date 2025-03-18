import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ThemedView } from '@/components/ThemedView'
import { ThemedText } from '@/components/ThemedText'
import { SafeAreaView } from 'react-native-safe-area-context'

const Profile = () => {
  return (
    <ThemedView style={{flex:1}}>
      <SafeAreaView>
        <ThemedText>Profile</ThemedText>
      </SafeAreaView>
    </ThemedView>
  )
}

export default Profile

const styles = StyleSheet.create({})