import React from "react";
import {
  Card,
  CardItem,
  Left,
  Thumbnail,
  Body,
  Text,
  Right,
  Button
} from "native-base";

const mediaURL = "http://media.mw.metropolia.fi/wbma/uploads/";

const ListItem = props => {
  const fileData = props.item;
  return (
    <Card>
      <CardItem>
        <Left>
          <Thumbnail square source={{ uri: mediaURL + props.item.filename }} />
          <Body>
            <Text numberOfLines={1}>{props.item.title}</Text>
            <Text note numberOfLines={1}>
              {props.item.description}
            </Text>
          </Body>
        </Left>
        <Right>
          <Button
            primary
            onPress={() =>
              props.navigation.push("Single", { fileData: fileData })
            }
          >
            <Text>View</Text>
          </Button>
        </Right>
      </CardItem>
    </Card>
  );
};

export default ListItem;
