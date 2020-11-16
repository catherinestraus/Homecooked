import React from "react";
import HomeListEntry from "./HomeListEntry";
import styled from "styled-components";
import { Home } from "../types";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  padding: 20px 20px 20px 20px;
`;

interface HomeListProps {
  homeDisplayed: Home[];
  donationMin: number;
  numberOfGuests: number;
  getHomes: () => void;
}

const HomeList = (props: HomeListProps) => {
  return (
    <Container>
      {props.homeDisplayed.map((home) => (
        <HomeListEntry
          key={home.id}
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
