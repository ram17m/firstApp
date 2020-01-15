import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

const mediaURL = "http://media.mw.metropolia.fi/wbma/uploads/";

const ListItem = props => {
  return (
    <TouchableOpacity>
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
    backgroundColor: "grey",
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
    fontSize: 12
  }
});

export default ListItem;
