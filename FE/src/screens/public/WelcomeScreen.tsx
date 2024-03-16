import { View } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";
import { StackScreenProps } from "@react-navigation/stack";

export default function WelcomeScreen({ navigation }: StackScreenProps<any>) {
  const { colors } = useTheme();

  return (
    <View
      style={{
        flex: 1,
        paddingVertical: 26,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.background,
      }}
    >
      <View style={{ marginVertical: 24 }}>
        <Text variant="displaySmall">XOR Hacakton</Text>
      </View>

      <Button
        mode="contained"
        style={{ width: "75%", marginVertical: 6 }}
        onPress={() => navigation.navigate("register")}
      >
        Register
      </Button>
      <Button
        mode="outlined"
        style={{ width: "75%", marginVertical: 6 }}
        onPress={() => navigation.navigate("login")}
      >
        Login
      </Button>
    </View>
  );
}
