import { Image, StyleSheet, Platform, View } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import Header from '@/components/ui/Header';
import HabitTracker from '@/components/layout/HabitTracker';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

export default function HomeScreen() {
  // const animation = useRef<LottieView>(null);
  const { session } = useSelector((state:RootState) => state.auth);

  return (
    <ThemedView style={{flex:1}}>
      
      <HabitTracker/>
    </ThemedView>
  );
}

const styles = StyleSheet.create({});
