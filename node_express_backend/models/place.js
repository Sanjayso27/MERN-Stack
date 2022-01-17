const mongoose = require("mongoose");

const schema = mongoose.Schema;

const placeSchema = new schema({
  // required means string mustnot be empty
  title: { type: String, required: true },
  description: { type: String, required: true },
  // we never store image in our database ,because our database becomes slow
  image: { type: String, required: true },
  address: { type: String, required: true },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  creator: { type: String, required: true },
});

module.exports = mongoose.model("Place", placeSchema);
