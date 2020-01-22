import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

const mediaURL = "http://media.mw.metropolia.fi/wbma/uploads/";

const ListItem = props => {
  const fileData = props.item;
  return (
    <TouchableOpacity
      onPress={() => props.navigation.push("Single", { fileData: fileData })}
    >
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={{ uri: mediaURL + props.item.filename }}
        />
        <View style={styles.details}>
          <Text style={styles.title}>{props.item.title}</Text>
          <Text style={styles.description}>{props.item.description}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    paddingTop: 10,
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#f9c2ff",
    alignItems: "center",
    justifyContent: "center"
  },
  details: {
    width: "45%",
    flex: 1,
    flexDirection: "column",
    padding: 10
  },
  image: {
    width: "20%",
    height: 200,
    flex: 1,
    flexDirection: "row",
    margin: 10
  },
  title: {
    fontWeight: "bold"
  },
  description: {
    fontSize: 11
  }
});

export default ListItem;
