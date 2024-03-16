import { StyleSheet } from "react-native";
import { MD3Theme, useTheme } from "react-native-paper";

export const createThemedStyle =
  <T extends StyleSheet.NamedStyles<T>>(
    stylesFromTheme: (theme: MD3Theme) => T | StyleSheet.NamedStyles<T>
  ) =>
  () => {
    const theme = useTheme();
    const styles = stylesFromTheme(theme);
    return StyleSheet.create(styles);
  };
