import { TextInput, TouchableOpacity, Text, StyleSheet, View } from "react-native";

const AddHabitSheet = ({ newHabit, setNewHabit, onAddHabit }: any) => (
  <View>
    <Text style={styles.sheetTitle}>Add a New Habit</Text>
    <View style={{display:"flex", flexDirection:"row", gap:10, alignItems:"center", justifyContent:"space-between"}}>
      <TextInput
        placeholder="Habit Name"
        style={styles.input}
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
  sheetTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: "black",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  addButtonText: { color: "white", fontWeight: "bold" },
});
