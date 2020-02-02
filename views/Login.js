import React, { useState } from "react";
import { AsyncStorage } from "react-native";
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Button,
  Text,
  Title,
  Badge
} from "native-base";
import PropTypes from "prop-types";
import { login, register, usernameAvailable } from "../hooks/APIHooks.js";
import useSignUpForm from "../hooks/LoginHooks";
import FormTextInput from "../components/FormTextInupt.js";

const Login = props => {
  const [error, setError] = useState("");
  const [toggleForm, setToggleForm] = useState(true);
  // props is needed for navigation
  const {
    handleUsernameChange,
    handlePasswordChange,
    handleEmailChange,
    handleFullnameChange,
    handleConfirmPasswordChange,
    validateField,
    validatePassword,
    inputs,
    errors,
    setErrors
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
    const usernameOK = validateField("username", inputs.username);
    const emailOK = validateField("email", inputs.email);
    const passwordOK = validateField("password", inputs.password);
    const passwordMatch = validatePassword(
      "password",
      inputs.password,
      "confirmPassword",
      inputs.confirmPassword
    );
    const usernameFree = await usernameAvailable(inputs.username);
    console.log("errorsFromRegisterAsync", errors);
    console.log("userNameAvailable", usernameFree);
    console.log("usernameOK", usernameOK);
    console.log("emailOK", emailOK);
    console.log("passwordOK", passwordOK);
    console.log("passwordMatch", passwordMatch);
    if (usernameOK && emailOK && passwordOK && passwordMatch && usernameFree) {
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
    } else {
      console.log("reg btn not working");
    }
  };

  const checkUserNameAsync = async username => {
    try {
      const usernamePresent = await usernameAvailable(username);
      console.log("usernamePresent", usernamePresent);
      setError(!usernamePresent ? "username already exists" : "");
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <Container>
      {toggleForm ? (
        <Container>
          <Header />
          <Content>
            <Form>
              <Title>
                <Text style={{ fontWeight: "bold" }}>Login</Text>
              </Title>
              <Item error>
                <Input
                  placeholder="username"
                  autoCapitalize="none"
                  onChangeText={handleUsernameChange}
                />
              </Item>
              <Item last>
                <Input
                  placeholder="password"
                  autoCapitalize="none"
                  secureTextEntry={true}
                  onChangeText={handlePasswordChange}
                />
              </Item>
              <Button
                full
                style={{ margin: 10 }}
                onPress={() => {
                  signInAsync();
                }}
              >
                <Text>Sign in!</Text>
              </Button>
              <Button
                style={{ margin: 10 }}
                dark
                full
                onPress={() => {
                  setToggleForm(false);
                }}
              >
                <Text>or Register</Text>
              </Button>
            </Form>
          </Content>
        </Container>
      ) : (
        <Container>
          <Header />
          <Content>
            <Form>
              <Title>
                <Text style={{ fontWeight: "bold" }}>Register</Text>
              </Title>
              <Item>
                <FormTextInput
                  autoCapitalize="none"
                  value={inputs.username}
                  placeholder="username"
                  onChangeText={handleUsernameChange}
                  onEndEditing={async evt => {
                    console.log("errorString", error);
                    const usernameFree = await usernameAvailable(
                      inputs.username
                    );
                    if (usernameFree) {
                      setErrors(errors => ({
                        ...errors,
                        usernameFree: undefined
                      }));
                    } else {
                      setErrors(errors => ({
                        ...errors,
                        usernameFree: "username not available"
                      }));
                    }
                    checkUserNameAsync(evt);
                    validateField("username", inputs.username);
                  }}
                  error={errors.username}
                />
              </Item>
              <Item>
                <FormTextInput
                  placeholder="email"
                  autoCapitalize="none"
                  onChangeText={handleEmailChange}
                  onEndEditing={evt => {
                    validateField("email", inputs.email);
                  }}
                  error={errors.email}
                />
              </Item>
              <Item>
                <Input
                  placeholder="fullname"
                  autoCapitalize="none"
                  onChangeText={handleFullnameChange}
                />
              </Item>
              <Item>
                <FormTextInput
                  placeholder="password"
                  autoCapitalize="none"
                  secureTextEntry={true}
                  onChangeText={handlePasswordChange}
                  onEndEditing={evt => {
                    validateField("password", inputs.password);
                    validatePassword(
                      "password",
                      inputs.password,
                      "confirmPassword",
                      inputs.confirmPassword
                    );
                  }}
                  error={errors.password}
                />
              </Item>
              <Item>
                <FormTextInput
                  placeholder="confirm password"
                  autoCapitalize="none"
                  secureTextEntry={true}
                  onChangeText={handleConfirmPasswordChange}
                  onEndEditing={evt => {
                    // do something
                    validatePassword(
                      "password",
                      inputs.password,
                      "confirmPassword",
                      inputs.confirmPassword
                    );
                  }}
                  error={errors.confirmPassword}
                />
              </Item>
              <Button
                full
                onPress={() => {
                  registerAsync();
                }}
              >
                <Text>Register!</Text>
              </Button>
              {errors.usernameFree && (
                <Badge style={{ width: "100%" }}>
                  <Text>username already exists!</Text>
                </Badge>
              )}
            </Form>
          </Content>
        </Container>
      )}
    </Container>
  );
};

// proptypes here
Login.propTypes = {
  navigation: PropTypes.object
};

export default Login;
