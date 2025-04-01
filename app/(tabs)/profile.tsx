import { Alert, Image, StyleSheet, Switch, ToastAndroid, View } from 'react-native'
import React, { useState } from 'react'
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
import { router, useFocusEffect } from 'expo-router'

const Profile = () => {
  const [userData, setUserData] = useState<any>({total_completed_tasks: 0});
  const { session } = useSelector((state:RootState) => state.auth);
  const color = useThemeColor({ light: Colors.light.text, dark: Colors.dark.text }, 'text');

  
  useFocusEffect(() => {
    const fetchUserData = async () => {
      if (!session?.user.id) {
        console.log("User ID is not available");
        return;
      }
  
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single();
  
        if (error) {
          console.log("Error fetching user data:", error.message);
          return;
        }
        setUserData(data);
      } catch (err) {
        ToastAndroid.show("Unexpected error fetching user data:", ToastAndroid.SHORT);
        console.log("Unexpected error fetching user data:", err);
      }
    };
    
    fetchUserData();
  }); // Empty dependency array ensures it runs only on mount

  
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = async() => {
    Alert.alert("Logout", 
      "Are you sure you want to logout ?",[
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel"
        },
        {
          text:"Yes",
          style:"default",
          isPreferred:true,
          onPress: async() => {
            await dispatch(signOut());
            router.replace("/(public)");
          }
        }, 
        
      ]
    )
  }

  return (
    <ThemedView style={{flex:1, padding:15, paddingTop:20}}>
      <SafeAreaView style={{flex:1, display:"flex", gap: 20}}>
        
        <View>
          <ThemedText style={{ fontFamily: "Poppins-Bold", fontSize:30, lineHeight: 35 }}>Profile</ThemedText>
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
            <Switch thumbColor={Colors.dark.primary} value={userData.allow_notifications} />
          </View>
        </View>
        {/* Achievements (Badges) */}
        <View>
          <ThemedText style={{fontSize:30, fontFamily:"Poppins-Bold", lineHeight:35}}>Achievements</ThemedText>
          
          <View style={{display:"flex", flexDirection:"row", flexWrap:"wrap", gap:15, marginTop:15, marginBottom:15}}>
            {userData.total_completed_tasks < 10 && <ThemedText style={{opacity:0.4, fontSize:12}}>Unloack your Achievements Section by completing your Tasks on time</ThemedText>}
            {userData.total_completed_tasks >= 10 && <Image source={require(`@/assets/images/badges/level1.png`)} style={{height:120, width:100}}/>}
            {userData.total_completed_tasks >= 20 && <Image source={require(`@/assets/images/badges/level2.png`)} style={{height:120, width:100}}/>}
            {userData.total_completed_tasks >= 30 && <Image source={require(`@/assets/images/badges/level3.png`)} style={{height:120, width:100}}/>}
            {userData.total_completed_tasks >= 40 && <Image source={require(`@/assets/images/badges/level4.png`)} style={{height:120, width:100}}/>}
            {userData.total_completed_tasks >= 50 && <Image source={require(`@/assets/images/badges/level5.png`)} style={{height:120, width:100}}/>}
            {userData.total_completed_tasks >= 60 && <Image source={require(`@/assets/images/badges/level6.png`)} style={{height:120, width:100}}/>}
          </View>
          {/* Message for how many remaining tasks to complete to get the next badge */}
          {
            userData.total_completed_tasks < 60 &&
            <ThemedText style={{ opacity:0.4, fontSize:14}}>Complete {10 - Number(userData.total_completed_tasks)%10} more tasks to get the next badge.</ThemedText>
          }
        </View>
        <View style={{ height:60 }}></View>
        
        
        <View style={{display:"flex", gap:12, position:"absolute", width:"100%", bottom:-8}}>
          <AnimatedButton onPress={handleLogout} title='Logout' width={"100%"}/>
          <View style={{width: "100%", display: "flex", flexDirection: "row", alignItems: "center", gap: 10, justifyContent:"center"}}>
            <ExternalLink href='https://github.com/vishnuprasad2004/momentum'>
              <ThemedText style={{fontSize:12}}> <AntDesign name="github" size={14} color={color} /> Star the project on Github</ThemedText>
            </ExternalLink>
          </View>
        </View>

      </SafeAreaView>
    </ThemedView>
  )
}

export default Profile

const styles = StyleSheet.create({})