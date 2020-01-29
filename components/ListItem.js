import React from "react";
import { Image } from "react-native";
import {
  Container,
  Text,
  Header,
  Content,
  Icon,
  ListItem as BaseListItem,
  Button,
  Thumbnail
} from "native-base";

const mediaURL = "http://media.mw.metropolia.fi/wbma/uploads/";

const ListItem = props => {
  const fileData = props.item;
  console.log("listitem", fileData);
  return (
    <BaseListItem>
      <Thumbnail source={{ uri: mediaURL + props.item.filename }} />

      <Text>{props.item.title}</Text>
      <Text>{props.item.description}</Text>
      <Button
        onPress={() => props.navigation.push("Single", { fileData: fileData })}
      >
        <Text>View</Text>
      </Button>
    </BaseListItem>
  );
};

/* const styles = StyleSheet.create({
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
}); */

export default ListItem;
