import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";

type HabitCardProps = {
  name:string,
  emoji:string,
  handlePress: () => {},
  handleLongPress: () => void
}

const HabitCard = ({name, emoji, handlePress, handleLongPress}:HabitCardProps) => {
  return (
    <TouchableOpacity
      style={{
        justifyContent: "center",
        alignItems: "center",
        gap: 4,
        marginTop: 2,
      }}
      onPress={handlePress}
      onLongPress={() => {
        Alert.alert("Delete Habit",
          "Are you sure you want to delete the Habit?",[
            {
              style:"cancel",
              onPress: () => {},
              text:"cancel"
            }, 
            {
              style:"default",
              onPress: handleLongPress,
              text:"delete"
            }
          ]);
      }}
    >
      <ThemedView style={styles.categoryItem}>
        <Text style={styles.categoryIcon}>{emoji}</Text>
      </ThemedView>
      <ThemedText style={styles.categoryText}>{name}</ThemedText>
    </TouchableOpacity>
  );
};

export default HabitCard;

const styles = StyleSheet.create({
  categoryItem: {
    // width: 60,
    // height: 60,
    // display: "flex",
    // justifyContent: "center",
    // alignItems: "center", 
    // marginRight: 15,
    // padding: 10,
    // borderRadius:100,
    // backgroundColor: "#00000044",
    width: 60,
    height: 60,
    borderRadius: 100 / 2,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
    // backgroundColor: "#D9D9D9",
    boxShadow:"0 4px 0px #CACACA56",
    borderColor:"#CACACA56",
    borderWidth:2,
  },
  categoryIcon: { 
    fontSize: 24 
  },
  categoryText: { 
    textAlign: "center",
    fontSize: 12, 
  },
});
