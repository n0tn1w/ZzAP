import React, { useState } from "react";
import { Button, Text, useTheme } from "react-native-paper";
import MainView from "../../components/MainView";
import { View } from "react-native";
import { FormInput } from "../../components/FormInput";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { User, useAuth } from "../../contexts/AuthContext";

type LoginResponse = {
  jwt: string;
};

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { colors } = useTheme();
  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      const res = await axios.post<LoginResponse>("/login", {
        username,
        password,
      });

      const user: User = jwtDecode(res.data.jwt);
      login(user.username);
    } catch (error) {
      // TODO
    }
  };

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
          Login
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
          Login
        </Button>
      </View>
    </MainView>
  );
}
