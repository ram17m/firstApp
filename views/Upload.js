import React, { useState, useEffect } from "react";
import { Image } from "react-native";
import { Container, Content, Text, Form, Item, Button } from "native-base";
import * as ImagePicker from "expo-image-picker";
import FormTextInput from "../components/FormTextInupt";
import useUploadForm from "../hooks/UploadHooks";

const Upload = props => {
  const {
    handleUploadTitleChange,
    handleUploadDescriptionChange,
    handleUploadImageUri,
    handleUpload,
    validateField,
    reset,
    inputs,
    errors
  } = useUploadForm();

  useEffect(() => {
    console.log("hi");
  }, []);

  const uploadAsync = async () => {
    const titleOK = validateField("title", inputs.title);
    const descriptionOK = validateField("description", inputs.description);
    console.log("image", inputs.image);
    if (titleOK && descriptionOK && inputs.image) {
      try {
        handleUpload(props.navigation);
      } catch (e) {
        console.log(e.message);
      }
    } else {
      console.log("upload btn is not working!!");
    }
  };

  const _pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });

    console.log(result);

    if (!result.cancelled) {
      handleUploadImageUri(result.uri);
    }
  };

  return (
    <Container>
      <Content>
        <Form>
          <Text style={{ textAlign: "center", fontWeight: "bold" }}>
            Upload
          </Text>
          <Item>
            <FormTextInput
              value={inputs.title}
              placeholder="title"
              onChangeText={handleUploadTitleChange}
              onEndEditing={() => {
                validateField("title", inputs.title);
              }}
              error={errors.title}
            />
          </Item>
          <Item>
            <FormTextInput
              value={inputs.description}
              placeholder="description"
              onChangeText={handleUploadDescriptionChange}
              onEndEditing={() => {
                validateField("description", inputs.description);
              }}
              error={errors.description}
            />
          </Item>
          <Button full style={{ margin: 10 }} onPress={_pickImage}>
            <Text>Select</Text>
          </Button>
          <Button full style={{ margin: 10 }} onPress={reset}>
            <Text>Reset</Text>
          </Button>
          <Button full style={{ margin: 10 }} onPress={uploadAsync}>
            <Text>Upload</Text>
          </Button>
          {!!inputs.image && (
            <Image
              style={{ height: 300, width: null, flex: 1 }}
              source={{ uri: inputs.image }}
            />
          )}
        </Form>
      </Content>
    </Container>
  );
};

export default Upload;
