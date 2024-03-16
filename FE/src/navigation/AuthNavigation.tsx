import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import { BottomNavigation } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome5";
import { CommonActions } from "@react-navigation/native";

export type AuthStackNavigationProps = {
  home: undefined;
  profile: undefined;
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
        name="home"
        component={Home}
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Icon name="home" color={color} size={23} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        component={Profile}
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <Icon name="user" color={color} size={23} />
          ),
        }}
      />
    </Tabs.Navigator>
  );
}