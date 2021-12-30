"use strict";
const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const re = /^[A-Za-z]+$/;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

//it is function that generates unique id

const client = new MongoClient(MONGO_URI, options);
// use this package to generate unique ids: https://www.npmjs.com/package/uuid
const { v4: uuidv4 } = require("uuid");

// use this data. Changes will persist until the server (backend) restarts.
const { flights, reservations } = require("./data");

const getFlights = async (req, res) => {
  try {
    await client.connect();

    const db = client.db("SlingAir");

    const flights = await db.collection("flight").find().toArray();

    let flightNum = flights.map((flight) => {
      return flight._id;
    });

    console.log(flightNum);

    res.status(200).json({
      status: 200,
      data: flightNum,
    });
    client.close();
  } catch (err) {
    res.status(500).json({ status: "Error", data: req.body, msg: err.message });
  }
};

const getFlight = async (req, res) => {
  try {
    await client.connect();

    const db = client.db("SlingAir");

    // console.log(req.params )
    const { flight } = req.params;

    const flightNum = { _id: flight };

    const flights = await db.collection("flight").findOne(flightNum);

    let seatsArr = flights.seats;

    // console.log(seatsArr)

    res.status(200).json({
      status: 200,
      data: seatsArr,
    });
    client.close();
  } catch (err) {
    res.status(500).json({ status: "Error", data: req.body, msg: err.message });
  }
};

const addReservations = async (req, res) => {
  const { givenName, surname, email, flight, seat } = req.body;

  try {
    await client.connect();

    const db = client.db("SlingAir");

    const _id = uuidv4();

    let myQuery = { _id: flight, "seats.id": seat };

    let findFlight = await db.collection("flight").findOne(myQuery);

    let findSeat = findFlight.seats.find((element) => {
      return element.id === seat;
    });

    // console.log(findSeat) { id: '3E', isAvailable: true }

    if (findSeat.isAvailable === true) {
      await db
        .collection("reservations")
        .insertOne({ _id, givenName, surname, email, flight, seat });

      //https://docs.mongodb.com/manual/reference/operator/update/positional/

      await db
        .collection("flight")
        .updateOne(myQuery, { $set: { "seats.$.isAvailable": false } });

      client.close();

      res.status(200).json({
        status: 200,
        data: { _id, givenName, surname, email, flight, seat },
      });
    }

    if (!re.test(givenName)) {
      res
        .status(404)
        .json({ status: 404, msg: "Don't include numbers in name" });
    }
  } catch (err) {
    res.status(500).json({ status: "Error", data: req.body, msg: err.message });
  }
};

const getReservations = async (req, res) => {
  try {
    await client.connect();

    const db = client.db("SlingAir");

    const reservations = await db.collection("reservations").find().toArray();

    // console.log(reservations)

    res.status(200).json({
      status: 200,
      data: reservations,
    });
    client.close();
  } catch (err) {
    res.status(500).json({ status: "Error", data: req.body, msg: err.message });
  }
};

const getSingleReservation = async (req, res) => {
  try {
    await client.connect();

    const db = client.db("SlingAir");

    // console.log(req.params )
    const { id } = req.params;

    const reservationId = { _id: id };

    const reservation = await db
      .collection("reservations")
      .findOne(reservationId);

    // console.log(reservation)

    res.status(200).json({
      status: 200,
      data: reservation,
    });
    client.close();
  } catch (err) {
    res.status(500).json({ status: "Error", data: req.body, msg: err.message });
  }
};

const deleteReservation = async (req, res) => {
  try {
    await client.connect();

    const db = client.db("SlingAir");

    // console.log(req.params )
    const { id } = req.params;

    const reservationId = { _id: id };

    const reservation = await db
      .collection("reservations")
      .deleteOne(reservationId);

    //  console.log(reservation)

    res.status(200).json({
      status: 200,
      msg: "you reservation is deleted",
    });
    client.close();
  } catch (err) {
    res.status(500).json({ status: "Error", data: req.body, msg: err.message });
  }
};

const updateReservation = async (req, res) => {
 console.log(req.body) 
    const {
      flight: newFlightId,
      seat: newSeatId,
      givenName,
      surName,
      email,
    } = req.body;
  try {
    await client.connect();

    const db = client.db("SlingAir");

    
    const { id } = req.params;

    const reservationId = { _id: id }




    // const currentSeat = await db.collection("flight").findOne({ _id:flight, id:seat[0] });
    const reservation = await db
      .collection("reservations")
      .findOne(reservationId);


    const { flight: oldFlightId, seat: oldSeatId} = reservation;


    let updateNewSeat = { _id: newFlightId, "seats.id": newSeatId };

    let updateOldSeat = { _id: oldFlightId, "seats.id": oldSeatId };

    const myQuery = { ...req.body };

    const { modifiedCount: newSeatModify } = await db
      .collection("flight")
      .updateOne(updateNewSeat, { $set: { "seats.$.isAvailable": false } });

      if(!newSeatModify){
       throw new Error("selected seat is not available")
      }

      

    const { modifiedCount: oldSeatModify } = await db
      .collection("flight")
      .updateOne(updateOldSeat, { $set: { "seats.$.isAvailable": true } });


      if(!oldSeatModify){
        throw new Error("Old seat is not modified")
       }

    const {modifiedCount: reservationModified} = await db
      .collection("reservations")
      .updateOne(reservationId, { $set: myQuery });

      if(!reservationModified){
        throw new Error("reservation is not modified")
       }


    //   console.log(req.body)

    //  console.log(reservation)

    res.status(200).json({
      status: 200,
      data: {...myQuery, ...reservationId  },
    });
 
  } catch (err) {
    res.status(500).json({ status: "Error", data: req.body, msg: err.message });
  } finally{
    client.close();
  }
};

module.exports = {
  getFlights,
  getFlight,
  getReservations,
  addReservations,
  getSingleReservation,
  deleteReservation,
  updateReservation,
};
