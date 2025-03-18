import { Animated, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from "react-native";
import React, { useContext, useRef, useState } from "react";
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { router, useRouter } from "expo-router";
import AnimatedButton from "@/components/AnimatedButton";

const SignIn = () => {
  // const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");

  function handleLogin(): void {
    // throw new Error("Function not implemented.");
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