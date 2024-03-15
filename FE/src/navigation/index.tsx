import { NavigationContainer } from "@react-navigation/native";
import AuthNavigationStack from "./AuthNavigationStack";

export default function index() {
    return (
        <NavigationContainer>
            <AuthNavigationStack />
        </NavigationContainer>
    )
}