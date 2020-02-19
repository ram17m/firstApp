import { useState, useContext } from "react";
import { AsyncStorage } from "react-native";
import validate from "validate.js";
import { MediaContext } from "../contexts/MediaContext";
import { getUserMedia } from "./APIHooks";
const apiUrl = "http://media.mw.metropolia.fi/wbma/";

const constraints = {
  title: {
    presence: {
      message: "This field is required"
    },
    length: {
      minimum: 3,
      message: "Field must be atleast three characters"
    }
  }
};

const useModifyForm = props => {
  const [inputs, setInputs] = useState({});
  const [errors, setErrors] = useState({});
  const { media, setMedia, myMedia, setMyMedia } = useContext(MediaContext);

  const validateField = (attr, value) => {
    try {
      let fieldOK = true;
      console.log({ [attr]: value });
      const valResult = validate({ [attr]: value }, constraints);
      console.log("validateModify", valResult);
      let valid = undefined;
      if (valResult) {
        if (valResult[attr]) {
          valid = valResult[attr][0];
          fieldOK = false;
        }
      }
      setErrors(errors => ({
        ...errors,
        [attr]: valid
      }));
      return fieldOK;
    } catch (e) {
      console.log(e);
    }
  };

  const handleModifyTitleChange = text => {
    console.log("uploadTitleChangeDetected", text);
    setInputs(inputs => ({
      ...inputs,
      title: text
    }));
  };

  const handleModifyDescriptionChange = text => {
    console.log("uploadDesCh", text);
    setInputs(inputs => ({
      ...inputs,
      description: text
    }));
  };

  const handleModify = async (navigation, fileId) => {
    const token = await AsyncStorage.getItem("userToken");
    if (token !== null) {
      const data = {
        title: inputs.title,
        description: inputs.description
      };
      console.log("data", data);
      const fetchOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token
        },
        body: JSON.stringify(data)
      };
      const response = await fetch(apiUrl + "media/" + fileId, fetchOptions);
      const json = await response.json();
      console.log("upload result", json);
      if (json.message) {
        // upload successful
        const result = getUserMedia(token);
        setMyMedia(result);
        navigation.pop(2);
      }
      return json;
    } else {
      console.log("token is null");
    }
  };

  return {
    handleModifyTitleChange,
    handleModifyDescriptionChange,
    handleModify,
    validateField,
    inputs,
    setInputs,
    errors
  };
};

export default useModifyForm;
