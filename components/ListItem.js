import React from "react";
import {
  Card,
  CardItem,
  Left,
  Thumbnail,
  Body,
  Text,
  Right,
  Button,
  Icon
} from "native-base";
import PropTypes from "prop-types";
import { deleteFile } from "../hooks/APIHooks";

const mediaURL = "http://media.mw.metropolia.fi/wbma/uploads/";

const ListItem = props => {
  return (
    <Card>
      <CardItem>
        <Left>
          <Thumbnail
            square
            source={{ uri: mediaURL + props.singleMedia.thumbnails.w160 }}
          />
          <Body>
            <Text numberOfLines={1}>Title:{props.singleMedia.title}</Text>
            <Text note numberOfLines={1}>
              {props.singleMedia.description.FoodType}
            </Text>
            <Text numberOfLines={1}>Comment:{props.singleMedia.tag}</Text>
            <Text numberOfLines={1}>Rating:{props.singleMedia.rating}</Text>
          </Body>
        </Left>
        <Right>
          <Button
            primary
            onPress={() =>
              props.navigation.push("Single", { fileData: props.singleMedia })
            }
          >
            <Icon name="eye" />
          </Button>
          {props.mode === "myFiles" && (
            <>
              <Button
                warning
                onPress={() =>
                  props.navigation.push("Modify", {
                    fileData: props.singleMedia
                  })
                }
              >
                <Icon name="create" />
              </Button>
              <Button
                danger
                onPress={async () => {
                  const del = await deleteFile(props.singleMedia.file_id);
                  if (del.message) {
                    props.getMedia();
                  }
                }}
              >
                <Icon name="trash" />
              </Button>
            </>
          )}
        </Right>
      </CardItem>
    </Card>
  );
};

ListItem.propTypes = {
  singleMedia: PropTypes.object,
  navigation: PropTypes.object,
  mode: PropTypes.string,
  getMedia: PropTypes.func
};

export default ListItem;
