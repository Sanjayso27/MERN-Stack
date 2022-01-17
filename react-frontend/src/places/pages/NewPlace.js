import React from "react";
import Input from "../../shared/components/FormElements/Input";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import Button from "../../shared/components/FormElements/Button";
import { useForm } from "../../shared/hooks/form-hook";
import "./PlaceForm.css";

const NewPlace = () => {
  // can use any name here using array destructuring
  const [formState, InputHandler] = useForm(
    {
      Title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      Address: {
        value: "",
        isValid: false,
      },
    },
    false
  );
  //   dispatch is dependency for the above useCallback hook but react ensures that dispatch from useReducer never change

  const placeSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs); // later we will send this to the backend
  };
  return (
    <form className="place-form" onSubmit={placeSubmitHandler}>
      {/* we should pass whether input is valid from child input to here to check the overall validity of the form*/}
      <Input
        element="input"
        type="text"
        id="Title"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title"
        onInput={InputHandler}
      />
      <Input
        element="textarea"
        id="description"
        label="description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description(atleast 5 characters)"
        onInput={InputHandler}
      />
      <Input
        element="input"
        id="Address"
        label="Address"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid address"
        onInput={InputHandler}
      />
      <Button type="submit" disabled={!formState.isValid}>
        ADD PLACE
      </Button>
    </form>
  );
};

export default NewPlace;
