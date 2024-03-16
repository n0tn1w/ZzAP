import React, { useState } from "react";
import { Button, Text, useTheme } from "react-native-paper";
import MainView from "../../components/MainView";
import { View } from "react-native";
import { FormInput } from "../../components/FormInput";
import useAxios from "../../utils/useAxios";
import { StackScreenProps } from "@react-navigation/stack";

export default function Register({ navigation }: StackScreenProps<any>) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { colors } = useTheme();

  const axios = useAxios();

  const handleRegister = async () => {
    if (username === "" || password === "") return;

    setIsLoading(true);
    try {
      const res = await axios.post("/register", {
        username,
        password,
      });
      console.log(res.data);

      navigation.navigate("login");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
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
          Register
        </Text>
        <FormInput
          value={username}
          setValue={setUsername}
          placeholder={"Username"}
          autoComplete="username"
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
          loading={isLoading}
          onPress={handleRegister}
        >
          Register
        </Button>
      </View>
    </MainView>
  );
}
