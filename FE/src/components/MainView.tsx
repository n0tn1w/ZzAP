import React from "react";
import { MD3Colors } from "react-native-paper/lib/typescript/types";
import { SafeAreaView } from "react-native-safe-area-context";

type MainViewProps = {
  colors: MD3Colors;
  children: React.ReactNode;
  marginTop?: number;
  paddingHorizontal?: number;
  alignCenter?: boolean;
};

export default function MainView({
  colors,
  children,
  marginTop = 0,
  paddingHorizontal = 12,
  alignCenter = false,
}: MainViewProps) {
  return (
    <SafeAreaView
      mode="padding"
      style={{
        flex: 1,
        backgroundColor: colors.background,
        alignItems: alignCenter ? "center" : "stretch",
        paddingHorizontal,
        marginTop: marginTop,
      }}
    >
      {children}
    </SafeAreaView>
  );
}
