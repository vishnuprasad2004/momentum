import { StyleSheet, Text, View, Switch, TextInput } from "react-native";
import React, { useState } from "react";
import { TouchableOpacity } from "@gorhom/bottom-sheet";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView"
// import { Switch } from 'react-native-gesture-handler'

const timeOptions = [15, 30, 60, 75];

type HabitSheetProps = {
  selectedCategory:string, 
  selectedTime:number, 
  setSelectedTime:(time:number) => void, 
  onClose: () => void
}

const HabitSheet = ({ selectedCategory, selectedTime, setSelectedTime, onClose }:HabitSheetProps) => (
  <>
    <ThemedText style={styles.sheetTitle}>How much time did you spend doing {selectedCategory}?</ThemedText>
    <View style={styles.radioContainer}>
      {timeOptions.map((time) => (
        <TouchableOpacity
          key={time}
          style={[styles.radioButton, selectedTime === time && styles.radioSelected]}
          onPress={() => setSelectedTime(time)}
        >
          <Text style={[styles.radioText, selectedTime === time && styles.radioTextSelected]}>{time} mins</Text>
        </TouchableOpacity>
      ))}
    </View>
    <TouchableOpacity style={styles.doneButton} onPress={onClose}>
      <Text style={styles.doneButtonText}>Done</Text>
    </TouchableOpacity>
  </>
);

const DailyHabitInputSheet = ({ handlePresentModalClose }:any) => {
  const [completed, setCompleted] = useState(false);
  const [inputValue, setInputValue] = useState(0);
  const toggleSwitch = () => setCompleted((previousState) => !previousState);

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "90%",
        width: "100%",
        gap: 8,
        padding: 12,
      }}
    >
      <Text style={{ fontSize: 22 }}>Congratulations 🎉</Text>
      <Text style={{ fontSize: 22 }}>How has this habit been today?</Text>
      {/* I don't want TextInput since its behavour is not according to my UI wish, also there are only some common time periods anyway */}
      {/* Buttons section */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.timeRangeButton}>
          <Text style={styles.text}>15 mins</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.timeRangeButton}>
          <Text style={styles.text}>30 mins</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.timeRangeButton}>
          <Text style={styles.text}>1 hr</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.timeRangeButton}>
          <Text style={styles.text}>2 hr</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.doneBtn} onPress={handlePresentModalClose}>
        <Text>Done</Text>
      </TouchableOpacity>
    </View>
  );
};

export { DailyHabitInputSheet, HabitSheet };

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    fontWeight: "800",
    color: "#222",
  },
  timeRangeButton: {
    backgroundColor: "#eeeeee",
    borderRadius: 100 / 2,
    padding: 12,
  },
  buttonsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: 4,
  },
  doneBtn: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ff7f2a",
    color: "#ffffff",
    padding: 12,
    borderRadius: 100 / 2,
  },
  sheetTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 10 },
  radioContainer: { flexDirection: "row", justifyContent: "space-between", marginBottom: 20,gap:10 },
  radioButton: { padding: 10, borderRadius: 10, backgroundColor: "#E5E5E5" },
  radioSelected: { backgroundColor: "orange" },
  radioText: { fontSize: 14 },
  radioTextSelected: { color: "white", fontWeight: "bold" },
  doneButton: { backgroundColor: "black", padding: 10, borderRadius: 5, alignItems: "center" },
  doneButtonText: { color: "white", fontWeight: "bold" },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, borderRadius: 5, marginBottom: 10 },
  addButton: { backgroundColor: "black", padding: 10, borderRadius: 5, alignItems: "center" },
  addButtonText: { color: "white", fontWeight: "bold" },
});
