const express = require("express");
const { check } = require("express-validator");
const { login, getUsers, signup } = require("../controllers/users-controller");

const router = express.Router();

router.get("/", getUsers);

router.post(
  "/signup",
  [
    check("name").isLength({ min: 6 }),
    check("email").normalizeEmail().isEmail(), //Test@test.com => test@test.com
    check("password").isLength({ min: 6 }),
  ],
  signup
);

router.post("/login", login);

module.exports = router;
