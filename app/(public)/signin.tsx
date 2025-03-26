import { Animated, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { router, } from "expo-router";
import AnimatedButton from "@/components/AnimatedButton";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { signIn } from "@/features/auth/authSlice";

const SignIn = () => {
  // const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, error } = useSelector((state:RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  async function handleLogin() {
    if(!email || !password) {
      ToastAndroid.show("Please fill all the fields", ToastAndroid.SHORT);
      return;
    }
    try {
      const result = await dispatch(signIn({email, password})).unwrap();
      console.log(result);
      if (result) {
        ToastAndroid.show("Login Successful", ToastAndroid.SHORT);
        router.push("/(tabs)");
      }

    } catch (error:any) {
      ToastAndroid.show("Login Unsuccessful", ToastAndroid.SHORT);
      console.log(error);
    } finally {
      setEmail("");
      setPassword("");
    }
    

  }

  return (
    <View style={styles.page}>
      <Text style={styles.text}>Login</Text>
      <Text>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <Text>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
        keyboardType="default"
      />
      <AnimatedButton title="Login" onPress={handleLogin} width={"100%"} color={"white"} shadowColor={"#ddd"} textColor={"#111"} isLoading={loading}/>
      <TouchableOpacity style={styles.link} onPress={() => router.push("/(public)/signup")}>
        <Text style={[styles.font]}>Don't have an Account, Signup Now</Text>
      </TouchableOpacity>
    </View>
  )
}

export default SignIn

const styles = StyleSheet.create({
  input: {
    width: "100%",
    height: 40,
    paddingLeft: 10,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 12,
    backgroundColor: "white",
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
  }
})