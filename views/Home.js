import React from "react";
import { View } from "react-native";
import List from "../components/List.js";

const Home = props => {
  const { navigation } = props;
  return (
    <View>
      <List navigation={navigation} mode="all"></List>
    </View>
  );
};

export default Home;
