import { useState } from "react";
import validate from "validate.js";

const emptyErrors = {
  username: undefined,
  email: undefined,
  password: undefined
};

const constraints = {
  username: {
    presence: {
      message: "This field is required"
    },
    length: {
      minimum: 3,
      message: "Username must be atleast three characters"
    }
  },
  password: {
    presence: {
      message: "This field is required"
    },
    length: {
      minimum: 5,
      message: "Your password must be at least 5 characters"
    }
  },
  email: {
    presence: {
      message: "This field is required"
    },
    email: {
      message: "Email address must be valid"
    }
  },
  confirmPassword: {
    equality: "password"
  }
};

const useSignUpForm = () => {
  const [inputs, setInputs] = useState({});
  const [errors, setErrors] = useState({});

  const validatePassword = (attr1, value1, attr2, value2) => {
    try {
      let passwordMatch = true;
      const valResult = validate(
        {
          [attr1]: value1,
          [attr2]: value2
        },
        constraints
      );
      console.log("validateP", valResult);
      let valid = undefined;
      if (valResult[attr2]) {
        valid = valResult[attr2][0];
        passwordMatch = false;
      }
      setErrors(errors => ({
        ...errors,
        [attr2]: valid
      }));
      return passwordMatch;
    } catch (e) {
      console.log(e.message);
    }
  };

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

  const handleUsernameChange = text => {
    console.log("change detected", text);
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
    setInputs(inputs => {
      return {
        ...inputs,
        fullname: text
      };
    });
  };

  const handleEmailChange = text => {
    setInputs(inputs => {
      return {
        ...inputs,
        email: text
      };
    });
  };

  const handleConfirmPasswordChange = text => {
    setInputs(inputs => {
      return {
        ...inputs,
        confirmPassword: text
      };
    });
  };

  return {
    handleUsernameChange,
    handlePasswordChange,
    handleFullnameChange,
    handleEmailChange,
    handleConfirmPasswordChange,
    inputs,
    errors,
    setErrors,
    validateField,
    validatePassword
  };
};

export default useSignUpForm;
