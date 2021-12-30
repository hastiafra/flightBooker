import React, { useState, useEffect } from "react";

import { createContext } from "react";


const initialState = {_id:"", givenName:"" , surname:"" , email:"" , flight:"" , seat:""};

let confirmationNum = localStorage.getItem("reservationInfo");

let confirm = JSON.parse(confirmationNum);

export const BookingInfoContext = createContext(null);

export const BookingInfoProvider = ({ children }) => {

  const [clientInfo, setClientInfo] = useState(initialState? confirm : null);

  
  return (
    <BookingInfoContext.Provider value={{ clientInfo, setClientInfo }}>
      {children}
    </BookingInfoContext.Provider>
  );
};
