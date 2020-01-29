import React from "react";
import { Image } from "react-native";
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
const mediaURL = "http://media.mw.metropolia.fi/wbma/uploads/";

const Single = props => {
  const { title, filename, description } = props.navigation.getParam(
    "fileData"
  );
  return (
    <Container>
      <Content>
        <Card>
          <CardItem style={{ margin: 20 }} cardBody>
            <Image
              style={{ height: 300, width: null, flex: 1 }}
              source={{ uri: mediaURL + filename }}
            />
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
        </Card>
      </Content>
    </Container>
  );
};
export default Single;
