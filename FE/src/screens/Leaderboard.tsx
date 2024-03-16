import React from "react";
import { Text } from "react-native-paper";
import { View } from "react-native";
import { DataTable } from "react-native-paper";
import { Avatar } from "react-native-paper";
import CrownIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { Image } from "react-native";
import Styles from "./Styles";

export default function Leaderboard() {
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
  ]);

  const from = 3;
  const to = items.length;

  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  return (
    <>
      <View style={Styles.container}>
        <Text style={{ fontSize: 30, fontWeight: "bold" }}>Top 3</Text>
        <View style={Styles.top3Container}>
          <View>
            <Image
              source={require("../../assets/silver-medal.png")}
              style={Styles.medalionImage}
            />
            <Avatar.Text size={64} label="1" />
          </View>
          <View>
            <Image
              source={require("../../assets/gold-medal.png")}
              style={Styles.medalionImage}
            />
            <Avatar.Text size={64} label="1" />
          </View>
          <View>
            <Image
              source={require("../../assets/bronze-medal.png")}
              style={Styles.medalionImage}
            />
            <Avatar.Text size={64} label="1" />
          </View>
        </View>
      </View>
      <View
        style={[
          {
            flex: 1,
            justifyContent: "flex-end",
            alignItems: "center",
          },
        ]}
      >
        {items.length < 3 ? (
          <Text>No table</Text>
        ) : (
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Username</DataTable.Title>
              <DataTable.Title numeric>Time</DataTable.Title>
              <DataTable.Title numeric>Score</DataTable.Title>
            </DataTable.Header>

            {items.slice(from, to).map((item) => (
              <DataTable.Row key={item.key}>
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
    </>
  );
}
