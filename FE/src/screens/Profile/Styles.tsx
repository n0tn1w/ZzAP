import { StyleSheet } from "react-native";
import { transparent } from "react-native-paper/lib/typescript/styles/themes/v2/colors";
import { MD3Colors } from "react-native-paper/lib/typescript/types";

export const styles = (colors: MD3Colors) =>
  StyleSheet.create({
    view: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      paddingTop: 80,
      paddingLeft: 20,
      paddingBottom: 20,
    },

    title: {
      fontSize: 30,
      color: "white",
    },

    content: {
      flex: 1,
      paddingHorizontal: 20,
    },

    avatar: {
      backgroundColor: "transparent",
    },

    profileCard: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 30,
      borderRadius: 10,
      backgroundColor: colors.elevation.level2,
      paddingHorizontal: 30,
      paddingVertical: 30,
    },

    divisionImage: {
      width: 55,
      height: 55,
    },

    pointsRank: {
      flexDirection: "row",
      gap: 5,
      alignItems: "center",
      justifyContent: "center",
      paddingLeft: 20,
    },

    infoBox: {
      flexDirection: "column",
      alignItems: "center",
      gap: 5,
    },

    name: {
      fontSize: 16,
      color: "white",
      borderBottomColor: "grey",
      borderBottomWidth: 1,
    },

    lastPlayedContent: {
      borderRadius: 10,
      marginTop: 20,
      padding: 20,
      backgroundColor: colors.elevation.level2,
      flexDirection: "column",
      gap: 5,
    },

    lastPlayedTitle: {
      fontSize: 12,
      color: colors.onSurface,
      marginBottom: 10,
    },

    lastPlayedItem: {
      paddingVertical: 10,
      paddingHorizontal: 10,
      borderRadius: 10,
      backgroundColor: colors.elevation.level1,
      flexDirection: "row",
      justifyContent: "space-between",
    },

    lastPlayedLabel: {
      fontSize: 12,
      color: "white",
    },

    lastPlayedPoints: {
      fontSize: 12,
      color: colors.onSurface,
    },
  });
