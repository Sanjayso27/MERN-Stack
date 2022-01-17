const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");
const { v4 } = require("uuid");

const DUMMMY_USERS = [
  {
    id: "u1",
    name: "Sanjay Sukumaran",
    email: "test@test.com",
    password: "San27",
  },
];

const getUsers = (req, res, next) => {
  res.json({ users: DUMMMY_USERS });
};

const signup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError("Provided data is invalid,Please check!", 422);
  }
  const { name, email, password } = req.body;

  const hasUser = DUMMMY_USERS.find((p) => p.email === email);
  if (hasUser) {
    throw new HttpError("Credentials already used", 422); //422 for invalid authentication
  }

  const createdUser = {
    id: v4(),
    name,
    email,
    password,
  };
  DUMMMY_USERS.push(createdUser);
  res.status(201).json({ user: createdUser });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  const identifiedUser = DUMMMY_USERS.find((p) => p.email === email);
  if (!identifiedUser || identifiedUser.password !== password) {
    throw new HttpError("Credentials seems to be wrong!", 401); //401 for authentication failure
  }
  res.json({ message: "Logged In!" });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
