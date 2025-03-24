import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { router, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState, store } from '@/store/store';
import { fetchSession, subscribeToAuthChanges } from '@/features/auth/authSlice';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

function InitialLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
  });

  const dispatch = useDispatch<AppDispatch>();
  const session = useSelector((state: RootState) => state.auth.session);
  const [isSessionChecked, setIsSessionChecked] = useState(false); // Track session check

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
      dispatch(fetchSession()).unwrap().then(() => {
        setIsSessionChecked(true);
      });
    }
    const unsubscribe = subscribeToAuthChanges(dispatch);
    return () => {
      unsubscribe();
    };
  }, [loaded, dispatch]);
  

  useEffect(() => {
    if (isSessionChecked) {
      if (session) {
        router.replace("/(tabs)");
      } else {
        router.replace("/(public)");
      }
    }
  }, [isSessionChecked, session]); // Re-run when session is updated

  if (!loaded) {
    return <></>;
  }
  
  return (
    <>
      <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(public)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </>
  );

}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  // const [loaded] = useFonts({
  //   SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  //   "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
  //   "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
  //   "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
  //   "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
  // });

  // useEffect(() => {
  //   if (loaded) {
  //     SplashScreen.hideAsync();
  //     // setTimeout(() => {
  //     //   router.replace("/(tabs)")
  //     // }, 0);
  //   }
  // }, [loaded]);

  // if (!loaded) {
  //   return null;
  // }


  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Provider store={store}>
        <InitialLayout />
      </Provider>
    </ThemeProvider>
  );
}
