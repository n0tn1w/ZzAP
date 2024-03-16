import { NavigationContainer } from "@react-navigation/native";
import AuthNavigation from "./AuthNavigation";
import NavigationStack from "./NavigationStack";

export default function index() {
  return (
    <NavigationContainer>
      <AuthNavigation />
      {/* <NavigationStack /> */}
    </NavigationContainer>
  );
}
