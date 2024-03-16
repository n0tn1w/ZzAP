import { View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { styles } from "./Styles";
import { Avatar } from "react-native-paper";

export default function Profile() {
  const { colors } = useTheme();
  const styleSheet = styles(colors);

  const loggedUser = {
    name: "John",
    score: 356,
    rank: "diamond",
  };

  return (
    <View style={styleSheet.view}>
      <View style={styleSheet.profile}>
        <Avatar.Image
          source={require("../../assets/avatars/person1.png")}
          size={80}
          style={styleSheet.avatar}
        ></Avatar.Image>
        <Text>{loggedUser.name}</Text>
        <View style={styleSheet.pointsRank}>
          <Text style={{ paddingRight: 5 }}>{loggedUser.score} pts</Text>
          <Text>|</Text>
          <Text style={{ paddingLeft: 5 }}>rank {loggedUser.rank}</Text>
        </View>
      </View>
    </View>
  );
}
