import { ActivityIndicator, Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { deleteTodo, toggleTodo } from "@/features/todo/todoSlice";

type Todo = {
  id: string;
  user_id: string;
  title: string;
  deadline: string;
  is_completed: boolean;
};

const Task = ({ id, title, deadline, user_id, is_completed }: Todo) => {

  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.todo);

  const formatDate = (isoDate: string): string => {
    const date = new Date(isoDate);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
      // timeZoneName: "short",
    });
  };

  const handleDelete = async() => {
    Alert.alert(
      "Delete Task", 
      "Are you sure you want to delete this task?", [
      {
        text: "Cancel",
        onPress: () => {},
        style: "cancel"
      },
      { 
        text: "Delete", 
        onPress: () => {
          dispatch(deleteTodo(id)).then(() => {
            console.log("Task deleted");
          });
        },
        style: "default"
      },
    ]);
  }

  const handleComplete = async() => {
    Alert.alert(
      "Completed this Task",
      "Are you sure you have completed this task?", [
      {
        text: "Cancel",
        onPress: () => {},
        style: "cancel"
      },  
      { 
        text: "Complete", 
        onPress: async() => {
          await dispatch(toggleTodo(id)).then(() => {
            console.log("Task completed");
          }).catch((error) => {
            console.error("Error completing task", error);
          });
        },
        style: "default"
      },
    ]);

    // here you have to add the lottie animation, can't be done in development build, only in expo go
  }

  return (
    <View style={styles.task}>
      <View style={{maxWidth:"70%"}}>
        <Text style={styles.name}>{title}</Text>
        <Text style={styles.deadline}>{"Deadline: " + formatDate(deadline)}</Text>
        {is_completed? <Text style={{color:"green"}}>Completed</Text> : <Text style={{color:"#AD0011"}}>Not Completed</Text>}
      </View>
      <TouchableOpacity onPress={handleComplete}>
        <FontAwesome5 name="check-circle" size={24} color={is_completed ? "darkgreen": "black"} />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleDelete}>
        <MaterialIcons name="delete" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default Task;

const styles = StyleSheet.create({
  name: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
    color: "#222222",
  },
  deadline: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    color: "#222222",
  },
  task: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#E8E8E8",
    borderRadius: 8,
    marginVertical: 6,
    // boxShadow:"0 2px 0px #CACACA",
    borderBottomWidth:6,
    borderColor:"#CACACA",
    borderWidth:2,
  },
});
