import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
import themeVars from "./GlobalStyles";
import AStorage from "../helpers/asynclocalstorage";

const Confirmation = () => {
  const [reservation, setReservation] = useState({});
  useEffect(async () => {
    let resId = await AStorage.getItem("id");
    console.log(resId);
    if (resId) {
      fetch("/reservations/" + resId)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log("*****2");
          setReservation(data.reservation);
          console.log(data);
        });
    }
  }, []);

  return (
    <>
      <Wrapper>
        <ConfirmationTextDiv>
          <ConfirmationText>Flight Confirmed!</ConfirmationText>
        </ConfirmationTextDiv>
        <div>
          <br />
          <h2>Flight Information:</h2>
          <br />
          <p>
            <strong>Flight #:</strong> {reservation.flight}
          </p>
          <p>
            <strong>Seat #:</strong> {reservation.seat}
          </p>
        </div>
        <div>
          <br />
          <h2>Your Information:</h2>
          <br />
          <ReservationNum>
            <strong>Reservation #:</strong> {reservation.id}
          </ReservationNum>
          <p>
            <strong>Name:</strong> {reservation.givenName} {reservation.surname}
          </p>
          <p>
            <strong>Email:</strong> {reservation.email}
          </p>
        </div>
      </Wrapper>
      )
    </>
  );
};

const Wrapper = styled.div`
  border: 1px solid ${themeVars.alabamaCrimson};

  padding-right: 40px;
  padding-left: 40px;
  padding-bottom: 40px;
  padding-top: 0;
  width: 40%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-self: center;
  align-self: center;
  line-height: 1.3rem;
  -webkit-box-shadow: 6px 6px 11px 2px rgba(0, 0, 0, 0.52);
  box-shadow: 6px 6px 11px 2px rgba(0, 0, 0, 0.52);
`;

const ConfirmationTextDiv = styled.div`
  padding: 20px;
  border-bottom: 2px solid ${themeVars.alabamaCrimson};
`;

const ConfirmationText = styled.h2``;

const ReservationNum = styled.p``;

export default Confirmation;
