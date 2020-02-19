import React from "react";
import { View } from "react-native";
import List from "../components/List.js";
import PropTypes from "prop-types";

const MyFiles = props => {
  const { navigation } = props;

  return (
    <View>
      <List navigation={navigation} mode="myFiles"></List>
    </View>
  );
};

MyFiles.propTypes = {
  navigation: PropTypes.object
};

export default MyFiles;
