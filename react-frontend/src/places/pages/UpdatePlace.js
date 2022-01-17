import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import "./PlaceForm.css";
import { useForm } from "../../shared/hooks/form-hook";

const DUMMMY_PLACES = [
  {
    id: "p1",
    title: "Empire State Building",
    description: "One of the most famous Sky Scrapers in the world",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg",
    address: "20 W 34th St, New York, NY 10001",
    location: {
      lat: 40.7484405,
      lng: -73.9878584,
    },
    creator: "u1",
  },
  {
    id: "p2",
    title: "Empire State Building",
    description: "One of the most famous Sky Scrapers in the world",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg",
    address: "20 W 34th St, New York, NY 10001",
    location: {
      lat: 40.7484405,
      lng: -73.9878584,
    },
    creator: "u2",
  },
];

const UpdatePlace = (props) => {
  // since we used placeId in the dynamic segment in the route
  const placeId = useParams().placeId;

  const [isLoading, setIsLoading] = useState(true);
  //   hooks can only be directly used inside function component (not inside function,if ,for,then blocks)
  const [formState, inputHandler, setFormData] = useForm(
    {
      Title: {
        value: "",
        isValid: false,
      },
      Description: {
        value: "",
        isValid: false,
      },
    },
    false
  );
  //   here when using the actual backend it will take some time
  //   identifiedPlace value will not change with rerender cycle ,because RHS is the same thing in the memory(eventhough the logic is run everytime)
  const identifiedPlace = DUMMMY_PLACES.find((p) => p.id === placeId);
  //   if we don't use useEffect here,this will cause infinte loop,everytime component rerenders useForm is called ,action is dispatched this cause updating the state in form reducer eventhough te value is same(still new state),which causes this component to rerender again.
  useEffect(() => {
    if (identifiedPlace) {
      setFormData(
        {
          Title: {
            value: identifiedPlace.title,
            isValid: true,
          },
          Description: {
            value: identifiedPlace.description,
            isValid: true,
          },
        },
        true
      );
    }
    setIsLoading(false);
  }, [setFormData, identifiedPlace]);
  const placeUpdateSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
  };
  if (!identifiedPlace) {
    return (
      <div className="center">
        <Card>
          <h2>Couldn't find a place</h2>
        </Card>
      </div>
    );
  }
  if (isLoading) {
    return (
      // index.css syling applies here as well
      <div className="center">
        <h2>Loading...</h2>
      </div>
    );
  }
  return (
    <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
      {/* we should be able to work with initial value and validity*/}
      <Input
        id="Title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title"
        onInput={inputHandler}
        initialValue={formState.inputs.Title.value}
        initialValid={formState.inputs.Title.isValid}
      />
      <Input
        id="Description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description(min 5 characters)"
        onInput={inputHandler}
        initialValue={formState.inputs.Description.value}
        initialValid={formState.inputs.Description.isValid}
      />
      <Button type="submit" disabled={!formState.isValid}>
        UPDATE PLACE
      </Button>
    </form>
  );
};

export default UpdatePlace;
