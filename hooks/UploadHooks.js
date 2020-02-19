import { useState, useContext } from "react";
import { AsyncStorage } from "react-native";
import validate from "validate.js";
import { MediaContext } from "../contexts/MediaContext";
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
  },
  description: {
    presence: {
      message: "This field is required"
    },
    length: {
      minimum: 5,
      message: "Field must be atleast five characters"
    }
  }
};

const useUploadForm = props => {
  const [inputs, setInputs] = useState({});
  const [errors, setErrors] = useState({});
  const { media, setMedia } = useContext(MediaContext);

  const validateField = (attr, value) => {
    try {
      let fieldOK = true;
      const valResult = validate({ [attr]: value }, constraints);
      console.log("validateU", valResult);
      let valid = undefined;
      if (valResult[attr]) {
        valid = valResult[attr][0];
        fieldOK = false;
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

  const reset = () => {
    setInputs(inputs => ({
      ...inputs,
      title: "",
      description: "",
      image: ""
    }));
    setErrors(errors => ({
      ...errors,
      title: undefined,
      description: undefined
    }));
  };

  const handleUploadTitleChange = text => {
    console.log("uploadTitleChangeDetected", text);
    setInputs(inputs => ({
      ...inputs,
      title: text
    }));
  };

  const handleUploadDescriptionChange = text => {
    console.log("uploadDesCh", text);
    setInputs(inputs => ({
      ...inputs,
      description: text
    }));
  };

  const handleUploadImageUri = localUri => {
    console.log("uploadImgUri", localUri);
    setInputs(inputs => ({
      ...inputs,
      image: localUri
    }));
  };

  const handleUpload = async navigation => {
    const localUri = inputs.image;
    // ImagePicker saves the taken photo to disk and returns a local URI to it
    const filename = localUri.split("/").pop();

    // Infer the type of the image
    const match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;

    // fix jpg mimetype
    if (type === "image/jpg") {
      type = "image/jpeg";
    }

    const token = await AsyncStorage.getItem("userToken");
    if (token !== null) {
      // Upload the image using the fetch and FormData APIs
      const formData = new FormData();
      // Assume "photo" is the name of the form field the server expects
      formData.append("file", { uri: localUri, name: filename, type });
      formData.append("title", inputs.title);
      formData.append("description", inputs.description);

      const fetchOptions = {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
          "x-access-token": token
        },
        body: formData
      };
      const response = await fetch(apiUrl + "media", fetchOptions);
      const json = await response.json();
      console.log("upload result", json);
      if (json.file_id) {
        // upload successful
        const response = await fetch(apiUrl + "media/all");
        const json = await response.json();
        console.log("apihooks", json);
        const result = await Promise.all(
          json.files.map(async item => {
            const response = await fetch(apiUrl + "media/" + item.file_id);
            return await response.json();
          })
        );
        setMedia(result);
        navigation.push("Home");
      }
      return json;
    } else {
      console.log("token is null");
    }
  };

  return {
    handleUploadTitleChange,
    handleUploadDescriptionChange,
    handleUploadImageUri,
    handleUpload,
    validateField,
    reset,
    inputs,
    errors
  };
};

export default useUploadForm;
