var express = require("express");
var router = express.Router();
var Flight = require("../model/flights");
require('../model/destinations');

const VIEWS_FLIGHTS = "flights";

//index route
router.get("/", async (req, res) => {
  try {
    const flights = await Flight.find({}).populate({
      path: 'destinations',
      model: 'Destination'
  });
    console.log(flights);
    res.render(`${VIEWS_FLIGHTS}/index`, { flights, title: "All flights" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// New route
router.get("/new", async (req, res) => {
  const airports = ["LAX", "DFW", "AUS", "DEN", "SAN"];
  const airlines = ["American", "Austria", "New Zealand", "Australia"];
  res.render(`${VIEWS_FLIGHTS}/new`, {
    title: "Add a New Flight",
    airports,
    airlines,
  });
});

// Create route
router.post("/", async (req, res) => {
  try {
    const flight = new Flight(req.body);
    await flight.save();
    res.redirect("/flights");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/:id", async (req, res) => {
  const flight = await Flight.findById(req.params.id).populate({
    path: 'destinations',
    model: 'Destination'
});
  console.log(flight);
  const airports = ["AUS", "DFW", "DEN", "LAX", "SAN"];
  res.render(`${VIEWS_FLIGHTS}/details`, {
    flight,
    title: "Flight Details",
    airports,
  });
});





router.put("/:id", async (req, res) => {
    try {
      const flight = await Flight.findById(req.params.id).populate({
        path: 'destinations',
        model: 'Destination'
    });
      const newDestination = {
        airport: req.body.airport,
        arrival: new Date(req.body.arrival),
      };
  
      flight.destinations.push(newDestination);
      await flight.save();

      console.log(flight)
  
      const flights = await Flight.find({});
      res.redirect(`/flights/${flight._id}`);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  });
  


  

module.exports = router;
