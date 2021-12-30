import React, {useContext, useEffect, useState} from "react";
import { BookingInfoContext } from "../BookingInfoContext";

import ReservationResult from "./ReservationResult";
import styled from "styled-components";




const Reservation =()=>{

  const {clientInfo} = useContext(BookingInfoContext);
    
  const {_id} = clientInfo;

  const[reservationInfo, setReservationInfo] = useState({});

const[newId, setNewId] = useState(_id)

const[clickedSumbit, setClickedSubmit] = useState(false);


// const[checkInput, setCheckInput] = useState(_id)

const getId =(ev)=>{
    setNewId(ev.target.value)
}



const handleSubmit = (ev) =>{
ev.preventDefault();
setClickedSubmit(true);


if( newId !==null && newId !==_id ){

 
    fetch(`/api/reservations/${newId}`)
    .then((res) => {
      return res.json();
    })

    .then((data) => {
     if(data.status===200){
        // console.log(data) 
    setReservationInfo(data.data)
      
    }
  
  else if(newId ===null) {
    window.alert("not a valid reservation id")
  }

  });
    
  }

  }
  
  


// console.log(reservationInfo)





// console.log(reservationInfo)



return(
<>

<Title>reservation</Title>
<Form onSubmit={handleSubmit}>
<Label>
    please enter your reservation id : 
<Input value={newId} onChange={getId}/>

</Label>
<Submit type="submit">submit</Submit>
</Form>

{clickedSumbit === true? <ReservationResult reservationInfo={reservationInfo} newId={newId}/>:null }

</>
)

}

export default Reservation;


const Input = styled.input`
width:500px;

`

const Label = styled.label`
padding:20px;
`


const Form = styled.form`
display: flex;
flex-direction: column;
`

const Title = styled.h1`
padding:30px 10px;
`
const Submit = styled.button`
display:block;
margin:auto;
width:150px;
background-color:black;
color:white;
height:60px;
border-radius:20px;
font-siz:10px;
`