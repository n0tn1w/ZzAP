import { Text, useTheme, Avatar, Button } from "react-native-paper";
import { styles } from "./Styles";
import { View, Image } from "react-native";
import images from "../../../assets";
import React, { useEffect, useState } from "react";
import useAxios from "../../utils/useAxios";
import Loading from "../../components/Loading";
import { useAuth } from "../../contexts/AuthContext";

interface Profile {
  id: string;
  username: string;
  score: number;
  division: string;
}

export default function Profile() {
  const { colors } = useTheme();
  const styleSheet = styles(colors);

  const [profile, setProfile] = useState<Profile | null>(null);

  const axios = useAxios(true);
  const { logout } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchMe = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get<Profile>("/me");
        setProfile(res.data);
      } catch (error) {
        // TODO
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMe();
  }, []);

  if (isLoading) {
    return <Loading colors={colors} />;
  }

  if (profile == null) {
    return (
      <View
        style={{
          alignContent: "center",
          alignItems: "center",
          ...styleSheet.view,
        }}
      >
        <Text variant="headlineLarge">Something unexpected happened</Text>
      </View>
    );
  }

  const rankPath = (() => {
    switch (profile.division) {
      case "bronze":
        return require("../../../assets/division-bronze.png");
      case "silver":
        return require("../../../assets/division-silver.png");
      case "gold":
        return require("../../../assets/division-gold.png");
      default:
        return require("../../../assets/division-bronze.png");
    }
  })();

  return (
    <View style={styleSheet.view}>
      <View style={styleSheet.header}>
        <Text style={styleSheet.title}>Profile</Text>
      </View>
      <View style={styleSheet.content}>
        <View style={styleSheet.profileCard}>
          <Avatar.Image
            source={require("../../../assets/avatars/person1.png")}
            size={100}
            style={styleSheet.avatar}
          />

          <View style={styleSheet.infoBox}>
            <Text style={styleSheet.name}>{profile.username}</Text>
            <Text style={{ paddingRight: 5 }}>{profile.score} pts</Text>
          </View>

          <Image source={rankPath} style={styleSheet.divisionImage} />
        </View>

        {/* <View style={styleSheet.lastPlayedContent}>
          <Text style={styleSheet.lastPlayedTitle}>Last played challenges</Text>
          <View style={styleSheet.lastPlayedItem}>
            <Text style={styleSheet.lastPlayedLabel}>Challenge 1</Text>
            <Text style={styleSheet.lastPlayedPoints}>200</Text>
          </View>
          <View style={styleSheet.lastPlayedItem}>
            <Text style={styleSheet.lastPlayedLabel}>Challenge 2</Text>
            <Text style={styleSheet.lastPlayedPoints}>50</Text>
          </View>
          <View style={styleSheet.lastPlayedItem}>
            <Text style={styleSheet.lastPlayedLabel}>Challenge 3</Text>
            <Text style={styleSheet.lastPlayedPoints}>100</Text>
          </View>
        </View> */}

        <Button
          mode="outlined"
          onPress={logout}
          style={{
            marginTop: 20,
          }}
        >
          <Text>Sign out</Text>
        </Button>
      </View>
    </View>
  );
}
