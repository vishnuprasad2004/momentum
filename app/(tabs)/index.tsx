import { Image, StyleSheet, Platform, View } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import Header from '@/components/ui/Header';
import { StatusBar } from 'expo-status-bar';
import HabitTracker from '@/components/layout/HabitTracker';
import LottieView from 'lottie-react-native';
import { useRef } from 'react';
import Quote from '@/components/Quote';

export default function HomeScreen() {
  const animation = useRef<LottieView>(null);


  return (
    <ThemedView style={{flex:1}}>
      <StatusBar />
      <Header name='Vishnu'/>
      <HabitTracker/>
      <LottieView 
        source={require("@/assets/animations/checkmark.json")}
        style={{width:100, height:100}}
        ref={animation}
      />
      
      
    </ThemedView>
  );
}

const styles = StyleSheet.create({});
