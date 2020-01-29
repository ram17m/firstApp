import React, { useState } from "react";
import { AsyncStorage } from "react-native";
import PropTypes from "prop-types";
import { login, register } from "../hooks/APIHooks.js";
import FormTextInput from "../components/FormTextInupt.js";
import useSignUpForm from "../hooks/LoginHooks";
import {
  List,
  Text,
  Button,
  Title,
  Container,
  Form,
  Header,
  Item,
  Content
} from "native-base";

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
    <Container>
      <Header />
      <Content>
        <Form>
          <Title>
            <Text style={{ fontWeight: "bold" }}>Login</Text>
          </Title>
          <Item>
            <FormTextInput
              autoCapitalize="none"
              placeholder="username"
              handler={handleUsernameChange}
            />
          </Item>
          <Item last>
            <FormTextInput
              autoCapitalize="none"
              placeholder="password"
              secureTextEntry={true}
              handler={handlePasswordChange}
            />
          </Item>

          <Button
            full
            onPress={() => {
              signInAsync();
            }}
          >
            <Text>Sign in!</Text>
          </Button>
        </Form>
        <Form>
          <Title>
            <Text style={{ fontWeight: "bold" }}>Register</Text>
          </Title>
          <Item>
            <FormTextInput
              autoCapitalize="none"
              placeholder="username"
              onChangeText={handleUsernameChange}
            />
          </Item>
          <Item>
            <FormTextInput
              autoCapitalize="none"
              placeholder="email"
              onChangeText={handleEmailChange}
            />
          </Item>
          <Item>
            <FormTextInput
              autoCapitalize="none"
              placeholder="fullname"
              onChangeText={handleFullnameChange}
            />
          </Item>
          <Item last>
            <FormTextInput
              autoCapitalize="none"
              placeholder="password"
              onChangeText={handlePasswordChange}
            />
          </Item>
          <Button
            full
            onPress={() => {
              signInAsync();
            }}
          >
            <Text>Register!</Text>
          </Button>
        </Form>
      </Content>
    </Container>
  );
};

{
  /* const styles = StyleSheet.create({
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
}); */
}

// proptypes here
Login.propTypes = {
  navigation: PropTypes.object
};

export default Login;
