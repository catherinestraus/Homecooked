import React from "react";
import styled from "styled-components";
import { Home } from "../types";
import HomeListEntry from "./HomeListEntry";
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

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  padding: 20px 0px 20px 0px;
`;

export default HomeList;
