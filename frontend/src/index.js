import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { BookingInfoProvider } from "./components/BookingInfoContext";

ReactDOM.render(
  <React.StrictMode>
    <BookingInfoProvider>
      <App />
    </BookingInfoProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
