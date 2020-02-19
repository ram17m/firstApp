import React, { useEffect, useState } from "react";
import { Image, Dimensions } from "react-native";
import {
  Container,
  Text,
  Content,
  Header,
  Card,
  CardItem,
  Left,
  Icon,
  Body
} from "native-base";
import { Video } from "expo-av";
import { getUser } from "../hooks/APIHooks";
const mediaURL = "http://media.mw.metropolia.fi/wbma/uploads/";
const deviceHeight = Dimensions.get("window").height;
console.log("dh", deviceHeight);

const Single = props => {
  console.log("fileData", props.navigation.getParam("fileData"));
  const {
    title,
    filename,
    description,
    media_type,
    user_id
  } = props.navigation.getParam("fileData");
  console.log("media_type", media_type);
  const [owner, setOwner] = useState({});

  const getOwner = async () => {
    const data = await getUser(user_id);
    setOwner(data);
    console.log("userData", data);
  };

  useEffect(() => {
    getOwner();
  }, []);
  return (
    <Container>
      <Content>
        <Card>
          <CardItem style={{ margin: 20 }} cardBody>
            {media_type === "image" && (
              <Image
                style={{ height: 300, width: null, flex: 1 }}
                source={{ uri: mediaURL + filename }}
              />
            )}
            {media_type === "video" && (
              <Video
                source={{ uri: mediaURL + filename }}
                rate={1.0}
                volume={1.0}
                isMuted={false}
                resizeMode="contain"
                shouldPlay
                isLooping
                useNativeControls
                style={{ width: "100%", height: deviceHeight / 2 }}
              />
            )}
          </CardItem>
          <CardItem>
            <Left>
              <Icon name="image" />
              <Body>
                <Text>{title}</Text>
                <Text>{description}</Text>
              </Body>
            </Left>
          </CardItem>
          <CardItem>
            <Left>
              <Icon name="person" />
              <Body>
                <Text>
                  By {owner.username} ({owner.email})
                </Text>
                {owner.full_name && <Text>{owner.full_name}</Text>}
              </Body>
            </Left>
          </CardItem>
        </Card>
      </Content>
    </Container>
  );
};

export default Single;
