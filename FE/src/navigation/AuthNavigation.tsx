import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Profile from "../screens/Profile";
import { BottomNavigation } from "react-native-paper";
import IconFA from "react-native-vector-icons/FontAwesome5";
import IconFeather from "react-native-vector-icons/Feather";
import { CommonActions } from "@react-navigation/native";
import Play from "../screens/Play";
import Leaderboard from "../screens/Leaderboard";

export type AuthStackNavigationProps = {
  profile: undefined;
  play: undefined;
  leaderboard: undefined;
};

const Tabs = createBottomTabNavigator<AuthStackNavigationProps>();

export default function AuthNavigationStack() {
  return (
    <Tabs.Navigator
      id="TabsID"
      // screenOptions={{
      //   header: ({ route, navigation }) => (
      //     <TabsHeader title={route.name} navigation={navigation} />
      //   ),
      // }}
      tabBar={({ navigation, state, descriptors, insets }) => (
        <BottomNavigation.Bar
          navigationState={state}
          safeAreaInsets={insets}
          onTabPress={({ route, preventDefault }) => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (event.defaultPrevented) {
              preventDefault();
            } else {
              navigation.dispatch({
                ...CommonActions.navigate(route.name, route.params),
                target: state.key,
              });
            }
          }}
          renderIcon={({ route, focused, color }) => {
            const { options } = descriptors[route.key];
            if (options.tabBarIcon) {
              return options.tabBarIcon({ focused, color, size: 24 });
            }

            return null;
          }}
          getLabelText={({ route }) => {
            const label = route.name;

            return label;
          }}
        />
      )}
    >
      <Tabs.Screen
        name="play"
        component={Play}
        options={{
          title: "Play",
          tabBarIcon: ({ color }) => (
            <IconFeather name="play-circle" color={color} size={23} />
          ),
        }}
      />

      <Tabs.Screen
        name="leaderboard"
        component={Leaderboard}
        options={{
          title: "Leaderboard",
          tabBarIcon: ({ color }) => (
            <IconFeather name="leaderboard" color={color} size={23} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        component={Profile}
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <IconFeather name="user" color={color} size={23} />
          ),
        }}
      />
    </Tabs.Navigator>
  );
}
