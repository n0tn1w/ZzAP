import { View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, useTheme } from "react-native-paper";
import { Avatar } from "react-native-paper";
import { styles } from "./Styles";
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";
import useAxios from "../../utils/useAxios";
import { useAuth } from "../../contexts/AuthContext";
import Loading from "../../components/Loading";

type LeaderbaordEntity = {
  username: string;
  score: number;
  division: string;
};

export default function Leaderboard() {
  const { colors } = useTheme();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  const axios = useAxios(true);
  useEffect(() => {
    const fetchLeaderboard = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get<LeaderbaordEntity[]>("/leaderboard");
        setUserRanked(res.data);
      } catch (error) {
        // TODO
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  const [usersRanked, setUserRanked] = React.useState<LeaderbaordEntity[]>([]);
  const styleSheet = styles(colors);

  const Item = ({ item, index }: any) => {
    console.log(item.username);

    return (
      <View
        style={[
          styleSheet.row,
          item.username === user?.username ? styleSheet.myRank : null,
        ]}
      >
        <Text style={styleSheet.rankNumber}>{index + 4}</Text>
        <Avatar.Image size={40} source={getImage()} style={styleSheet.avatar} />
        <View style={styleSheet.rankAndNameView}>
          <Text style={styleSheet.name}>{item.username}</Text>
          <Text style={styleSheet.division}>{item.division}</Text>
        </View>
        {/* <Text style={styleSheet.name}>{item.username}</Text> */}
        <Text>{item.score}</Text>
      </View>
    );
  };

  const top3 = [usersRanked[1], usersRanked[0], usersRanked[2]];
  const profilePics = [
    require("../../../assets/avatars/person1.png"),
    require("../../../assets/avatars/person2.png"),
    require("../../../assets/avatars/person3.png"),
    require("../../../assets/avatars/person4.png"),
  ];

  const getImage = () => profilePics[Math.floor(Math.random() * (3 - 0) + 0)];

  const getAwardImage = (index: number) =>
    index === 0
      ? require("../../../assets/secondPlaceLeaderBoard.png")
      : index === 1
        ? require("../../../assets/firstPlaceLeaderboard.png")
        : require("../../../assets/thirdPlaceLeaderBoard.png");

  const getAwardImageStyle = (index: number) =>
    index === 1
      ? styleSheet.firstPlaceAwardImage
      : styleSheet.generalAwardImage;

  if (isLoading) {
    return <Loading colors={colors} />;
  }

  if (usersRanked.length === 0) {
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          ...styleSheet.view,
        }}
      >
        <Text variant="headlineLarge">Nothing here</Text>
      </View>
    );
  }

  return (
    <View style={styleSheet.view}>
      <View style={styleSheet.header}>
        <Text style={styleSheet.title}>Leaderboard</Text>
      </View>
      <View style={styleSheet.top3Section}>
        {top3.map((user, index) => (
          <View
            style={
              index === 1
                ? { ...styleSheet.firstPlace, ...styleSheet.generalPlace }
                : styleSheet.generalPlace
            }
            key={user.username}
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
            <Text style={styleSheet.top3Name}>{user.username}</Text>
          </View>
        ))}
      </View>

      <GestureHandlerRootView>
        <FlatList
          style={styleSheet.flatList}
          data={usersRanked.slice(3, usersRanked.length)}
          renderItem={({ item, index }) => <Item item={item} index={index} />}
          keyExtractor={(item) => `${item.username}`}
        />
      </GestureHandlerRootView>
    </View>
  );
}
