import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { themeVars } from "./GlobalStyles";
import tombstone from "../assets/tombstone.png";

const ViewReservation = () => {
  const [reservation, setReservation] = useState({});
  const [reservationId, setReservationId] = useState("");
  const [notFound, setNotFound] = useState(false);
  useEffect(() => {
    let resId = localStorage.getItem("id");
    console.log(resId);
    if (resId) {
      fetch("/reservations/" + resId)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log(data);
          setReservation(data.reservation);
          setNotFound(false);
        });
    }
  }, []);

  const handleSubmit = (ev) => {
    ev.preventDefault();
    fetch("/reservations/" + reservationId)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        if (data.status === 200) {
          setReservation(data.reservation);
          setNotFound(false);
        } else {
          setNotFound(true);
        }
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <H3>Please enter your reservation Id:</H3>
          <InputDiv>
            <InputField
              value={reservationId}
              onChange={(ev) => {
                setReservationId(ev.target.value);
              }}
            />
            <SubmitButton type="submit">Submit</SubmitButton>
          </InputDiv>
        </div>
      </form>
      {notFound ? (
        <div>
          <H3>Sorry, that ID is invalid. Please try again.</H3>
          <TombstoneImg src={tombstone} />
        </div>
      ) : (
        <Wrapper>
          <ConfirmationTextDiv>
            <ConfirmationText>Your reservation!</ConfirmationText>
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
              <strong>Name:</strong> {reservation.givenName}{" "}
              {reservation.surname}
            </p>
            <p>
              <strong>Email:</strong> {reservation.email}
            </p>
          </div>
        </Wrapper>
      )}
    </>
  );
};

const InputDiv = styled.div`
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const H3 = styled.h3`
  padding-top: 20px;
  color: ${themeVars.alabamaCrimson};
`;

const InputField = styled.input`
  height: 50px;
  width: 375px;
  -webkit-box-shadow: 6px 6px 11px 2px rgba(0, 0, 0, 0.52);
  box-shadow: 6px 6px 11px 2px rgba(0, 0, 0, 0.52);
`;

const SubmitButton = styled.button`
  color: ${themeVars.alabamaCrimson};
  border: none;
  margin-left: 10px;
  padding: 8px;
  background-color: white;
  border-radius: 5px;
  -webkit-box-shadow: 6px 6px 11px 2px rgba(0, 0, 0, 0.52);
  box-shadow: 6px 6px 11px 2px rgba(0, 0, 0, 0.52);
`;

const Wrapper = styled.div`
  border: 1px solid ${themeVars.alabamaCrimson};
  padding-right: 40px;
  padding-left: 40px;
  padding-bottom: 40px;
  padding-top: 0;
  margin-bottom: 10px;
  width: 40%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-self: center;
  line-height: 1.3rem;
  -webkit-box-shadow: 6px 6px 11px 2px rgba(0, 0, 0, 0.52);
  box-shadow: 6px 6px 11px 2px rgba(0, 0, 0, 0.52);
`;

const ConfirmationTextDiv = styled.div`
  padding: 20px;
  border-bottom: 2px solid ${themeVars.alabamaCrimson};
`;

const ConfirmationText = styled.h2`
  color: ${themeVars.alabamaCrimson};
`;

const ReservationNum = styled.p``;

const TombstoneImg = styled.img`
  max-width: 400px;
  margin-top: 75px;
  height: auto;
  margin-left: 50%;
  transform: translatex(-40%);
`;

export default ViewReservation;
