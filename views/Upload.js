import React, { useState, useEffect } from "react";
import { Content, Form, Button, Text, Item, Input } from "native-base";
import { AsyncStorage, Dimensions, Image } from "react-native";
import PropTypes from "prop-types";
import { fetchGET, fetchPOST } from "../hooks/APIHooks";

import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import useUploadForm from "../hooks/UploadHooks";
import FormTextInput from "../components/FormTextInupt";

const deviceHeight = Dimensions.get("window").height;

const Upload = props => {
  const [image, setImage] = useState(null);

  const {
    handleTitleChange,
    handleDescriptionChange,
    handleUpload,
    inputs
  } = useUploadForm();

  const getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };

  useEffect(() => {
    getPermissionAsync();
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.3,
      exif: true
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result);
    }
  };

  return (
    <Content>
      <Form>
        <Item>
          <Input
            placeholder="Title"
            onChangeText={handleTitleChange}
            value={inputs.title}
          />
        </Item>
        <Item>
          <Input
            placeholder="Description"
            onChangeText={handleDescriptionChange}
            value={inputs.description}
          />
        </Item>
        {image && (
          <Image
            source={{ uri: image.uri }}
            style={{ width: "100%", height: deviceHeight / 3 }}
          />
        )}
        <Button full onPress={pickImage}>
          <Text>Select file</Text>
        </Button>
        <Button dark full>
          <Text>Reset form</Text>
        </Button>
        <Button
          full
          onPress={() => {
            handleUpload(image, props.navigation);
          }}
        >
          <Text>Upload</Text>
        </Button>
      </Form>
    </Content>
  );
};

// proptypes here
Upload.propTypes = {
  navigation: PropTypes.object
};

export default Upload;
