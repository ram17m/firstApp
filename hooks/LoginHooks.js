import { useState } from "react";

const useSignUpForm = () => {
  const [inputs, setInputs] = useState({});
  const handleUsernameChange = text => {
    setInputs(inputs => {
      return {
        ...inputs,
        username: text
      };
    });
  };
  // const handleRegisterUsernameChange = (text) => {
  //   setInputs((inputs) => {
  //     return {
  //       ...inputs,
  //       registerUsername: text,
  //     };
  //   });
  // };
  const handlePasswordChange = text => {
    setInputs(inputs => {
      return {
        ...inputs,
        password: text
      };
    });
  };

  // const handleRegisterPasswordChange = (text) => {
  //   setInputs((input) => {
  //     return {
  //       ...inputs,
  //       registerPassword: text,
  //     };
  //   });
  // };

  const handleFullnameChange = text => {
    setInputs(input => {
      return {
        ...inputs,
        fullname: text
      };
    });
  };

  const handleEmailChange = text => {
    setInputs(input => {
      return {
        ...inputs,
        email: text
      };
    });
  };

  return {
    handleUsernameChange,
    handlePasswordChange,
    handleFullnameChange,
    handleEmailChange,
    inputs
  };
};

export default useSignUpForm;
