import { StyleSheet, Text, TextInput, TouchableOpacity, View, Platform, Button, ToastAndroid } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import AnimatedButton from '@/components/AnimatedButton'
import { useRouter } from 'expo-router'
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import Constants from "expo-constants";
import { SchedulableTriggerInputTypes } from 'expo-notifications'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store/store'
import { signUp } from '@/features/auth/authSlice'


async function sendPushNotification(expoPushToken: string) {
  console.log("sending to this token", expoPushToken);
  
  const message = {
    to: expoPushToken,
    sound: "default",
    title: "Testing Title",
    body: "Hurray Now we have notifications working!",
    data: { someData: "goes here xyz" },
  };

  await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });
}


async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('myNotificationChannel', {
      name: 'A channel is needed for the permissions prompt to appear',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    // Learn more about projectId:
    // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
    // EAS projectId is used here.
    try {
      const projectId =
        Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
      if (!projectId) {
        throw new Error('Project ID not found');
      }
      token = (
        await Notifications.getExpoPushTokenAsync({
          projectId,
        })
      ).data;
      console.log(token);
    } catch (e) {
      token = `${e}`;
    }
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token;
}


const SignUp = () => {
  const router = useRouter();
  const [name, setNameField] = useState("");
  const [email, setEmailField] = useState("");
  const [password, setPassword] = useState("");
  const [expoPushToken, setExpoPushToken] = useState("");
  const [channels, setChannels] = useState<Notifications.NotificationChannel[]>([]);
  const [notification, setNotification] = useState<Notifications.Notification | undefined>(
    undefined
  );
  const notificationListener = useRef<Notifications.EventSubscription>();
  const responseListener = useRef<Notifications.EventSubscription>();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state:RootState) => state.auth);



  useEffect(() => {
    console.log("expo push token ::", expoPushToken);
  },[expoPushToken]);
  
  useEffect(() => {
    registerForPushNotificationsAsync().then(token => token && setExpoPushToken(token));
    
    if (Platform.OS === 'android') {
      Notifications.getNotificationChannelsAsync().then(value => setChannels(value ?? []));
    }
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });
    Notifications.cancelAllScheduledNotificationsAsync();
    

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    console.log(expoPushToken);


    return () => {
      notificationListener.current &&
        Notifications.removeNotificationSubscription(notificationListener.current);
      responseListener.current &&
        Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);
  
  
  const handleSignup = async () => {
    if(name.length <= 2 || !name || !email || !password) {
      console.log("Please fill all fields");
      ToastAndroid.show("Please fill all fields", ToastAndroid.SHORT);
      return;
    }
    if(password.length < 6) {
      ToastAndroid.show("Password must be atleast 6 characters long", ToastAndroid.SHORT);
      return;
    }

    try {
      const result = await dispatch(signUp({ email, password, name, user_push_token: expoPushToken, allow_notifications: true, last_notified: new Date().toISOString(), total_completed_tasks: 0 })).unwrap();
      if(result) {
        ToastAndroid.show("Signup Successful", ToastAndroid.SHORT);
        router.push("/(tabs)");
      }
      setEmailField("");
      setPassword("");
      setNameField("");
    } catch (e) {
      console.log(e);
      console.log(error);
      
      ToastAndroid.show("Signup Unsuccessful", ToastAndroid.SHORT);
    }


  };



  return (
    <ThemedView style={styles.page}>
      <Text style={styles.text}>Signup</Text>
      <Text>Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your Name"
        value={name}
        onChangeText={setNameField} // Updates the state with the input value
        keyboardType="default"
      />
      <Text>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your Email"
        value={email}
        onChangeText={setEmailField} // Updates the state with the input value
        keyboardType="email-address"
        autoComplete="email"
        autoCapitalize="none"
      />
      <Text>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your Password"
        value={password}
        onChangeText={setPassword} // Updates the state with the input value
        secureTextEntry={true}
        keyboardType="default"
        autoCapitalize="none"
      />
      <AnimatedButton title="Sign Up" onPress={handleSignup} isLoading={loading} width={"100%"} color={"white"} shadowColor={"#ddd"} textColor={"#111"}/>

      <TouchableOpacity style={styles.link} onPress={() => router.push("/(public)/signin")}>
        <Text style={{ fontFamily: "Poppins-SemiBold" }}>Already have an Account, Login then !</Text>
      </TouchableOpacity>
      
    </ThemedView>
  )
}

export default SignUp

const styles = StyleSheet.create({
  input: {
    width: "100%",
    height: 40,
    paddingLeft: 10,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 12,
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "#ddd",
  },
  page: {
    padding: 20,
    height: "100%",
    textAlign: "center",
    backgroundColor: "#ff7f2a",
    display: "flex",
    justifyContent: "center",
  },
  text: {
    color: "#ffffffdd",
    fontSize: 40,
    fontFamily: "Poppins-SemiBold",
    textAlign: "center",
  },
  font: {
    fontFamily: "Poppins-SemiBold",
  },
  button: {
    backgroundColor: "white",
    color: "black",
    padding: 12,
    paddingStart: 100,
    paddingEnd: 100,
    borderRadius: 8,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "grey",
  },
  contentContainer: {
    flex: 1,
    padding: 36,
    alignItems: "center",
  },
  link: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
})