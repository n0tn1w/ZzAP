import React from "react";
import { Text, useTheme } from "react-native-paper";
import { View } from "react-native";
import { Avatar } from "react-native-paper";
import { Image } from "react-native";
import { styles } from "./Styles";
import {
  FlatList,
  Gesture,
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import { transparent } from "react-native-paper/lib/typescript/styles/themes/v2/colors";

export default function Leaderboard() {
  const { colors } = useTheme();
  const [page, setPage] = React.useState<number>(0);
  const [numberOfItemsPerPageList] = React.useState([2, 3, 4]);
  const [itemsPerPage, onItemsPerPageChange] = React.useState(
    numberOfItemsPerPageList[0]
  );

  const [usersRanked] = React.useState([
    {
      key: 1,
      name: "John",
      time: 356,
      score: 16,
    },
    {
      key: 2,
      name: "Ivan",
      time: 262,
      score: 16,
    },
    {
      key: 3,
      name: "George",
      time: 159,
      score: 6,
    },
    {
      key: 4,
      name: "Emily",
      time: 421,
      score: 22,
    },
    {
      key: 5,
      name: "Sophia",
      time: 289,
      score: 18,
    },
    {
      key: 6,
      name: "Daniel",
      time: 198,
      score: 11,
    },
    {
      key: 7,
      name: "Emma",
      time: 333,
      score: 15,
    },
    {
      key: 8,
      name: "Liam",
      time: 176,
      score: 9,
    },
    {
      key: 9,
      name: "Olivia",
      time: 402,
      score: 20,
    },
    {
      key: 10,
      name: "Michael",
      time: 312,
      score: 17,
    },
    {
      key: 11,
      name: "Ava",
      time: 245,
      score: 14,
    },
    {
      key: 12,
      name: "William",
      time: 389,
      score: 21,
    },
    {
      key: 13,
      name: "Ethan",
      time: 174,
      score: 10,
    },
    {
      key: 14,
      name: "Isabella",
      time: 376,
      score: 19,
    },
    {
      key: 15,
      name: "James",
      time: 298,
      score: 16,
    },
    {
      key: 16,
      name: "Mia",
      time: 211,
      score: 12,
    },
    {
      key: 17,
      name: "Alexander",
      time: 344,
      score: 18,
    },
    {
      key: 18,
      name: "Charlotte",
      time: 186,
      score: 11,
    },
  ]);

  const from = 3;
  const to = usersRanked.length;

  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  const styleSheet = styles(colors);

  const Item = ({ item, index }: any) => (
    <View style={[styleSheet.row, index === 4 ? styleSheet.myRank : null]}>
      <Text style={styleSheet.rankNumber}>{index}</Text>
      <Avatar.Image size={40} source={getImage()} style={styleSheet.avatar} />
      <Text style={styleSheet.name}>{item.name}</Text>
      <Text>{item.score}</Text>
    </View>
  );

  const top3 = [usersRanked[1], usersRanked[0], usersRanked[2]];
  const profilePics = [
    require("../../assets/avatars/person1.png"),
    require("../../assets/avatars/person2.png"),
    require("../../assets/avatars/person3.png"),
    require("../../assets/avatars/person4.png"),
  ];

  const getImage = () => profilePics[Math.floor(Math.random() * (3 - 0) + 0)];

  const getAwardImage = (index: number) =>
    index === 0
      ? require("../../assets/secondPlaceLeaderBoard.png")
      : index === 1
        ? require("../../assets/firstPlaceLeaderboard.png")
        : require("../../assets/thirdPlaceLeaderBoard.png");

  const getAwardImageStyle = (index: number) =>
    index === 1
      ? styleSheet.firstPlaceAwardImage
      : styleSheet.generalAwardImage;

  return (
    <View style={styleSheet.view}>
      <View style={styleSheet.top3Section}>
        {top3.map((user, index) => (
          <View
            style={
              index === 1
                ? { ...styleSheet.firstPlace, ...styleSheet.generalPlace }
                : styleSheet.generalPlace
            }
            key={user.key}
            onTouchStart={() => console.log(`touch ${index + 1}st`)}
          >
            <Image
              source={getAwardImage(index)}
              style={getAwardImageStyle(index)}
            />
            <Avatar.Image
              size={index === 1 ? 75 : 60}
              source={getImage()}
              style={styleSheet.avatar}
            />
            <Text style={styleSheet.top3Name}>{user.name}</Text>
          </View>
        ))}
      </View>

      <GestureHandlerRootView>
        <FlatList
          style={styleSheet.flatList}
          data={usersRanked.slice(3, usersRanked.length)}
          renderItem={({ item, index }) => <Item item={item} index={index} />}
          keyExtractor={(item) => `${item.key}`}
        />
      </GestureHandlerRootView>
    </View>
  );
}
