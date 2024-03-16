import { NavigationContainer } from "@react-navigation/native";
import AuthNavigation from "./AuthNavigation";
import NavigationStack from "./NavigationStack";
import { useAuth } from "../contexts/AuthContext";

export default function index() {
  const { isAuth } = useAuth();

  return (
    <NavigationContainer>
      {isAuth ? <AuthNavigation /> : <NavigationStack />}
    </NavigationContainer>
  );
}
