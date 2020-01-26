import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, AsyncStorage, Button } from "react-native";

const Profile = props => {
  const [user, setUser] = useState({});
  const signOutAsync = async () => {
    await AsyncStorage.clear();
    props.navigation.navigate("Auth");
  };
  const getUser = async () => {
    const userJSON = await AsyncStorage.getItem("user");
    console.log("userJSON", userJSON);
    const user = JSON.parse(userJSON);
    console.log("user", user);
    setUser(() => {
      return user;
    });
  };
  useEffect(() => {
    getUser();
  }, []);
  return (
    <View style={styles.container}>
      <Text>username: {user.username}</Text>
      <Text>Full Name: {user.full_name}</Text>
      <Text>Email: {user.email}</Text>
      <Button title="Logout!" onPress={signOutAsync} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 40
  }
});

export default Profile;
