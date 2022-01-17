import React, { useState ,useContext} from "react";
import { useForm } from "../../shared/hooks/form-hook";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import { AuthContext } from "../../shared/context/auth-context";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import Card from "../../shared/components/UIElements/Card";
import "./Auth.css";

const Auth = (props) => {
  const auth=useContext(AuthContext);
  const [isLogInMode, setIsLogInMode] = useState(true);
  const [formState, inputHandler, setFormData] = useForm(
    {
      Email: {
        value: "",
        isValid: false,
      },
      Password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const switchModeHandler = () => {
    // if there is group of state updates inside a synchronous code block then react will update the state together and only rerender the component once
    if (!isLogInMode) {
      setFormData(
        { ...formState.inputs, Name: undefined },
        formState.inputs.Email.isValid && formState.inputs.Password.isValid
      );
    } else {
      setFormData({ ...formState.inputs, Name: { value: "", isValid: false } }, false);
    }
    // useState hook might batch multiple calls and mayn't update the state immediately
    // hence this function based approach
    setIsLogInMode((prevMode) => !prevMode);
  };

  const authSubmitHandler = (event) => {
    event.preventDefault();
    auth.login();
    console.log(formState);
  };
  return (
    // which class is applied here from auth.css or from card.css
    // Here auth.css takes more precedence than card
    <Card className="authentication">
      <h2>Login</h2>
      <hr />
      <form onSubmit={authSubmitHandler}>
        {!isLogInMode && (
          <Input
            id="Name"
            element="input"
            type="text"
            label="Your Name"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter name"
            onInput={inputHandler}
          />
        )}
        <Input
          id="Email"
          element="input"
          type="email"
          label="Email"
          validators={[VALIDATOR_EMAIL()]}
          errorText="Please enter a valid email"
          onInput={inputHandler}
        />
        <Input
          id="Password"
          element="input"
          type="password"
          label="Password"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid password(atleast 5 characters)"
          onInput={inputHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>
          {isLogInMode ? "LOGIN" : "SIGNUP"}
        </Button>
        {/* for most browsers default type is submit */}
        <Button onClick={switchModeHandler} type="button" inverse>
          SWITCH TO {isLogInMode ? "SIGNUP" : "LOGIN"}
        </Button>
      </form>
    </Card>
  );
};

export default Auth;
