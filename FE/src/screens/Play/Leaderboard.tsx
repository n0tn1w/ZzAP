import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { styles } from "../Leaderboards/Styles";
import { useAuth } from "../../contexts/AuthContext";
import useAxios from "../../utils/useAxios";
import { StackScreenProps } from "@react-navigation/stack";
import { PublicStackProps } from "./Play";

type LeaderboardEntity = {
  username: string;
  score: number;
  division: string;
  time: number;
};

export default function Leaderboard({ id }: { id: number }) {
  const { colors } = useTheme();
  const { user } = useAuth();
  const axios = useAxios(true);
  const [usersRanked, setUsersRanked] = useState<LeaderboardEntity[]>([]);
  const styleSheet = styles(colors);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get<LeaderboardEntity[]>(`/rankings/${id}`);
        res.data.sort((a, b) => a.time - b.time);
        setUsersRanked(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetch();
  }, []);

  const Item = ({ item, index }: any) => {
    console.log(item.username);

    return (
      <View
        style={[
          styleSheet.row,
          item.username === user?.username ? styleSheet.myRank : null,
        ]}
      >
        <Text style={styleSheet.rankNumber}>{index + 1}</Text>
        <Text style={styleSheet.name}>{item.username}</Text>
        <Text>{item.score}</Text>
      </View>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
    >
      <FlatList
        style={styleSheet.flatList}
        data={usersRanked}
        renderItem={({ item, index }) => <Item item={item} index={index} />}
        keyExtractor={(item) => `${item.username}`}
      />
    </View>
  );
}
