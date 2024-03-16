import { createStackNavigator } from "@react-navigation/stack";
import Levels from "./Levels";
import Connect from "./Connect";

const PublicStack = createStackNavigator();

export default function NavigationStack() {
  return (
    <PublicStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <PublicStack.Screen name="levels" component={Levels} />
      <PublicStack.Screen name="connect" component={Connect} />
    </PublicStack.Navigator>
  );
}
