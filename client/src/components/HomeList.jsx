import React from "react";
import HomeListEntry from "./HomeListEntry.jsx";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  padding: 20px 20px 20px 20px;
`;

const HomeList = (props) => {
  return (
    <Container>
      {props.homeDisplayed.map((home) => (
        <HomeListEntry
          key={home._id}
          home={home}
          donationMin={props.donationMin}
          numberOfGuests={props.numberOfGuests}
          getHomes={props.getHomes}
        />
      ))}
    </Container>
  );
};

export default HomeList;
