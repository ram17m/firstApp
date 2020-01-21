import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity
} from "react-native";

const Header = props => {
  return (
    <View style={styles.headerContainer}>
      <Image
        //style={styles.headerImage}
        style={styles.headerImage}
        source={require("../assets/cat1.jpg")}
      />
      <Text style={styles.headerText}>Help me! I'm lost</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flex: 2
  },
  headerImage: {
    position: "absolute",
    width: "100%",
    height: 185
  },
  headerText: {
    flex: 1,
    fontSize: 19,
    fontWeight: "bold",
    position: "absolute",
    left: 20,
    top: 20,
    backgroundColor: "rgba(249, 194, 255, 0.1)",
    width: "28%",
    textAlign: "center",
    elevation: 2.5,
    color: "brown"
  }
});

export default Header;
