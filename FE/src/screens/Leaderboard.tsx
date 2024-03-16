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
  const to = items.length;

  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  const styleSheet = styles(colors);

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
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
          <Avatar.Text size={64} label="2" style={styleSheet.avatarContainer} />
          {items[1] == null ? (
            <Text>No Data</Text>
          ) : (
            <Text>{items[1].name}</Text>
          )}
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
          {items[0] == null ? (
            <Text>No Data</Text>
          ) : (
            <Text>{items[0].name}</Text>
          )}
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
          <Avatar.Text size={64} label="3" style={styleSheet.avatarContainer} />
          {items[2] == null ? (
            <Text>No Data</Text>
          ) : (
            <Text>{items[2].name}</Text>
          )}
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
