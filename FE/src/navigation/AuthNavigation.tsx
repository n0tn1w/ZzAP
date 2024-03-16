import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Profile from "../screens/Profile/Profile";
import { BottomNavigation, useTheme } from "react-native-paper";
import LeaderboardIcon from "react-native-vector-icons/MaterialIcons";
import IconFeather from "react-native-vector-icons/Feather";
import { CommonActions } from "@react-navigation/native";
import Play from "../screens/Play/Play";
import Leaderboard from "../screens/Leaderboards/Leaderboard";

export type AuthStackNavigationProps = {
  profile: undefined;
  play: undefined;
  leaderboard: undefined;
};

const Tabs = createBottomTabNavigator<AuthStackNavigationProps>();

export default function AuthNavigationStack() {
  const { colors } = useTheme();
  const generalOptions = {
    tabBarShowLabel: true,
    headerStyle: {
      borderWidth: 0,
      shadowOpacity: 0,
      backgroundColor: colors.elevation.level2,
    },
    headerTitleAlign: "center",
    headerTintColor: colors.onSurface,
  };

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
        // @ts-ignore
        options={{
          title: "Play",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <IconFeather name="play-circle" color={color} size={23} />
          ),
          ...generalOptions,
        }}
      />

      <Tabs.Screen
        name="leaderboard"
        component={Leaderboard}
        // @ts-ignore
        options={{
          title: "Leaderboard",
          // headerShown: false,
          tabBarIcon: ({ color }) => (
            <LeaderboardIcon name="leaderboard" color={color} size={23} />
          ),
          ...generalOptions,
        }}
      />

      <Tabs.Screen
        name="profile"
        component={Profile}
        // @ts-ignore
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <IconFeather name="user" color={color} size={23} />
          ),
          ...generalOptions,
        }}
      />
    </Tabs.Navigator>
  );
}
