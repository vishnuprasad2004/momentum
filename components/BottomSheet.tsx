import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { FC, forwardRef, ReactNode, useCallback, useMemo, useRef } from 'react'
import { BottomSheetBackdrop, BottomSheetHandle, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet'
import { useColorScheme } from '@/hooks/useColorScheme';


const BottomSheet = forwardRef<BottomSheetModal, { children: ReactNode }>(({ children }, ref) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const renderBackdrop = useCallback(
    (props: any) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />,
    []
  );

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handlePresentModalClose = useCallback(() => {
    bottomSheetModalRef.current?.close();
  }, []);


  const snapPoints = useMemo(() => ["35%"], []);
  const colorScheme = useColorScheme() ?? 'light';


  return (
    <View>
      <BottomSheetModal
            ref={ref}
            // onChange={handleSheetChanges}
            snapPoints={snapPoints}
            keyboardBehavior="interactive"
            enableDynamicSizing={false}
            backdropComponent={renderBackdrop}
            handleStyle={{ backgroundColor: colorScheme === 'dark' ? '#121212' : '#FAFAFA' }}
            backgroundStyle={styles.backgroundContainer}
            handleIndicatorStyle={styles.handleIndicator}
          >
            <BottomSheetView style={[styles.contentContainer, { backgroundColor: colorScheme === 'dark' ? '#121212' : '#FAFAFA' }]}>
              {children}
            </BottomSheetView>
          </BottomSheetModal>
    </View>
  )
})

export default BottomSheet

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight! - 12 || 0,
    fontFamily: "Poppins-SemiBold",
    // backgroundColor: "#FAFAFA",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
  backgroundContainer: {
    backgroundColor: '#222',
  },
  handleIndicator: {
    backgroundColor: '#eee',
  },
})