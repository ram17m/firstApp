import React, { useState } from "react";
import { StyleSheet, View, Text, Button, AsyncStorage } from "react-native";
import PropTypes from "prop-types";
import { login, register } from "../hooks/APIHooks.js";
import FormTextInput from "../components/FormTextInupt.js";
import useSignUpForm from "../hooks/LoginHooks";

const Login = props => {
  const [error, setError] = useState("");
  //props is needed for navigation
  const {
    handleUsernameChange,
    handlePasswordChange,
    handleEmailChange,
    handleFullnameChange,
    inputs
  } = useSignUpForm();
  const signInAsync = async () => {
    try {
      const user = await login({
        username: inputs.username,
        password: inputs.password
      });
      console.log("Login", user.token);
      await AsyncStorage.setItem("userToken", user.token);
      await AsyncStorage.setItem("user", JSON.stringify(user.user));
      props.navigation.navigate("App");
    } catch (e) {
      console.log(e.message);
    }
  };
  const registerAsync = async () => {
    try {
      const result = await register({
        username: inputs.username,
        password: inputs.password,
        email: inputs.email,
        full_name: inputs.fullname
      });
      console.log(result);
      if (result.error) {
        setError(result.error);
      }
      signInAsync();
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text>Login</Text>
        <View>
          <FormTextInput
            autoCapitalize="none"
            placeholder="username"
            handler={handleUsernameChange}
          />
          <FormTextInput
            autoCapitalize="none"
            placeholder="password"
            secureTextEntry={true}
            handler={handlePasswordChange}
          />
          <Button
            title="Sign in"
            onPress={() => {
              signInAsync();
            }}
          />
        </View>
      </View>
      <View style={styles.form}>
        <Text>Register</Text>
        <View>
          <FormTextInput
            autoCapitalize="none"
            placeholder="username"
            onChangeText={handleUsernameChange}
          />
          <FormTextInput
            autoCapitalize="none"
            placeholder="email"
            onChangeText={handleEmailChange}
          />
          <FormTextInput
            autoCapitalize="none"
            placeholder="fullname"
            onChangeText={handleFullnameChange}
          />
          <FormTextInput
            autoCapitalize="none"
            placeholder="password"
            onChangeText={handlePasswordChange}
          />
          <Button
            title="Sign in"
            onPress={() => {
              registerAsync();
            }}
          />
          <Text>{error}</Text>
        </View>
      </View>
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
  },
  form: {
    padding: 20
  }
});

// proptypes here
Login.propTypes = {
  navigation: PropTypes.object
};

export default Login;
