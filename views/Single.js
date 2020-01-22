import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";

const mediaURL = "http://media.mw.metropolia.fi/wbma/uploads/";

const Single = props => {
  const { title, filename } = props.navigation.getParam("fileData");
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Image style={styles.image} source={{ uri: mediaURL + filename }} />
      {/* <Text>
        Props Received : {JSON.stringify(props.navigation.getParam('fileData'))}
      </Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 40
  },
  image: {
    flex: 2,
    width: "100%",
    margin: 10
  },
  title: {
    fontWeight: "bold"
  }
});

export default Single;
