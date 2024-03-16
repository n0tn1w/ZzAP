import Navigation from "./src/navigation";
import { useEffect } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { ColorsSchemeProvider } from "./src/themes/ThemeProvider";
import { AuthProvider } from "./src/contexts/AuthContext";

import { decode, encode } from "base-64";

if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    Raleway: require("./assets/Raleway-Regular.ttf"),
  });

  useEffect(() => {
    const dismountSplash = async () => {
      if (fontsLoaded) {
        await SplashScreen.hideAsync();
      }
    };

    dismountSplash();
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <AuthProvider>
      <ColorsSchemeProvider>
        <Navigation />
      </ColorsSchemeProvider>
    </AuthProvider>
  );
}
