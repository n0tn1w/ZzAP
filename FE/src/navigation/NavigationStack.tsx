import { createStackNavigator } from "@react-navigation/stack";
import WelcomeScreen from "../screens/public/WelcomeScreen";
import Login from "../screens/public/Login";
import Register from "../screens/public/Register";

const PublicStack = createStackNavigator();

export default function NavigationStack() {
  return (
    <PublicStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <PublicStack.Screen name="home" component={WelcomeScreen} />
      <PublicStack.Screen name="login" component={Login} />
      <PublicStack.Screen name="register" component={Register} />
    </PublicStack.Navigator>
  );
}
