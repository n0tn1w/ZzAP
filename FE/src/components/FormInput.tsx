import React from "react";
import { TextInput, TextInputProps } from "react-native-paper";
import { TextInputIOSProps } from "react-native";

type FormInputProps = {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  type?: TextInputIOSProps["textContentType"];
  secure?: boolean;
} & TextInputProps;

export function FormInput({
  value,
  setValue,
  type,
  secure = false,
  ...rest
}: FormInputProps) {
  return (
    <TextInput
      value={value}
      onChangeText={setValue}
      textContentType={type}
      secureTextEntry={secure}
      mode="flat"
      placeholder={"pHolder"}
      style={{
        fontSize: 16,
        marginVertical: 4,
        width: "85%",
      }}
      {...rest}
    />
  );
}
