import { StyleSheet, Switch, Text, View } from 'react-native'
import React from 'react'
import { ThemedView } from '@/components/ThemedView'
import { ThemedText } from '@/components/ThemedText'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { StatusBar } from 'expo-status-bar'
import { Colors } from '@/constants/Colors'
// import { Switch } from 'react-native-gesture-handler'


const Profile = () => {

  const { session } = useSelector((state:RootState) => state.auth);

  return (
    <ThemedView style={{flex:1, padding:15, paddingTop:20}}>
      <SafeAreaView>
        <ThemedText style={{fontFamily: "Poppins-Bold", fontSize:24}}>Profile</ThemedText>
        <View style={{ display: "flex", flexDirection: "row", alignItems: "center", width: "100%", gap: 10 }}>
          <ThemedText style={{fontFamily: "Poppins-SemiBold", fontSize:18}}>Name:</ThemedText>
          <ThemedText>{session?.user.user_metadata.name}</ThemedText>
        </View>
        
        <View style={{ display: "flex", flexDirection: "row", alignItems: "center", width: "100%", gap: 10 }}>
          <ThemedText style={{fontFamily: "Poppins-SemiBold", fontSize:18}}>Email:</ThemedText>
          <ThemedText>{session?.user.email}</ThemedText>
        </View>

        <View style={{ display: "flex", flexDirection: "row", alignItems: "center", width: "100%", gap: 10 }}>
          <ThemedText style={{fontFamily: "Poppins-SemiBold", fontSize:18}}>ID:</ThemedText>
          <ThemedText>{session?.user.id}</ThemedText>
        </View>

        <Switch thumbColor={Colors["dark"].primary} />

      </SafeAreaView>
    </ThemedView>
  )
}

export default Profile

const styles = StyleSheet.create({})