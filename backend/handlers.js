"use strict";

// use this package to generate unique ids: https://www.npmjs.com/package/uuid
const { v4: uuidv4 } = require("uuid");

//  Use this data. Changes will persist until the server (backend) restarts.
const { flights, reservations } = require("./data");

const getFlights = (req, res) => {
  const flightNumbers = Object.keys(flights);
  res.status(200).json({
    status: "success",
    flights: flightNumbers,
  });
};

const getFlight = (req, res) => {
  const flightNumber = req.params.flightNumber;
  const flight = flights[flightNumber];

  res.status(200).json({
    status: "Success",
    seats: flight,
  });
};

const addReservations = (req, res) => {
  const newReservation = req.body;
  console.log(newReservation);
  newReservation.id = uuidv4();
  reservations.push(newReservation);
  res.status(201).json({
    status: 201,
    message: "Reservation booked!",
    reservationId: newReservation.id,
  });
};

const getReservations = (req, res) => {
  res.status(200).json({ status: 200, reservations: reservations });
};

const getSingleReservation = (req, res) => {
  const id = req.params.id;
  const reservation = reservations.find((reservation) => {
    return id === reservation.id;
  });
  console.log(reservation);
  if (reservation) {
    res.status(200).json({
      status: 200,
      reservation: reservation,
    });
  } else {
    res.status(404).json({
      status: 404,
      message: "Reservation not found!",
    });
  }
};

const deleteReservation = (req, res) => {
  const id = req.params.id;
  const reservationIndex = reservations.findIndex((reservation) => {
    return id === reservation.id;
  });
  if (reservationIndex != -1) {
    reservations.splice(reservationIndex, 1);
    res.status(200).json({ status: 200, message: "Reservation deleted" });
  } else {
    res.status(400).json({
      status: 400,
      message: "Sorry, reservation not found",
    });
  }
};

const updateReservation = (req, res) => {
  const id = req.params.id;
  const { flight, seat } = req.body;
  const newSeat = flights[flight].find((seatObj) => {
    return seatObj.id === seat;
  });
  if (newSeat.isAvailable === true) {
    newSeat.isAvailable = false;
  } else {
    return res.status(400).json({
      status: 400,
      message: "Seat is already booked!",
    });
  }
  const foundReservation = reservations.find((reservation) => {
    return id === reservation.id;
  });
  // console.log(foundReservation);
  const oldSeat = flights[foundReservation.flight].find((seatObj) => {
    return seatObj.id === foundReservation.seat;
  });
  // console.log(oldSeat);
  oldSeat.isAvailable = true;
  foundReservation.flight = flight;
  foundReservation.seat = seat;
  return res.status(200).json({
    message: "updated",
  });
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
