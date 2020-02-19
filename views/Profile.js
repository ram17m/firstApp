import React, { useState, useEffect } from "react";
import { getAvatar } from "../hooks/APIHooks.js";
import { StyleSheet, Image, AsyncStorage } from "react-native";
import {
  Container,
  Text,
  Content,
  Header,
  Card,
  CardItem,
  Left,
  Icon,
  Body,
  Button
} from "native-base";

const mediaURL = "http://media.mw.metropolia.fi/wbma/uploads/";

const Profile = props => {
  const [user, setUser] = useState({});
  const signOutAsync = async () => {
    await AsyncStorage.clear();
    props.navigation.navigate("Auth");
  };
  const getUser = async () => {
    const userJSON = await AsyncStorage.getItem("user");
    console.log("userJSON", userJSON);
    const user = JSON.parse(userJSON);
    console.log("user", user);
    const tagArray = await getAvatar(user.user_id);
    console.log(tagArray);
    if (tagArray.length > 0) {
      user.avatarFilename = tagArray[0].filename;
    }
    console.log("newUser", user);
    setUser(() => {
      return user;
    });
  };
  useEffect(() => {
    getUser();
  }, []);
  return (
    <Container>
      <Content>
        <Card>
          <CardItem>
            <Left>
              <Icon name="person" />
              <Text>Username: {user.username}</Text>
            </Left>
          </CardItem>
          <CardItem style={{ margin: 20 }} cardBody>
            {user.avatarFilename && (
              <Image
                style={{ height: 300, width: null, flex: 1 }}
                source={{ uri: mediaURL + user.avatarFilename }}
              />
            )}
          </CardItem>
          <CardItem>
            <Body>
              <Text>Fullname: {user.full_name}</Text>
              <Text>Email: {user.email}</Text>
            </Body>
          </CardItem>
          <Button
            full
            style={{ margin: 10 }}
            onPress={() => {
              console.log("myFiles btn pressed");
              props.navigation.navigate("MyFiles");
            }}
          >
            <Text>My Files</Text>
          </Button>
          <Button
            full
            style={{ margin: 10 }}
            onPress={() => {
              signOutAsync();
            }}
          >
            <Text>Logout</Text>
          </Button>
        </Card>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 40
  }
});

export default Profile;
