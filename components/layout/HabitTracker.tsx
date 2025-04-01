import { View, Text, Button, StyleSheet, StatusBar, FlatList, TouchableOpacity, Alert, ToastAndroid } from "react-native";
import { BottomSheetModalProvider, BottomSheetModal } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useCallback, useEffect, useRef, useState } from "react";
import BottomSheet from "@/components/BottomSheet";
import { HabitSheet } from "../DailyHabitSheet";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import Header from "../ui/Header";
import AddHabitSheet from "../AddHabitSheet";
import HabitCard from "../habitComponents/HabitCard";
import { addHabitRecord, addHabits, deleteHabit, fetchHabits } from "@/features/habit/habitSlice";

const CategoryList = ({ categories, onCategoryPress }:any) => (
  <FlatList
    data={categories}
    horizontal
    style={styles.list}
    showsHorizontalScrollIndicator={false}
    keyExtractor={(item) => item.id.toString()}
    ListFooterComponent={<>
    <TouchableOpacity 
        style={{justifyContent: "center",
          alignItems: "center",
          gap: 4,
          marginTop: 2,
        }}
        onPress={() => onCategoryPress("Add")}
      >
        <ThemedView style={styles.categoryItem}>
          <Text style={styles.categoryIcon}>{"➕"}</Text>
        </ThemedView>
        <ThemedText style={styles.categoryText}>{"Add"}</ThemedText>
      </TouchableOpacity></>
    }

    renderItem={({ item }) => (<HabitCard name={item.name} emoji={item.icon} handlePress={onCategoryPress} handleLongPress={() => {}}/>)}
  />
);

const HabitTracker = () => {
  const bottomSheetModalRef = useRef<BottomSheetModal|null>(null);
  const [selectedHabitId, setSelectedHabitId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [newHabit, setNewHabit] = useState({ name: "", icon: "" });
  const [selectedTime, setSelectedTime] = useState<number>(0);

  const { session } = useSelector((state:RootState) => state.auth);
  const { habits, loading, error } = useSelector((state:RootState) => state.habits);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (session?.user.id) {
      dispatch(fetchHabits({ user_id: session?.user.id }));
    }
  }, [dispatch, session]);

  const handleAddHabit = useCallback(() => {
    if (!session?.user.id) {
      ToastAndroid.show("You need to be logged in", ToastAndroid.SHORT);
      return;
    }

    if (!(/^\p{Emoji}$/u.test(newHabit.icon))) {
      ToastAndroid.show("You can only add an emoji as icon.", ToastAndroid.SHORT);
      return;
    }
    
    if (newHabit.name.trim() && newHabit.icon.trim()) {
      dispatch(addHabits({ 
        title: newHabit.name.trim(),
        emoji: newHabit.icon.trim(),
        user_id: session?.user.id!
      }));
      setNewHabit({ name: "", icon: "" });
      bottomSheetModalRef.current?.dismiss();
    } else {
      ToastAndroid.show("Please fill all the fields", ToastAndroid.SHORT);
    }
  }, [newHabit, session?.user.id, dispatch]);

  const handleDeleteHabit = useCallback((category: string) => {
    if (!session?.user.id) return;
    
    const habit = habits.find(h => (h.title) === category);
    if (!habit || !habit.id) {
      ToastAndroid.show("Cannot find habit to delete", ToastAndroid.SHORT);
      return;
    }

    Alert.alert(
      "Delete Habit",
      `Are you sure you want to delete "${category}"?`,
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Delete", 
          style: "destructive", 
          onPress: () => {
            dispatch(deleteHabit({ user_id: session?.user.id!, habit_id: habit.id! }));
            ToastAndroid.show(`Deleted habit: ${category}`, ToastAndroid.SHORT);
          } 
        }
      ]
    );
  }, [habits, dispatch]);


  const handleOpenBottomSheet = (category:any) => {
    setSelectedCategory(category === "Add" ? null : category);
    bottomSheetModalRef.current?.present();
  };

  // const handleAddHabit = useCallback(() => {
  //   if(!(/^\p{Emoji}$/u.test(newHabit.icon))) {
  //     ToastAndroid.show("You can only add an emoji as icon.", ToastAndroid.SHORT);
  //     return;
  //   }
  //   if (newHabit.name.trim() && newHabit.icon.trim()) {
  //     setCategories([...categories, { id: categories.length + 1, ...newHabit }]);
  //     setNewHabit({ name: "", icon: "" });
  //     bottomSheetModalRef.current?.dismiss();
  //   } else {
  //     ToastAndroid.show("Please fill all the fields",ToastAndroid.SHORT);
  //   }
  // },[newHabit, bottomSheetModalRef]);

  const handleAddHabitRecord = useCallback(() => {
    if (!session?.user.id || !selectedHabitId || !selectedTime) {
      ToastAndroid.show("Missing information for adding habit record", ToastAndroid.SHORT);
      return;
    }

    // Create entry with timestamp and duration
    const entry = JSON.stringify({
      date: new Date().toISOString(),
      duration: selectedTime
    });

    dispatch(addHabitRecord({
      habit_id: selectedHabitId,
      user_id: session?.user.id,
      entry
    }));

    ToastAndroid.show(`Added ${selectedTime} minutes to your habit!`, ToastAndroid.SHORT);
    bottomSheetModalRef.current?.dismiss();
  }, [selectedHabitId, selectedTime, session?.user.id, dispatch]);

  return (
    // <GestureHandlerRootView style={{ flex: 1 }}>
    //   <StatusBar />
    //   <SafeAreaView style={styles.container}>
    //     <Header name={session?.user.user_metadata?.name}/>
    //     <BottomSheetModalProvider>
    //       <ScrollView>
    //         <CategoryList categories={categories} onCategoryPress={handleOpenBottomSheet} />
    //         </ScrollView>
    //       <BottomSheet ref={bottomSheetModalRef}>
    //         {selectedCategory ? (
    //           <HabitSheet selectedCategory={selectedCategory} selectedTime={selectedTime} setSelectedTime={setSelectedTime} onClose={() => bottomSheetModalRef.current?.dismiss()} />
    //         ) : (
    //           <AddHabitSheet newHabit={newHabit} setNewHabit={setNewHabit} onAddHabit={handleAddHabit} />
    //         )}
    //       </BottomSheet>
    //     </BottomSheetModalProvider>
    //   </SafeAreaView>
    // </GestureHandlerRootView>
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar />
      <SafeAreaView style={styles.container}>
        <Header name={session?.user.user_metadata?.name} />
        <BottomSheetModalProvider>
          <ScrollView>
            {loading ? (
              <ThemedText style={{ textAlign: 'center', marginTop: 20 }}>Loading habits...</ThemedText>
            ) : error ? (
              <ThemedText style={{ textAlign: 'center', marginTop: 20, color: 'red' }}>
                Error loading habits: {error}
              </ThemedText>
            ) : (
              <CategoryList 
                categories={habits} 
                onCategoryPress={handleOpenBottomSheet} 
                onLongPress={handleDeleteHabit} 
              />
            )}
          </ScrollView>
          <BottomSheet ref={bottomSheetModalRef}>
            {selectedCategory ? (
              <HabitSheet 
                selectedCategory={selectedCategory} 
                selectedTime={selectedTime} 
                setSelectedTime={setSelectedTime} 
                onClose={handleAddHabitRecord} 
              />
            ) : (
              <AddHabitSheet 
                newHabit={newHabit} 
                setNewHabit={setNewHabit} 
                onAddHabit={handleAddHabit} 
              />
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
    marginTop: -20,
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
