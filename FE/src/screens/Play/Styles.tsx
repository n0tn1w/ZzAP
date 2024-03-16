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
    },
    levelImage: { width: 100, height: 100 },
    buttonsView: {
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      paddingLeft: 10,
      paddingBottom: 15,
    },
    lowerButtonsView: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      gap: 80,
    },
    image: {
      backgroundColor: colors.elevation.level2,
      padding: 5,
      borderRadius: 10,
    },
    flatList: {
      //paddingBottom: 10,
    },
  });
