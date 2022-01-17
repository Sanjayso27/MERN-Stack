const axios = require("axios");
const HttpError = require("../models/http-error");

const API_KEY = "pk.dae5757d89d2dd9adf81f309e3423f36";

async function getCoordsForAddress(address) {
  const response = await axios.get(
    //   encodeURI converts input string into a URL friendly format
    `https://us1.locationiq.com/v1/search.php?key=${API_KEY}&q=${encodeURIComponent(
      address
    )}&format=json`
  );
  const data = response.data[0];

  if(!data || data.status === "ZERO_RESULTS"){
      const error = new HttpError("Couldn't find coordinates for the address!",422);
      return next(error);
  }
  const coordinates = {
      lat: data.lat,
      lng: data.lon
  }
  return coordinates;
}

module.exports = getCoordsForAddress;
