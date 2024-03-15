import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import { TamaguiProvider, Theme, View, createTamagui } from 'tamagui';
import config from "@tamagui/config/v3";
import Navigation from "./src/navigation"

const appConfig = createTamagui(config);

export default function App() {
  const [loaded] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });

  useEffect(() => {
    if (loaded) {
      // can hide splash screen here
    }
  }, [loaded])

  if (!loaded) {
    return null;
  }
  
  return (
    <TamaguiProvider config={appConfig}>
      <Theme name="light">
          <Navigation />
      </Theme>
    </TamaguiProvider>
  );
}
