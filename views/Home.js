import React from "react";
import { View } from "react-native";
import List from "../components/List.js";
import PropTypes from "prop-types";

const Home = props => {
  const { navigation } = props;
  return (
    <View>
      <List navigation={navigation} mode="all"></List>
    </View>
  );
};
Home.propTypes = {
  navigation: PropTypes.object
};

export default Home;
