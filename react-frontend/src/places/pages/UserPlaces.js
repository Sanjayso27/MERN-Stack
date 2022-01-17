import React from "react";
import { useParams } from "react-router-dom";

import PlaceList from "../components/PlaceList";

// prettier wouldn't work if there is error
// javascript variables can start friom caps
// key value pairs and value should be enclosed in strings
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

const UserPlaces = (props) => {
  // useParams return an object which has dynamics segments in route configs as properties
  const userId = useParams().userId;
  // only keep the places that satisfy the condition inside filter
  const loadedPlaces = DUMMMY_PLACES.filter(
    (place) => place.creator === userId
  );
  return <PlaceList items={loadedPlaces} />;
};

export default UserPlaces;
