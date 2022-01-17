// you have to export express in every file in which you have to use it's functionalities.
const express = require("express");
const { check } = require("express-validator");
// we can use object destructuring here
const {
  getPlaceById,
  getPlacesByUserId,
  createPlace,
  updatePlace,
  deletePlace,
} = require("../controllers/places-controllers");

const router = express.Router();

// we can use use to register something on any request
// the req,res, inside the callback function itself has many functionalities!! ddefault 200 status code
router.get("/:pid", getPlaceById);

// here the order the routes matter,since this is specific route express identifies this correctly
// but if it where only /user then we have to take this route above the /:pid one
router.get("/user/:uid", getPlacesByUserId);

// we can also add multiple middlewares which gets executed from left-right.
// check takes the property in our request body which need to be validated and the whole chain returns a middleware
// we have to register the middleware and you have to go to the controller and use Validation result in the middlewares where validation is present
router.post(
  "/",
  [
    check("title").not().isEmpty(),
    check("description").isLength({ min: 5 }),
    check("address").not().isEmpty(),
  ],
  createPlace
);

router.patch(
  "/:pid",
  [check("title").not().isEmpty(), check("description").isLength({ min: 5 })],
  updatePlace
);

router.delete("/:pid", deletePlace);
// I think router automatically calls next to the next middleware if no matching method and url is present

module.exports = router;
