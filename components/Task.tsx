import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Task = ({ id, title, deadline }: { id: number; title: string; deadline: string }) => {
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
  return (
    <View style={styles.task}>
      <Text style={styles.name}>{title}</Text>
      <Text style={styles.deadline}>{"Deadline: " + formatDate(deadline)}</Text>
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
    padding: 12,
    backgroundColor: "#E8E8E8",
    borderRadius: 8,
    marginVertical: 6,
    // boxShadow:"0 2px 0px #CACACA",
    borderBottomWidth:4,
    borderColor:"#CACACA",
    borderWidth:2,
  },
});
