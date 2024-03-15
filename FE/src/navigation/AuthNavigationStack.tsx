import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";

export type AuthStackNavigationProps = {
    home: undefined
}

const AuthStack = createBottomTabNavigator<AuthStackNavigationProps>();

export default function AuthNavigationStack() {
  return (
    <AuthStack.Navigator>
        <AuthStack.Screen name="home" component={Home}/>
    </AuthStack.Navigator>
  )
}
