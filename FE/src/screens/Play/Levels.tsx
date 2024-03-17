import { StackScreenProps } from "@react-navigation/stack";
import { Icon, PaperProvider, Portal, Text, Modal } from "react-native-paper";
import { useTheme, Button } from "react-native-paper";
import { FlatList, View } from "react-native";
import { styles } from "./Styles";
import { Image } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import React, { useState } from "react";
import TrophyIcon from "react-native-vector-icons/MaterialCommunityIcons";
import Leaderboard from "./Leaderboard";

interface Level {
  id: number;
  title: string;
}

export default function Levels({ navigation }: StackScreenProps<any>) {
  const { colors } = useTheme();
  const styleSheet = styles(colors);
  const [visible, setVisible] = useState(false);
  const [leaderBoardId, setLeaderBoardId] = useState(0);
  const [levels] = React.useState([
    {
      id: 1,
      title: "Level 1",
      image: require("../../../assets/level1.jpeg"),
    },
    {
      id: 2,
      title: "Level 2",
      image: require("../../../assets/level2.jpeg"),
    },
    // {
    //   id: 3,
    //   title: "Level 2",
    //   image: require("../../../assets/level2.png"),
    // },
  ]);

  const hideModal = () => setVisible(false);

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
          <Text style={{ fontSize: 20, paddingBottom: 10, paddingTop: 5 }}>
            {title}
          </Text>
          <Button
            icon={"play"}
            style={{ width: 200, marginBottom: 10 }}
            mode="contained"
            onPress={() => navigation.navigate("connect")}
          >
            Play
          </Button>
          <View style={styleSheet.lowerButtonsView}>
            <Button
              mode="outlined"
              onPress={() => {
                setLeaderBoardId(id);
                setVisible(true);
              }}
            >
              <TrophyIcon size={20} name="trophy" />
            </Button>
            <Button
              mode="outlined"
              onPress={() => navigation.navigate("level1information")}
            >
              <TrophyIcon size={20} name="information" />
            </Button>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styleSheet.mainView}>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={{
            backgroundColor: colors.primaryContainer,
            justifyContent: "center",
            padding: 2,
            height: "50%",
          }}
        >
          <Leaderboard id={leaderBoardId} />
        </Modal>
      </Portal>
      <View style={styleSheet.header}>
        <Text style={styleSheet.title}>Levels</Text>
      </View>
      <View style={styleSheet.levelsView}>
        <GestureHandlerRootView>
          <FlatList
            contentContainerStyle={{ gap: 10 }}
            // style={styleSheet.flatList}
            data={levels}
            renderItem={({ item, index }) => (
              <Level id={index + 1} title={item.title} />
            )}
            keyExtractor={(item) => `${item.id - 1}`}
            ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
          />
        </GestureHandlerRootView>
      </View>
    </View>
  );
}
