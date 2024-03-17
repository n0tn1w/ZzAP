import { View, Image } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";
import { StackScreenProps } from "@react-navigation/stack";

export default function WelcomeScreen({ navigation }: StackScreenProps<any>) {
  const { colors } = useTheme();

  const logoPath = require("../../../assets/logo.png");

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
      <View style={{ paddingLeft: 35, marginVertical: 24 }}>
        <Image source={logoPath} style={{ width: 300, height: 150 }} />
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
