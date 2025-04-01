import { TextInput, TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { ThemedText } from "./ThemedText";
import { Colors } from "@/constants/Colors";

const AddHabitSheet = ({ newHabit, setNewHabit, onAddHabit }: any) => (
  <View>
    <ThemedText style={styles.sheetTitle}>Add a New Habit</ThemedText>
    <View style={{display:"flex", flexDirection:"row", gap:10, alignItems:"center", justifyContent:"space-evenly"}}>
      <TextInput
        placeholder="Habit Name"
        style={[styles.input, {width:"50%"}]}
        value={newHabit.name}
        onChangeText={(text) => setNewHabit({ ...newHabit, name: text })}
      />
      <TextInput
        placeholder="Emoji"
        style={styles.input}
        value={newHabit.icon}
        onChangeText={(text) => setNewHabit({ ...newHabit, icon: text })}
        keyboardType="default"
      />
      <TouchableOpacity style={styles.addButton} onPress={onAddHabit}>
        <Text style={styles.addButtonText}>Add Habit</Text>
      </TouchableOpacity>
    </View>
  </View>
);

export default AddHabitSheet;

const styles = StyleSheet.create({
  sheetTitle: { fontSize: 16, fontFamily: "Poppins-Bold", marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    fontFamily:"Poppins-Regular",
    lineHeight:20,
    height:40,
    paddingBottom:5
  },
  // input: {
  //   borderRadius: 8,
  //   paddingLeft: 10,
  //   backgroundColor: "#EBEBEB",
  //   fontFamily: "Poppins-Regular",
  //   overflow:"hidden",
  //   borderColor:"#CACACA",
  //   borderWidth:2,
  //   lineHeight: 20, // Prevents height fluctuation due to text size
  //   height:40,
  // },
  addButton: {
    backgroundColor: Colors.dark.primary,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  addButtonText: { color: "white", fontWeight: "bold" },
});
