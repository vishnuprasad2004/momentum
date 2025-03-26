import { View, Text, Button, StyleSheet, StatusBar, FlatList, TouchableOpacity } from "react-native";
import { BottomSheetModalProvider, BottomSheetModal } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useRef, useState } from "react";
import BottomSheet from "@/components/BottomSheet";
import { AddHabitSheet, HabitSheet } from "../DailyHabitSheet";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Header from "../ui/Header";

const CategoryList = ({ categories, onCategoryPress }:any) => (
  <FlatList
    data={categories}
    horizontal
    style={styles.list}
    showsHorizontalScrollIndicator={false}
    keyExtractor={(item) => item.id.toString()}
    renderItem={({ item }) => (
      <TouchableOpacity 
        style={{justifyContent: "center",
          alignItems: "center",
          gap: 4,
          marginTop: 2,
        }}
        onPress={() => onCategoryPress(item.name)}
      >
        <ThemedView style={styles.categoryItem}>
          <Text style={styles.categoryIcon}>{item.icon}</Text>
        </ThemedView>
        <ThemedText style={styles.categoryText}>{item.name}</ThemedText>
      </TouchableOpacity>
    )}
  />
);

const categoriesData = [
  { id: 1, name: "Coding", icon: "💻" },
  { id: 2, name: "Music", icon: "🎹" },
  { id: 3, name: "Workout", icon: "💪" },
  { id: 4, name: "Photography", icon: "📷" },
  { id: 5, name: "Painting", icon: "🎨" },
  { id: 6, name: "Add", icon: "➕" },
];


const HabitTracker = () => {
  const bottomSheetModalRef = useRef<BottomSheetModal|null>(null);

  const [categories, setCategories] = useState(categoriesData);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [newHabit, setNewHabit] = useState({ name: "", icon: "" });

  const { session } = useSelector((state:RootState) => state.auth);


  const handleOpenBottomSheet = (category:any) => {
    setSelectedCategory(category === "Add" ? null : category);
    bottomSheetModalRef.current?.present();
  };

  const handleAddHabit = () => {
    if (newHabit.name.trim() && newHabit.icon.trim()) {
      setCategories([...categories, { id: categories.length + 1, ...newHabit }]);
      setNewHabit({ name: "", icon: "" });
      bottomSheetModalRef.current?.dismiss();
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar />
      <SafeAreaView style={styles.container}>
        <Header name={session?.user.user_metadata?.name}/>
        <BottomSheetModalProvider>
          <ScrollView>
            <CategoryList categories={categories} onCategoryPress={handleOpenBottomSheet} />
            </ScrollView>
          <BottomSheet ref={bottomSheetModalRef}>
            {selectedCategory ? (
              <HabitSheet selectedCategory={selectedCategory} onClose={() => bottomSheetModalRef.current?.dismiss()} />
            ) : (
              <AddHabitSheet newHabit={newHabit} setNewHabit={setNewHabit} onAddHabit={handleAddHabit} />
            )}
          </BottomSheet>
        </BottomSheetModalProvider>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

export default HabitTracker

const styles = StyleSheet.create({
  container: { 
    flex: 1,
  },
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
  list: {
    paddingLeft: 15,
    paddingRight: 10,
    gap: 10,
  }
});
