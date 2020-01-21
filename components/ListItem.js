import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

const ListItem = props => {
  return (
    <TouchableOpacity>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={{ uri: props.item.thumbnails.w160 }}
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
    marginLeft: 10,
    marginRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#35CE8D",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    elevation: 10
  },
  details: {
    width: "30%",
    flex: 1,
    flexDirection: "column",
    padding: 5
  },
  image: {
    width: 100,
    height: 100,
    flexDirection: "row",
    margin: 10,
    borderRadius: 90
  },
  title: {
    flex: 1,
    fontWeight: "bold",
    color: "brown",
    fontFamily: "monospace",
    fontSize: 17,
    paddingTop: 8
  },
  description: {
    flex: 2,
    fontSize: 14,
    textAlign: "left",
    paddingTop: 14
  }
});

export default ListItem;
