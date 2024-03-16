import React from "react";
import { View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { MD3Colors } from "react-native-paper/lib/typescript/types";

export default function Loading({ colors }: { colors: MD3Colors }) {
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        backgroundColor: colors.background,
      }}
    >
      <ActivityIndicator animating={true} size="large" />
    </View>
  );
}
