import { useState, useEffect } from "react";

const apiUrl = "http://media.mw.metropolia.fi/wbma/";

const getAllMedia = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUrl = async () => {
    try {
      const response = await fetch(apiUrl + "media/all");
      const json = await response.json();
      console.log("apihooks", json);
      const result = await Promise.all(
        json.files.map(async item => {
          const response = await fetch(apiUrl + "media/" + item.file_id);
          return await response.json();
        })
      );
      setData(result);
      setLoading(false);
    } catch (e) {
      console.log("error", e.message);
    }
  };

  useEffect(() => {
    fetchUrl();
  }, []);
  return [data, loading];
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

export { getAllMedia, login, register, getAvatar, usernameAvailable };
