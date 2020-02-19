import { AsyncStorage } from "react-native";

const apiUrl = "http://media.mw.metropolia.fi/wbma/";

const getAllMedia = async () => {
  console.log("getAllMedia");
  try {
    const response = await fetch(apiUrl + "media/all");
    const json = await response.json();
    const filesArray = json.files;
    filesArray.splice(5);
    // console.log(filesArray);
    // console.log('jsonResponseFromMediaAll', json);
    const result = await Promise.all(
      filesArray.map(async fileObject => {
        const response = await fetch(apiUrl + "media/" + fileObject.file_id);
        return await response.json();
      })
    );
    // console.log('resultAfterMapping', result);
    return result;
  } catch (e) {
    console.log("error msg from getAllMedia", e.message);
  }
};

const getUserMedia = async token => {
  try {
    const fetchOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token
      }
    };
    const response = await fetch(apiUrl + "media/user/", fetchOptions);
    const filesArray = await response.json();
    const result = await Promise.all(
      filesArray.map(async fileObject => {
        const response = await fetch(apiUrl + "media/" + fileObject.file_id);
        return await response.json();
      })
    );
    return result;
  } catch (e) {
    console.log("error msg from getUserMedia", e.message);
  }
};

const login = async data => {
  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  };
  try {
    const response = await fetch(apiUrl + "login", fetchOptions);
    const json = await response.json();
    return json;
  } catch (e) {
    console.log("error", e.message);
  }
};

const register = async data => {
  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  };
  try {
    const response = await fetch(apiUrl + "users", fetchOptions);
    const json = await response.json();
    console.log("registerResponse", json);
    return json;
  } catch (e) {
    console.log("error", e.message);
  }
};

const getAvatar = async userId => {
  try {
    const response = await fetch(apiUrl + "tags/avatar_" + userId);
    const json = await response.json();
    return json;
  } catch (e) {
    console.log("error", e.message);
  }
};

const usernameAvailable = async username => {
  try {
    const response = await fetch(apiUrl + "users/username/" + username);
    const json = await response.json();
    console.log(json.available);
    return json.available;
  } catch (e) {
    console.log("error", e.message);
  }
};

const getUser = async userId => {
  try {
    const token = await AsyncStorage.getItem("userToken");
    const fetchOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token
      }
    };
    const response = await fetch(apiUrl + "users/" + userId, fetchOptions);
    const json = await response.json();
    return json;
  } catch (e) {
    console.log("error", e.message);
  }
};

const getUserFiles = async userId => {
  try {
    const token = await AsyncStorage.getItem("userToken");
    const fetchOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token
      }
    };
    const response = await fetch(apiUrl + "media/user/" + userId, fetchOptions);
    const json = await response.json();
    return json;
  } catch (e) {
    console.log("error", e.message);
  }
};

const deleteFile = async fileId => {
  try {
    const token = await AsyncStorage.getItem("userToken");
    const fetchOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token
      }
    };
    const response = await fetch(apiUrl + "media/" + fileId, fetchOptions);
    const json = await response.json();
    return json;
  } catch (e) {
    console.log("err msg from deleteFile", e.message);
  }
};

export {
  getAllMedia,
  login,
  register,
  getAvatar,
  usernameAvailable,
  getUser,
  getUserFiles,
  getUserMedia,
  deleteFile
};
