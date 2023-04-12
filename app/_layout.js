import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useCallback } from "react";

SplashScreen.preventAutoHideAsync()


export const unstable_settings = {
  // Ensure any route can link back to `/`
  initialRouteName: "home",
};

const Layout = () => {
  const [fontsLoaded] = useFonts({
    SpartanBlack: require('../assets/fonts/LeagueSpartan-Black.ttf'),
    SpartanBold: require('../assets/fonts/LeagueSpartan-Bold.ttf'),
    SpartanMedium: require('../assets/fonts/LeagueSpartan-Medium.ttf'),
    SpartanRegular: require('../assets/fonts/LeagueSpartan-Regular.ttf'),
    SpartanSemiBold: require('../assets/fonts/LeagueSpartan-SemiBold.ttf'),
  })

  const onLayoutRootView = useCallback(async() => {
    if (!fontsLoaded) {
      await SplashScreen.hideAsync()
    }
  }, [fontsLoaded])

  if (!fontsLoaded) return null

  return <Stack onLayout={onLayoutRootView} />
}

export default Layout