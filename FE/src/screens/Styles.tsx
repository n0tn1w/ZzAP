import { StyleSheet } from "react-native";
import { transparent } from "react-native-paper/lib/typescript/styles/themes/v2/colors";
import { MD3Colors } from "react-native-paper/lib/typescript/types";

export const styles = (colors: MD3Colors) =>
  StyleSheet.create({
    view: {
      flex: 1,
      backgroundColor: colors.background,
    },
    medalionImage: {
      width: 40,
      height: 40,
    },
    top3Section: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "flex-end",
      backgroundColor: colors.elevation.level2,
      borderBottomLeftRadius: 25,
      borderBottomRightRadius: 25,
      paddingVertical: 20,
      gap: 30,
    },
    firstPlace: {
      paddingBottom: 10,
    },
    generalPlace: {
      flexDirection: "column",
      alignItems: "center",
      gap: 5,
    },
    rankNumber: {
      minWidth: 20,
    },

    firstPlaceAwardImage: {
      width: 35,
      height: 40,
    },

    generalAwardImage: {
      width: 22,
      height: 22,
    },

    row: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 10,
      gap: 10,
    },

    name: {
      flex: 1,
    },

    myRank: {
      backgroundColor: colors.elevation.level2,
    },

    top3Name: {
      color: colors.onSurface,
    },

    flatList: {
      paddingHorizontal: 10,
    },

    avatar: {
      backgroundColor: "transparent",
    },
  });
