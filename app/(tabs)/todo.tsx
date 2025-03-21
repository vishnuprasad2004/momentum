import { StyleSheet, Image, Platform } from 'react-native';

import { ThemedView } from '@/components/ThemedView';
import { SafeAreaView } from 'react-native-safe-area-context';
import TaskManager from '@/components/layout/TaskManager';

export default function TabTwoScreen() {
  return (
    <ThemedView>
      <SafeAreaView>
        <TaskManager/>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
