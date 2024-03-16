import { StyleSheet } from "react-native";
import { MD3Colors } from "react-native-paper/lib/typescript/types";

export const styles = (colors: MD3Colors) =>
  StyleSheet.create({
    medalionImage: {
      width: 40,
      height: 40,
    },
    top3Container: {
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
      backgroundColor: colors.backdrop,
      borderBottomLeftRadius: 25,
      borderBottomRightRadius: 25,
    },
    placesContainer: {
      flexDirection: "column",
      justifyContent: "space-around",
      alignItems: "center",
      padding: 10,
      gap: 4.5,
    },
    generalTop3UserStyle: {
      borderWidth: 3,
      padding: 2,
      borderColor: "yellow",
      borderRadius: 50,
    },
    firstPalceStyle: {},

    row: {},
  });
