import React from "react";
import { Text, useTheme } from "react-native-paper";
import { View } from "react-native";
import { DataTable } from "react-native-paper";
import { Avatar } from "react-native-paper";
import CrownIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { Image } from "react-native";
import { styles } from "./Styles";
import { Scroll } from "@tamagui/lucide-icons";
import { ScrollView } from "react-native-gesture-handler";

export default function Leaderboard() {
  const { colors } = useTheme();
  const [page, setPage] = React.useState<number>(0);
  const [numberOfItemsPerPageList] = React.useState([2, 3, 4]);
  const [itemsPerPage, onItemsPerPageChange] = React.useState(
    numberOfItemsPerPageList[0]
  );

  const [items] = React.useState([
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
      name: "Alex",
      time: 305,
      score: 3.7,
    },
    {
      key: 5,
      name: "Mason",
      time: 305,
      score: 3.7,
    },
    {
      key: 6,
      name: "Mason",
      time: 305,
      score: 3.7,
    },
    {
      key: 7,
      name: "Mason",
      time: 305,
      score: 3.7,
    },
    {
      key: 8,
      name: "Mason",
      time: 305,
      score: 3.7,
    },
    {
      key: 9,
      name: "Mason",
      time: 305,
      score: 3.7,
    },
    {
      key: 10,
      name: "Mason",
      time: 305,
      score: 3.7,
    },
    {
      key: 11,
      name: "Mason",
      time: 305,
      score: 3.7,
    },
    {
      key: 12,
      name: "Mason",
      time: 305,
      score: 3.7,
    },
    {
      key: 13,
      name: "Mason",
      time: 305,
      score: 3.7,
    },
    {
      key: 14,
      name: "AAAAA",
      time: 305,
      score: 3.7,
    },
  ]);

  const from = 3;
  const to = items.length;

  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  const styleSheet = styles(colors);

  return (
    <View style={{ flex: 1, backgroundColor: colors.primaryContainer }}>
      <View style={styleSheet.top3Container}>
        <View
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
          <Avatar.Text size={64} label="1" style={styleSheet.avatarContainer} />
        </View>
        <View
          onTouchStart={() => console.log("touch 1st")}
          style={{ ...styleSheet.placesContainer, paddingBottom: 20 }}
        >
          <Image
            source={require("../../assets/firstPlaceLeaderboard.png")}
            style={styleSheet.medalionImage}
          />
          <Avatar.Text size={76} label="1" style={styleSheet.avatarContainer} />
        </View>
        <View
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
          <Avatar.Text size={64} label="1" style={styleSheet.avatarContainer} />
        </View>
      </View>
      <View>
        {items.length < 3 ? (
          <Text>No table</Text>
        ) : (
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Username</DataTable.Title>
              <DataTable.Title numeric>Score</DataTable.Title>
              <DataTable.Title numeric>Division</DataTable.Title>
            </DataTable.Header>

            {items.slice(from, to).map((item) => (
              <DataTable.Row
                onPress={() => console.log(item.name)}
                key={item.key}
              >
                <DataTable.Cell>{item.name}</DataTable.Cell>
                <DataTable.Cell numeric>{item.time}</DataTable.Cell>
                <DataTable.Cell numeric>{item.score}</DataTable.Cell>
              </DataTable.Row>
            ))}

            {/* <DataTable.Pagination
          page={page}
          numberOfPages={Math.ceil(items.length / itemsPerPage)}
          onPageChange={(page) => setPage(page)}
          label={`${from + 1}-${to} of ${items.length}`}
          numberOfItemsPerPageList={numberOfItemsPerPageList}
          numberOfItemsPerPage={itemsPerPage}
          onItemsPerPageChange={onItemsPerPageChange}
          showFastPaginationControls
          selectPageDropdownLabel={"Rows per page"}
        /> */}
          </DataTable>
        )}
      </View>
    </View>
  );
}
