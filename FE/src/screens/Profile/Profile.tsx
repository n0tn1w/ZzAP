import { Text, useTheme, Avatar } from "react-native-paper";
import { styles } from "./Styles";
import { View, Image } from "react-native";
import images from "../../../assets";

interface User {
  name: string;
  score: number;
  rank: string;
}

export default function Profile() {
  const { colors } = useTheme();
  const styleSheet = styles(colors);

  const loggedUser: User = {
    name: "Daniel Johnson",
    score: 356,
    rank: "gold",
  };

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
            <Text style={styleSheet.name}>{loggedUser.name}</Text>
            <Text style={{ paddingRight: 5 }}>{loggedUser.score} pts</Text>
          </View>

          <Image
            source={images[loggedUser.rank]}
            style={styleSheet.divisionImage}
          />
        </View>

        <View style={styleSheet.lastPlayedContent}>
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
        </View>
      </View>
    </View>
  );
}
