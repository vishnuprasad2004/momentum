import { StatusBar, StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import AnimatedButton from '@/components/AnimatedButton';
import { useRouter } from 'expo-router';

function HighlightText({ text }:{text:string}) {
  return <Text style={{ color: "white" }}>{text}</Text>;
}



const Welcome = () => {
  const router = useRouter();

  return (
    <View style={styles.page}>
      <StatusBar translucent backgroundColor="transparent" />
      <View style={{ display: "flex", flexDirection: "row", gap: 4, width: "100%" }}>
        <Image
          source={require("../../assets/images/logo-m.png")}
          style={{ width: 40, height: 22.931 }}
        />
        <Text style={{ fontFamily: "Poppins-Bold", color: "white", fontSize: 15 }}>Momentum</Text>
      </View>
      <Text style={styles.text}>
        Get ready to <HighlightText text={"supercharge"} /> your goals and productivity with{" "}
        <HighlightText text={"Momentum"} />.
      </Text>
      <AnimatedButton title="Get Started" onPress={() => router.push("/signup")} width={"100%"} color={"white"} shadowColor={"#ddd"} textColor={"#111"}/>
    </View>
  );
}

export default Welcome

const styles = StyleSheet.create({
  page: {
    paddingTop: 55,
    padding: 15,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
    textAlign: "center",
    backgroundColor: "#ff7f2a",
  },
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    color: "black",
    padding: 12,
    borderRadius: 16,
    width: "100%",
  },
  text: {
    color: "#ffffffaa",
    fontSize: 40,
    fontFamily: "Poppins-Bold",
  },
})