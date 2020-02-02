import React from "react";
import { Content, Item, Input, Badge, Text } from "native-base";
import propTypes from "prop-types";

const FormTextInput = props => {
  const { error, ...otherProps } = props;
  return (
    <Content>
      <Item>
        <Input {...otherProps} />
      </Item>
      {error && (
        <Badge style={{ width: "100%" }}>
          <Text>{error}</Text>
        </Badge>
      )}
    </Content>
  );
};

FormTextInput.propTypes = {
  style: propTypes.object
};

export default FormTextInput;
