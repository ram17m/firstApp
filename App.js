import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  StatusBar
} from "react-native";
import List from "./components/List";
import Header from "./components/Header.js";

const mediaArray = [
  {
    key: "0",
    title: "Leo",
    description:
      "Nibh ullamcorper, eget elementum lorem consectetur. Pellentesque eu consequat justo, eu sodales eros.",
    thumbnails: {
      w160: "http://placekitten.com/160/161"
    },
    filename: "http://placekitten.com/2048/1920"
  },
  {
    key: "1",
    title: "Bunny",
    description:
      "Pellentesque pulvinar sem nisl, ac vestibulum erat rhoncus id. Vestibulum tincidunt sapien eu ipsum tincidunt pulvinar. ",
    thumbnails: {
      w160: "http://placekitten.com/160/162"
    },
    filename: "http://placekitten.com/2041/1922"
  },
  {
    key: "2",
    title: "Alex",
    description:
      "Sed vehicula consequat facilisis. Pellentesque pulvinar sem nisl, ac vestibulum erat rhoncus id. ",
    thumbnails: {
      w160: "http://placekitten.com/160/163"
    },
    filename: "http://placekitten.com/2039/1920"
  }
];

const App = () => {
  return (
    <View style={styles.appContainer}>
      <StatusBar backgroundColor="blue" barStyle="light-content" />
      <Header />
      <List mediaArray={mediaArray} />
    </View>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: "rgb(59, 193, 7)"
  }
});

export default App;
