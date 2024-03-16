import React, { useState } from "react";
import { Button, Text, useTheme } from "react-native-paper";
import MainView from "../../components/MainView";
import { View } from "react-native";
import { FormInput } from "../../components/FormInput";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { colors } = useTheme();

  return (
    <MainView colors={colors} alignCenter>
      <View
        style={{
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
          margin: -40,
        }}
      >
        <Text
          variant="headlineSmall"
          style={{
            width: "70%",
            color: colors.primary,
            textAlign: "center",
            marginBottom: 10,
            fontWeight: "bold",
          }}
        >
          Register
        </Text>
        <FormInput
          value={username}
          setValue={setUsername}
          placeholder={"Username"}
          autoComplete="username"
          secure={true}
        />
        <FormInput
          value={password}
          setValue={setPassword}
          placeholder={"Password"}
          type="password"
          autoComplete="password"
          secure={true}
        />

        <Button
          mode="contained"
          style={{
            width: "85%",
            marginTop: 16,
            height: 45,
            justifyContent: "center",
          }}
          labelStyle={{ fontSize: 18 }}
          contentStyle={{ height: "100%" }}
          // loading={loading}
          // onPress={handleLogin}
        >
          Register
        </Button>
      </View>
    </MainView>
  );
}
