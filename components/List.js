import React from "react";
import { View, FlatList } from "react-native";
import ListItem from "./ListItem";

const List = props => {
  return (
    <View style={{ flex: 4.5 }}>
      <FlatList
        data={props.mediaArray}
        renderItem={({ item }) => {
          return <ListItem item={item} />;
        }}
      />
    </View>
  );
};

export default List;
