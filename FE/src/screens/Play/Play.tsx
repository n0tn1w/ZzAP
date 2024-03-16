import { createStackNavigator } from "@react-navigation/stack";
import Levels from "./Levels";
import Connect from "./Connect";
import { useState } from "react";
import { useTheme } from "react-native-paper";
import { styles } from "./Styles";

const PublicStack = createStackNavigator();

export default function NavigationStack() {
  const { colors } = useTheme();
  const styleSheet = styles(colors);

  return (
    <PublicStack.Navigator
      screenOptions={{
        headerShown: true,
        headerTitleAlign: "left",
        headerTintColor: colors.onSurface,
        headerStyle: {
          borderWidth: 0,
          shadowOpacity: 0,
          backgroundColor: colors.elevation.level2,
        },
      }}
    >
      <PublicStack.Screen name="Levels" component={Levels} />
      <PublicStack.Screen name="connect" component={Connect} />
    </PublicStack.Navigator>
  );
}
