import React from "react";
import { Text, useTheme } from "react-native-paper";
import { View } from "react-native";
import { DataTable } from "react-native-paper";
import { Avatar } from "react-native-paper";
import CrownIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { Image } from "react-native";
import { styles } from "./Styles";
import { Scroll } from "@tamagui/lucide-icons";
import { FlatList, ScrollView } from "react-native-gesture-handler";

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
    <View style={styleSheet.row}>
      <Text>{index}</Text>
      <Text>{item.name}</Text>
      <Avatar.Text size={64} label={item.name} />
      <Text>{item.score}</Text>
    </View>
  );

  const top3 = [usersRanked[1], usersRanked[0], usersRanked[2]];

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={styleSheet.top3Container}>
        {/* <View
          onTouchStart={() => console.log("touch 2nd")}
          style={{
            ...styleSheet.placesContainer,
            paddingTop: 50,
            paddingRight: 20,
          }}
        >
          <Image
            source={require("../../assets/secondPlaceLeaderBoard.png")}
            style={styleSheet.medalionImage}
          />
          <Avatar.Text size={64} label="2" style={styleSheet.avatarContainer} />
          {usersRanked[1] == null ? (
            <Text>No Data</Text>
          ) : (
            <Text>{usersRanked[1].name}</Text>
          )}
        </View> */}
        {/* <View
          onTouchStart={() => console.log("touch 1st")}
          style={{ ...styleSheet.placesContainer, paddingBottom: 20 }}
        >
          <Image
            source={require("../../assets/firstPlaceLeaderboard.png")}
            style={styleSheet.medalionImage}
          />
          <Avatar.Text size={76} label="1" style={styleSheet.avatarContainer} />
          {usersRanked[0] == null ? (
            <Text>No Data</Text>
          ) : (
            <Text>{usersRanked[0].name}</Text>
          )}
        </View> */}
        {/* <View
          onTouchStart={() => console.log("touch 3rd")}
          style={{
            ...styleSheet.placesContainer,
            paddingTop: 50,
            paddingLeft: 20,
          }}
        >
          <Image
            source={require("../../assets/thirdPlaceLeaderBoard.png")}
            style={styleSheet.medalionImage}
          />
          <Avatar.Text size={64} label="3" style={styleSheet.avatarContainer} />
          {usersRanked[2] == null ? (
            <Text>No Data</Text>
          ) : (
            <Text>{usersRanked[2].name}</Text>
          )}
        </View> */}

        {top3.map((user, index) => (
          <View
            key={user.key}
            onTouchStart={() => console.log(`touch ${index + 1}st`)}
            style={{
              ...styleSheet.placesContainer,
              paddingTop: 50,
              paddingRight: index === 0 ? 20 : index === 2 ? 20 : 0,
              paddingLeft: index === 0 ? 20 : index === 2 ? 20 : 0,
            }}
          >
            <Image
              source={
                index === 0
                  ? require("../../assets/secondPlaceLeaderBoard.png")
                  : index === 1
                    ? require("../../assets/firstPlaceLeaderboard.png")
                    : require("../../assets/thirdPlaceLeaderBoard.png")
              }
              style={styleSheet.medalionImage}
            />
            <Avatar.Text
              size={index === 1 ? 90 : 50}
              label={user.name}
              style={
                index === 1
                  ? {
                      ...styleSheet.firstPalceStyle,
                      ...styleSheet.generalTop3UserStyle,
                    }
                  : styleSheet.generalTop3UserStyle
              }
            />
            <Text>{user.name}</Text>
          </View>
        ))}
      </View>
      {/* <View>
        {usersRanked.length < 3 ? (
          <Text>No table</Text>
        ) : (
          <FlatList
            data={usersRanked}
            renderItem={(props) => <Item props={props} />}
            keyExtractor={(item) => `${item.key}`}
          />
        )}
      </View> */}
    </View>
  );
}
