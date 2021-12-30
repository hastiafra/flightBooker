import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { BookingInfoContext } from "../BookingInfoContext";
import { useHistory } from "react-router";

const BookingForm = ({ flight, selectedSeat }) => {
  let history = useHistory();

  const { clientInfo, setClientInfo } = useContext(BookingInfoContext);

  // console.log(selectedSeat)

  const getInfo = (ev) => {
    setClientInfo({
      ...clientInfo,
      [ev.target.id]: ev.target.value,
      flight,
      seat: selectedSeat,
    });
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();

    fetch("/api/reservation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(clientInfo),
      //the keys in frontend has to match the backend
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data)
        if (data.status === 200) {
          window.localStorage.setItem(
            "reservationInfo",
            JSON.stringify(data.data)
          );
          history.push("/confirmed");
        } else if (data.status === 500) {
          window.alert("This seat is already booked");
        } else {
          window.alert("something went wrong!");
        }
      });
  };

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit}>
        <Label>
          <input
            type="text"
            id="givenName"
            onChange={getInfo}
            value={clientInfo?.givenName}
            placeholder="First Name"
            required
          ></input>
        </Label>
        <Label>
          <input
            type="text"
            id="surname"
            onChange={getInfo}
            value={clientInfo?.surname}
            placeholder="Last Name"
            required
          ></input>
        </Label>
        <Label>
          <input
            type="email"
            id="email"
            value={clientInfo?.email}
            onChange={getInfo}
            placeholder="E-mail"
            required
          ></input>
        </Label>
        <Submit type="submit">Submit</Submit>
      </Form>
    </Wrapper>
  );
};

const Submit = styled.button`
  display: block;
  margin: auto;
  width: 200px;
  background-color: black;
  color: white;
  height: 70px;
  border-radius: 20px;
  font-siz: 10px;
`;

const Label = styled.label`
  display: block;
  padding: 10px;
`;

const Form = styled.form`
  padding: 20px;
  border: solid white 10px;
`;

const Wrapper = styled.div`
  margin-top: 120px;
  display: flex;
  flex-direction: column;
`;

export default BookingForm;
