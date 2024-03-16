import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Play from "../screens/Play";


export type AuthStackNavigationProps = {
  home: undefined
  play: undefined
}

const AuthStack = createBottomTabNavigator<AuthStackNavigationProps>();

export default function AuthNavigationStack() {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name="home" component={Home} />
      <AuthStack.Screen name="play" component={Play} />
    </AuthStack.Navigator>
  )
}
