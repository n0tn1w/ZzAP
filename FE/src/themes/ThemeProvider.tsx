import { StatusBar } from "expo-status-bar";
import {
  MD3DarkTheme as DefaultLightTheme,
  MD3LightTheme as DefaultDarkTheme,
  PaperProvider,
} from "react-native-paper";
import { theme as AppTheme } from "./theme";

const LightTheme = {
  ...DefaultLightTheme,
  colors: AppTheme.light.colors,
};

const DarkTheme = {
  ...DefaultDarkTheme,
  colors: AppTheme.dark.colors,
};

export const ColorsSchemeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const paperTheme = DarkTheme;

  return (
    <PaperProvider theme={paperTheme}>
      <StatusBar backgroundColor={paperTheme.colors.background} />
      {children}
    </PaperProvider>
  );
};
