import {
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import React, { useCallback, useEffect, useState } from "react";
// import AuthContext from "../../context/AuthContext";
import AnimatedButton from "../AnimatedButton";
import Task from "../Task";
import { ThemedText } from "../ThemedText";

const TaskManager = () => {

  const [title, setTitle] = useState<string>("");
  const [deadline, setDeadline] = useState<Date>(new Date());
  const [data, setData] = useState<any>([]);
  const [taskAdded, setTaskAdded] = useState(false); // 👈 State to trigger useEffect
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreashing] = useState(false);

  // const { service, userId } = React.useContext(AuthContext);

  const getTasks = async () => {
    try {
      // const response = await service.getTasks(userId);
      // setData(response);
    } catch (error) {
      console.log("Error", error);
    }
  };

  const addTask = useCallback(async() => {
    try {
      // validate the input field
      if (title.trim().length === 0) {
        ToastAndroid.show("Task cannot be empty", ToastAndroid.SHORT);
        return;
      }

      setLoading(true);
      const dl = deadline.toISOString();
      // const res = await service.createTask({userId, title, deadline:dl});

      setDeadline(new Date());
      setTitle("");
      setTaskAdded((prev) => !prev);
      ToastAndroid.show("Task added Successfully", ToastAndroid.SHORT);

    } catch (error) {
      console.error("Error", error);

    } finally {
      setLoading(false);
    }
  },[title, deadline]);

  useEffect(() => {
    getTasks();
  }, [taskAdded]);


  function handleRefresh() {
    // setRefreashing(true);
    // throw new Error("Function not implemented.");
  }

  return (
    <View style={[{ padding: 15, height: "100%", marginTop: 16 }, styles.container]}>
      <ThemedText style={{ fontSize: 20, fontFamily: "Poppins-Bold" }}>Add a Task with Deadline</ThemedText>

      <ThemedText style={{ fontFamily: "Poppins-Regular" }}>Enter the task and select the deadline</ThemedText>
      <View style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>

        <TextInput
          style={styles.input}
          placeholder="Enter the Task"
          multiline={true}
          onChangeText={(value) => setTitle(value)}
          value={title}
        />

        {/* The Date Picker and the  Add Button */}
        <View style={{ display: "flex", flexDirection: "row", gap: 8 }}>
          
          {/* Date Picker Button */}
          <TouchableOpacity
            style={styles.datePicker}
            onPress={() =>
              DateTimePickerAndroid.open({
                mode: "date",
                minimumDate: new Date(),
                value: deadline,
                onChange: (_event, selectedDate) => setDeadline(selectedDate!),
              })
            }
          >
            <Text style={{ fontFamily: "Poppins-Regular" }}>{deadline.toDateString()}</Text>
          </TouchableOpacity>

          <AnimatedButton onPress={addTask} title="Add" isLoading={loading} accessibilityHint="" accessibilityLabel="" width={"39%"} key={12} />
        </View>
      </View>
      <FlatList 
        style={styles.list} 
        data={data} 
        renderItem={({ item }) => <Task {...item} />} 
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh}/>}/>
      <View style={{height:10}}></View>
    </View>
  );
};

export default TaskManager;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    width: "100%",
    borderRadius: 8,
    paddingLeft: 10,
    backgroundColor: "#EBEBEB",
    fontFamily: "Poppins-Regular",
    overflow:"hidden",
    borderColor:"#CACACA",
    borderWidth:2,
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    marginTop:12,
  },
  datePicker: {
    backgroundColor: "#EBEBEB",
    borderRadius: 8,
    width: "58%",
    padding: 8,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderColor:"#CACACA",
    borderWidth:2,
  },
});
