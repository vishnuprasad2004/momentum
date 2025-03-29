import { StyleSheet, Switch, Text, ToastAndroid, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ThemedView } from '@/components/ThemedView'
import { ThemedText } from '@/components/ThemedText'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store/store'
import AnimatedButton from '@/components/AnimatedButton'
import { signOut } from '@/features/auth/authSlice'
import { supabase } from '@/config/supabase'
import { ExternalLink } from '@/components/ExternalLink'
import AntDesign from '@expo/vector-icons/AntDesign';
import { useThemeColor } from '@/hooks/useThemeColor'
import { Colors } from '@/constants/Colors'

const Profile = () => {
  const [userData, setUserData] = useState<any>({total_completed_tasks: 0});
  const { session } = useSelector((state:RootState) => state.auth);
  const color = useThemeColor({ light: Colors.light.text, dark: Colors.dark.text }, 'text');

  
  useEffect(() => {
    const fetchUserData = async () => {
      if (!session?.user.id) {
        console.error("User ID is not available");
        return;
      }
  
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single();
  
        if (error) {
          console.error("Error fetching user data:", error.message);
          return;
        }
  
        setUserData(data);
      } catch (err) {
        ToastAndroid.show("Unexpected error fetching user data:", ToastAndroid.SHORT);
        console.error("Unexpected error fetching user data:", err);
      }
    };
  
    fetchUserData();
  }, []); // Empty dependency array ensures it runs only on mount

  
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = async() => {
    await dispatch(signOut());
  }

  return (
    <ThemedView style={{flex:1, padding:15, paddingTop:20}}>
      <SafeAreaView style={{flex:1, display:"flex", justifyContent:"space-between", gap: 20}}>
        <View>
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
            <ThemedText style={{fontFamily: "Poppins-SemiBold", fontSize:18}}>Total Completed Tasks:</ThemedText>
            <ThemedText>{userData.total_completed_tasks ?? "-"}</ThemedText>
          </View>

          <View style={{ display: "flex", flexDirection: "row", alignItems: "center", width: "100%", gap: 10 }}>
            <ThemedText style={{fontFamily: "Poppins-SemiBold", fontSize:18}}>Allow Notifications:</ThemedText>
            <Switch thumbColor={"#ff7f2a"} style={{}} value={userData.allow_notifications} />
          </View>
          <View style={{ height:60 }}></View>
        </View>
        <View>
          <AnimatedButton onPress={handleLogout} title='Logout' width={"100%"}/>
        </View>
        <View style={{width: "100%", display: "flex", flexDirection: "row", alignItems: "center", gap: 10, justifyContent:"center"}}>
          <ExternalLink href='https://github.com/vishnuprasad2004/momentum'>
            <ThemedText style={{fontSize:12}}> <AntDesign name="github" size={14} color={color} /> Star the project on Github</ThemedText>
          </ExternalLink>
        </View>

      </SafeAreaView>
    </ThemedView>
  )
}

export default Profile

const styles = StyleSheet.create({})