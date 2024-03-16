import { StyleSheet } from "react-native";
import { MD3Colors } from "react-native-paper/lib/typescript/types";

export const styles = (colors: MD3Colors) =>
  StyleSheet.create({
    mainView: {
      flex: 1,
      backgroundColor: colors.background,
    },
    levelsView: {
      paddingTop: 10,
      flexDirection: "column",
      justifyContent: "flex-start",
      //alignItems: "flex-start",
      gap: 20,
      marginHorizontal: 10,
    },
    singleLevelView: {
      flexDirection: "row",
      padding: 10,
      alignContent: "center",
      borderRadius: 10,
      backgroundColor: colors.elevation.level3,
      paddingTop: 10,
    },
    levelImage: { width: 120, height: 120 },
    buttonsView: {
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      paddingLeft: 20,
      //paddingBottom: 15,
    },
    lowerButtonsView: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      gap: 60,
    },
    image: {
      backgroundColor: colors.elevation.level2,
      padding: 5,
      borderRadius: 10,
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
    modalContainer: {
      backgroundColor: colors.elevation.level3,
      padding: 20,
      margin: 20,
      borderRadius: 20,
    },
  });
