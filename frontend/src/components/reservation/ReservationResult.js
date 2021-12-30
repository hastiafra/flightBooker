import React, {useContext, useEffect, useState} from "react";

import styled from "styled-components";
import { BookingInfoContext } from "../BookingInfoContext";


const ReservationResult = ({reservationInfo, newId}) =>{

const {clientInfo} = useContext(BookingInfoContext);


// console.log(clientInfo)
const {_id, givenName, surname, email, flight, seat } = clientInfo;




if(newId !==_id){
// console.log(reservationInfo)
return(<Wrapper>
    <Para><Span>Your flight number is: </Span>{reservationInfo?.flight}</Para>
    <Para><Span>Your seat number is:</Span> {reservationInfo?.seat}</Para>
    <Para><Span>Your first-name is:</Span> {reservationInfo?.givenName}</Para>
    <Para><Span>Your last-name is:</Span> {reservationInfo?.surname}</Para>
    <Para><Span>Your email address is:</Span> {reservationInfo?.email}</Para>
     </Wrapper>)


}





else{

return(<Wrapper>
    <Para><Span>Your flight number is: </Span>{flight}</Para>
    <Para><Span>Your seat number is:</Span> {seat}</Para>
    <Para><Span>Your first-name is:</Span> {givenName}</Para>
    <Para><Span>Your last-name is:</Span> {surname}</Para>
    <Para><Span>Your email address is:</Span> {email}</Para>
     </Wrapper>)

}



}

export default ReservationResult;


const Para = styled.p`
font-weight:bolder;
font-size:30px;
padding:10px;
`
const Span = styled.span`
font-size:20px;
font-weight:bold;
`

const Wrapper = styled.div`
display:flex;
align-items: center;
justify-content: center;
flex-direction: column;
padding-top:20px;
`

