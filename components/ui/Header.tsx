import { StyleSheet, Text, View, Image, StatusBar } from "react-native";
import { ThemedText } from "../ThemedText";
import { HelloWave } from "../HelloWave";


const Header = ({name}:{name:string}) => {
  
  return (
    <View style={styles.header}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 4,
          width: "100%",
        }}
      >
        <Image
          source={require("@/assets/images/logo-o-m.png")}
          style={{ width: 40, height: 22.931 }}
        />
        <ThemedText
          style={{
            fontFamily: "Poppins-Bold",
            color: "#ff7f2a",
            fontSize: 15,
          }}
        >Momentum</ThemedText>
      </View>
        <ThemedText style={styles.welcomeText}>Welcome back, {name + " "} <HelloWave/></ThemedText>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    marginTop: StatusBar.currentHeight! + 12,
    display: "flex",
    flexDirection: "column",
    paddingLeft: 16,
    gap:6
  },
  welcomeText: {
    fontSize: 20,
    textAlign: "left",
    marginBottom: 4,
    // color: "#222222",
    fontFamily: "Poppins-SemiBold",
  },
});
