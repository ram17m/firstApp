import React, { useEffect, useState } from "react";
import { Image, Dimensions } from "react-native";
import {
  Container,
  Text,
  Content,
  Header,
  Card,
  Item,
  CardItem,
  Left,
  Icon,
  Body,
  List,
  Form,
  Input,
  Button
} from "native-base";
import { Video } from "expo-av";
import { getUser } from "../hooks/APIHooks";
import useCommentForm from "../components/post.js";
const mediaURL = "http://media.mw.metropolia.fi/wbma/uploads/";
const deviceHeight = Dimensions.get("window").height;
console.log("dh", deviceHeight);

const Single = props => {
  console.log("fileData", props.navigation.getParam("fileData"));
  const {
    title,
    filename,
    description,
    foodType,
    media_type,
    user_id
  } = props.navigation.getParam("fileData");
  const { navigation } = props;
  const file = navigation.state.params.fileData;

  const { inputs, handleCommentChange } = useCommentForm();
  console.log("media_type", media_type);
  const [owner, setOwner] = useState({});

  const getComments = id => {
    const [comments, setComments] = useState([]);
    const [commentsLoading, setCommentsLoading] = useState(true);
    const fetchComments = async id => {
      try {
        const comments = await fetchAPI("GET", "comments/file", id);

        await Promise.all(
          comments.map(async i => {
            const user = await fetchAPI("GET", "users", i.user_id, token);
            i.username = user.username;
          })
        );

        setComments(comments);
        setCommentsLoading(false);
        setLoading(false);
      } catch (e) {
        console.log("comments loading error ", e);
      }
    };
    useEffect(() => {
      fetchComments(id);
    }, []);
    return [comments, commentsLoading];
  };
  const [comments, commentsLoading] = getComments(file.file_id);
  const [c, setC] = useState([]);
  useEffect(() => {
    setC(comments);
  }, [commentsLoading]);

  const commentList = c.map(comment => {
    return (
      <ListItem key={comment.comment_id}>
        <Body>
          <Item style={{ borderColor: "transparent" }}>
            <Icon name="chatbubbles" />
            <Text>{comment.username}: </Text>
          </Item>
          <Text>{comment.comment}</Text>
        </Body>
      </ListItem>
    );
  });

  const postComment = async () => {
    try {
      const result = await fetchAPI("POST", "comments", undefined, token, {
        file_id: file.file_id,
        comment: inputs.comment
      });
      console.log("posting comment response", await result);
      setC(c => [
        ...c,
        {
          comment: inputs.comment,
          comment_id: result.comment_id,
          username: user.username
        }
      ]);
    } catch (e) {
      console.log("posting comment error", e);
    }
  };

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
          <Item>
            <Body>
              <CardItem>
                <Text>Comments </Text>
              </CardItem>
            </Body>
          </Item>
          <Item>
            <List>
              <Text>cc</Text>
              {commentList}
            </List>
          </Item>
          <Form>
            <Item>
              <Input
                placeholder="Write a comment"
                onChangeText={handleCommentChange}
                value={inputs.comment}
              />
              <Button
                primary
                rounded
                onPress={async () => {
                  if (inputs.comment !== "") {
                    handleCommentChange("");
                    await postComment();
                  }
                }}
              >
                <Icon name="md-send" />
              </Button>
            </Item>
          </Form>
        </Card>
      </Content>
    </Container>
  );
};

export default Single;
