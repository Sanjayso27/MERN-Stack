const { v4 } = require("uuid"); //get the value from the exports object with key v4
const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");
const getCoordsForAddress = require("../util/location");
const Place = require('../models/place');

// we separate the middleware logic from the routing logic(it software design pattern MVC)
let DUMMMY_PLACES = [
  {
    id: "p1",
    title: "Empire State Building",
    description: "One of the most famous Sky Scrapers in the world",
    address: "20 W 34th St, New York, NY 10001",
    location: {
      lat: 40.7484405,
      lng: -73.9878584,
    },
    creator: "u1",
  },
];

// we can also use function name (){...} or const name = function(){...} as well.
const getPlaceById = async (req, res, next) => {
  // we would exchange data in json format
  // res in express has json method to which array,object,numbers,booleans etc.. can be passed
  //   res.json({ message: "It works!" });
  const placeId = req.params.pid; //reqs object has params property
  //   find returns the first item in the array that satisfy a test
  let place;
  try{
    place = await Place.findById(placeId);
  }
  catch(err){
    return next(new HttpError("Couldn't get the place from the database",500));
  }
  if (!place) {
    // //   we should use json in this case so that response is send
    // return res
    //   .status(404)
    //   .json({ message: "Could not find the place with given place Id" });

    // how to trigger the error handling middleware either throw new error here or pass the error to next function
    // if we are in async midddleware(database) we should use next(error) else we can use throw
    // const error = new Error("Couldn't find the place for provided place Id"); //error object has message property
    // error.code = 404; //dynamically adding new property
    // throw error; //trigger the error handling middleware
    // shorten the above using
    // throw new HttpError("Couldn't find the place for provided place Id", 404);
    next(new HttpError("Couldn't find the place for provided place Id", 404));
  }
  // place is a mongoose object hence we convert it into a js object and by default id's are dropped hence we set getters:true
  res.json({ place: place.toObject({getters: true})}); //this gets expanded to {place:place}
};

const getPlacesByUserId = (req, res, next) => {
  const userId = req.params.uid;
  const places = DUMMMY_PLACES.filter((p) => p.creator === userId);
  if (!places || places.length === 0) {
    //   chaining . Here there is a lot code duplication
    // const error = new Error("Couldn't find the place for provided place Id");
    // error.code = 404;
    // return next(error); //trigger the error handling middleware
    return next(
      new HttpError("Couldn't find the places for provided userId", 404) //it will ignore the middlewares with req,res,next signatures and go straight to the error handling middleware
    );
  }
  res.json({ places });
};

const createPlace = async (req, res, next) => {
  // this function will look into request and return an errors array ,the result of validators middleware setup in the routes file.
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Provided data is invalid,Please check!", 422));
  }
  const { title, description, address, creator } = req.body; //added by bodyParser

  let coordinates;
  //  u can use try catch like this to catch the error in async-await function.
  try {
    coordinates = await getCoordsForAddress(address);
  } catch (error) {
    return next(error);
  }

  const createdPlace = new Place({
    title,
    description,
    address,
    location: coordinates,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg",
    creator
  })

  try{
    await createdPlace.save();
  }
  catch(error){
    return next(new HttpError("Couldn't create a place!",404));
  }
  // DUMMMY_PLACES.push(createdPlace); //or unshift(createdPlace) to push it to the front
  // 201 success code if you created something new;
  res.status(201).json({ place: createdPlace });
};

const updatePlace = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError("Provided data is invalid,Please check!", 422);
  }
  const { title, description } = req.body;
  const placeId = req.params.pid;
  // we are not directly updating this because it may happen that part of the data get written,hence first we create a copy and then update it and after all the update is finished we update the final dummy array
  const updatedPlace = { ...DUMMMY_PLACES.find((p) => p.id === placeId) };
  //   findIndex find the index of the first element in the array satisfying the given function
  const placeIndex = DUMMMY_PLACES.findIndex((p) => p.id === placeId);
  updatedPlace.title = title;
  updatedPlace.description = description;
  DUMMMY_PLACES[placeIndex] = updatedPlace;
  res.status(200).json({ place: updatedPlace });
};

const deletePlace = (req, res, next) => {
  const placeId = req.params.pid;
  if (!DUMMMY_PLACES.find((p) => p.id === placeId)) {
    throw new HttpError("Couldn't find the place with placeId", 404);
  }
  // overwriting the existing data
  DUMMMY_PLACES = DUMMMY_PLACES.filter((p) => p.id !== placeId);
  res.status(200).json({ message: "Deleted" });
};

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
