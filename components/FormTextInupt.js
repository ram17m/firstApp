import React from "react";
import { StyleSheet, TextInput } from "react-native";
import propTypes from "prop-types";

const FormTextInput = props => {
  const { style, ...otherProps } = props;
  return (
    <TextInput
      onChangeText={props.handler}
      value={props.value}
      {...otherProps}
    />
  );
};

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1
  }
});

FormTextInput.propTypes = {
  style: propTypes.object
};

export default FormTextInput;
