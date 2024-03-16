import { StackScreenProps } from "@react-navigation/stack";
import { FlatList, View } from "react-native";
import { SetStateAction, useState } from "react";
import { Text } from "react-native-paper";
import { useTheme, Button } from "react-native-paper";
import { styles } from "./Styles";
import { Image } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import React from "react";

interface Level {
  id: number;
  title: string;
}

export default function Levels({ navigation }: StackScreenProps<any>) {
  const { colors } = useTheme();
  const styleSheet = styles(colors);

  const [levels] = React.useState([
    {
      id: 1,
      title: "Level 1",
      image: require("../../../assets/level1.png"),
    },
    {
      id: 2,
      title: "Level 2",
      image: require("../../../assets/level2.png"),
    },
    {
      id: 3,
      title: "Level 2",
      image: require("../../../assets/level2.png"),
    },
    {
      id: 4,
      title: "Level 2",
      image: require("../../../assets/level2.png"),
    },
    {
      id: 5,
      title: "Level 2",
      image: require("../../../assets/level2.png"),
    },
    {
      id: 6,
      title: "Level 2",
      image: require("../../../assets/level2.png"),
    },
    {
      id: 7,
      title: "Level 2",
      image: require("../../../assets/level2.png"),
    },
  ]);

  const Level = ({ id, title }: Level) => {
    return (
      <View style={styleSheet.singleLevelView}>
        <View style={{ alignItems: "center" }}>
          <View style={styleSheet.image}>
            <Image
              source={levels[id - 1].image}
              style={styleSheet.levelImage}
            />
          </View>
        </View>
        <View style={styleSheet.buttonsView}>
          <Text style={{ fontSize: 20 }}>{title}</Text>
          <Button
            style={{ width: 200, marginBottom: 10 }}
            mode="contained"
            onPress={() => console.log(`Pressed ${id}`)}
          >
            Play
          </Button>
          <View style={styleSheet.lowerButtonsView}>
            <Button
              //style={{ width: 140 }}
              mode="outlined"
              onPress={() => console.log(`Pressed ${id}`)}
            >
              Rankings
            </Button>
            <Button
              mode="outlined"
              onPress={() => console.log(`Pressed ${id}`)}
            >
              Level Info
            </Button>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styleSheet.mainView}>
      <View style={styleSheet.levelsView}>
        <GestureHandlerRootView>
          <FlatList
            contentContainerStyle={{ gap: 10 }}
            style={styleSheet.flatList}
            data={levels}
            renderItem={({ item, index }) => (
              <Level id={index + 1} title={item.title} />
            )}
            keyExtractor={(item) => `${item.id - 1}`}
          />
        </GestureHandlerRootView>
      </View>
    </View>
  );
}
