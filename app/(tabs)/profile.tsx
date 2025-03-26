import { StyleSheet, Switch, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { ThemedView } from '@/components/ThemedView'
import { ThemedText } from '@/components/ThemedText'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store/store'
import AnimatedButton from '@/components/AnimatedButton'
import { signOut } from '@/features/auth/authSlice'

const Profile = () => {

  const { session } = useSelector((state:RootState) => state.auth);
  
  useEffect(() => {
    console.log(session);
  }, [session]);

  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = async() => {
    await dispatch(signOut());
  }

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

        <View style={{ display: "flex", flexDirection: "row", alignItems: "center", width: "100%", gap: 10 }}>
          <ThemedText style={{fontFamily: "Poppins-SemiBold", fontSize:18}}>Total Completed Tasks:</ThemedText>
          <ThemedText>{session?.user.user_metadata.total_completed_tasks ?? "-"}</ThemedText>
        </View>
        {/* <Switch thumbColor={Colors["dark"].primary} /> */}
        <AnimatedButton onPress={handleLogout} title='Logout' width={"100%"}/>

      </SafeAreaView>
    </ThemedView>
  )
}

export default Profile

const styles = StyleSheet.create({})