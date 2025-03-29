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
import React, { useCallback, useEffect, useRef, useState } from "react";
import AnimatedButton from "../AnimatedButton";
import Task from "../Task";
import { ThemedText } from "../ThemedText";
import LottieView from "lottie-react-native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { addTodo, fetchTodos } from "@/features/todo/todoSlice";

type Todo = {
  id: string;
  user_id: string;
  title: string;
  deadline: string;
  is_completed: boolean;
};

const TaskManager = ({user_id}: {user_id: string}) => {

  const [title, setTitle] = useState<string>("");
  const [deadline, setDeadline] = useState<Date>(new Date());
  const [refreshing, setRefreshing] = useState(false);

  const { loading, todos } = useSelector((state: RootState) => state.todo);
  const dispatch = useDispatch<AppDispatch>();

  const confirmationScreenRef = useRef<View>(null);

  // Fetch tasks from the server
  const getTasks = useCallback(async () => {
    try {
      await dispatch(fetchTodos({ user_id })).unwrap(); // Ensure the action completes
    } catch (error) {
      // ToastAndroid.show("Error fetching tasks", ToastAndroid.SHORT);
      console.log("Error fetching tasks:", error);
    }
  }, [dispatch]);

  const addTask = useCallback(async() => {
    try {
      // validate the input field
      if (title.trim().length === 0) {
        ToastAndroid.show("Task cannot be empty", ToastAndroid.SHORT);
        return;
      }

      const dl = deadline.toISOString();
      dispatch(addTodo({ user_id, title, deadline: dl })).unwrap().then(() => {
        setDeadline(new Date());
        setTitle("");

        getTasks();
        ToastAndroid.show("Task added Successfully", ToastAndroid.SHORT);
        
        setTimeout(() => {

        },700)

      });


    } catch (error) {
      console.error("Error", error);

    } 
  },[title, deadline, user_id, dispatch, getTasks]);

  // Refresh handler for pull-to-refresh
  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await getTasks();
    setRefreshing(false);
  }, [getTasks]);

  // Fetch tasks on component mount
  useEffect(() => {
    getTasks();
    // console.log(todos);
    
  }, [getTasks]);

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
      <View style={{flex:1}}>
        <FlatList 
          style={styles.list} 
          data={todos as Todo[]}        
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <Task {...item} confirmationScreenRef={confirmationScreenRef}/>} 
          ListEmptyComponent={<ThemedText>No Todos found</ThemedText>}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh}/>}
          scrollEnabled={true}
          ListFooterComponent={<View style={{height:100}}></View>}
        />
      </View>
      <View style={styles.confirmationScreen} ref={confirmationScreenRef}>
        <LottieView source={require("@/assets/animations/checkmark.json")} autoPlay direction={1} duration={2000} style={{width:200, height:200}}></LottieView>
        <ThemedText style={{fontFamily: "Poppins-SemiBold"}}>Task Completed</ThemedText>
      </View>

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
    lineHeight: 20, // Prevents height fluctuation due to text size
    height:40,
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    marginTop:12,
    // paddingBottom: 80,
    overflow: "scroll",
    // flex:1
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
  confirmationScreen: {
    // display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 1000,
    display: "none"
  }
});
