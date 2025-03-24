import { StyleSheet, Image, Platform } from 'react-native';

import { ThemedView } from '@/components/ThemedView';
import { SafeAreaView } from 'react-native-safe-area-context';
import TaskManager from '@/components/layout/TaskManager';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';

export default function TodoTab() {

  const session = useSelector((state: RootState) => state.auth.session);

  return (
    <ThemedView>
      <SafeAreaView>
        <TaskManager user_id={session?.user.id ?? ''}/>
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
