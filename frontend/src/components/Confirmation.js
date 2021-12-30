import React, {useContext} from "react";
import styled from "styled-components";

import tombstone from "../assets/tombstone.png";

import { BookingInfoContext } from "./BookingInfoContext";

const Confirmation = () => {
  
  const {clientInfo} = useContext(BookingInfoContext);
  
  //  console.log(clientInfo)

  const { givenName, surname, email, flight, seat} = clientInfo;

  // console.log(flight)

  let confirmationNum = localStorage.getItem("reservationInfo");

  let confirm = JSON.parse(confirmationNum);

  // console.log(confirm)

  let id = confirm["_id"];

  // console.log(id)

  return <Wrapper>
    <Title>Confirmation!</Title>
   {id? <Para><Span>Your booking number is:</Span> {id}</Para>: <Para>Please call our customer service</Para>}
   <Para><Span>Your flight number is: </Span>{flight}</Para>
   <Para><Span>Your seat number is:</Span> {seat}</Para>
   <Para><Span>Your first-name is:</Span> {givenName}</Para>
   <Para><Span>Your last-name is:</Span> {surname}</Para>
   <Para><Span>Your email address is:</Span> {email}</Para>
   <Img src={tombstone} alt="tombstone"/>
    </Wrapper>;
};



const Img = styled.img`
padding-top:10px;
height:150px;



`
const Para = styled.p`
font-weight:bolder;
font-size:30px;
padding:10px;
`
const Span = styled.span`
font-size:20px;
font-weight:bold;
`



const Title = styled.h1`
padding: 100px 20px 20px;

`


const Wrapper = styled.div`
display:flex;
align-items: center;
justify-content: center;
flex-direction: column;

`;

export default Confirmation;
