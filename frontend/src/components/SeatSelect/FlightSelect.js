import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { themeVars } from "../GlobalStyles";

const FlightSelect = ({ handleFlightSelect, flightNumber }) => {
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    fetch("/flights")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setFlights(data.flights);
      });
  }, []);

  return (
    <Wrapper>
      <label htmlFor="flight">Flight Number :</label>
      <select
        defaultValue="default"
        value={flightNumber}
        onChange={handleFlightSelect}
      >
        <option value="default">Select Flight</option>
        {flights.map((flight) => {
          return <option value={flight}>{flight}</option>;
        })}
      </select>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: ${themeVars.cadmiumRed};
  height: 80px;
  display: flex;
  align-items: center;
  padding: ${themeVars.pagePadding};
  margin-bottom: ${themeVars.pagePadding};
`;

export default FlightSelect;
