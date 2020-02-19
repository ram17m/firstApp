import React, { useState, useEffect } from "react";
import {
  Container,
  Content,
  Text,
  Form,
  Item,
  Button,
  Badge
} from "native-base";
import FormTextInput from "../components/FormTextInupt";
import useModifyForm from "../hooks/ModifyHooks";

const Modify = props => {
  const {
    handleModifyTitleChange,
    handleModifyDescriptionChange,
    handleModify,
    validateField,
    inputs,
    setInputs,
    errors
  } = useModifyForm();

  useEffect(() => {
    console.log("hi from modify component");
    console.log(props);
    setInputs(inputs => ({
      ...inputs,
      title: props.navigation.state.params.fileData.title,
      description: props.navigation.state.params.fileData.description
    }));
  }, []);

  const modifyAsync = async () => {
    const titleOK = validateField("title", inputs.title);
    if (titleOK) {
      try {
        handleModify(
          props.navigation,
          props.navigation.state.params.fileData.file_id
        );
      } catch (e) {
        console.log(e.message);
      }
    } else {
      console.log("send btn is not working!!");
    }
  };

  return (
    <Container>
      <Content>
        <Form>
          <Text style={{ textAlign: "center", fontWeight: "bold" }}>
            Modify
          </Text>
          <Item>
            <FormTextInput
              value={inputs.title}
              placeholder="title"
              onChangeText={handleModifyTitleChange}
            />
          </Item>
          <Item>
            <FormTextInput
              value={inputs.description}
              placeholder="description"
              onChangeText={handleModifyDescriptionChange}
            />
          </Item>
          <Button full style={{ margin: 10 }} onPress={modifyAsync}>
            <Text>Send</Text>
          </Button>
          {errors.title && (
            <Badge style={{ width: "100%" }}>
              <Text>Title cannot be less than three characters!!</Text>
            </Badge>
          )}
        </Form>
      </Content>
    </Container>
  );
};

export default Modify;
