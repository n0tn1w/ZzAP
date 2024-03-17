import { createStackNavigator } from "@react-navigation/stack";
import Levels from "./Levels";
import Connect, { Level } from "./Connect";
import { useTheme } from "react-native-paper";
import LevelDescription from "./LevelDescription";

export type PublicStackProps = {
  levels: undefined;
  connect: undefined;
  description: { level: Level | undefined };
};

const PublicStack = createStackNavigator();

export default function NavigationStack() {
  const { colors } = useTheme();

  return (
    <PublicStack.Navigator
      screenOptions={{
        headerShown: false,
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
      <PublicStack.Screen name="description" component={LevelDescription} />
      <PublicStack.Screen
        name="level1information"
        component={LevelDescription}
      />
    </PublicStack.Navigator>
  );
}
