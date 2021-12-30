import React, {useState} from "react";
import DropDown from "./DropDown";
import Plane from "./Plane";
import styled from "styled-components";
import BookingForm from "./BookingForm";

const SeatSelect = ({}) => {
  const [flight, setFlight] = useState(null);

  const [selectedSeat, setSelectedSeat] = useState(null);

  return (
    <>
     <DropDown setFlight={setFlight}/>
      <h2>Select your seat and Provide your information!</h2>
      <Wrapper>
      <Plane flight = {flight} setSelectedSeat={setSelectedSeat}/>
      <BookingForm flight={flight} selectedSeat={selectedSeat}/>
      
      </Wrapper>
    </>
  );
};

export default SeatSelect;

const Wrapper = styled.div`
display:flex;
justify-content: space-evenly;
background-color:#f69f00;

`
