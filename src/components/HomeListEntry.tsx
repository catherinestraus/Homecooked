import dayjs from "dayjs";
import React from "react";
import Highlighter from "react-highlight-words";
import styled from "styled-components";
import { Home } from "../types";
import HomeEvent from "./HomeEvent";
import Photos from "./Photos";

interface HomeListEntryProps {
  home: Home;
  donationMin: number;
  numberOfGuests: number;
  getHomes: () => void;
}

const HomeListEntry = (props: HomeListEntryProps) => {
  let eventElements = [];

  const sortedEvents = Object.values(props.home.events);
  sortedEvents.sort((eventOne, eventTwo) => {
    const startOne = dayjs(eventOne.startDate);
    const startTwo = dayjs(eventTwo.startDate);

    if (startOne.isAfter(startTwo)) {
      return 1;
    } else {
      return -1;
    }
  });

  for (let j = 0; j < sortedEvents.length; j++) {
    if (sortedEvents[j].numberOfGuests === 0) {
      continue;
    }
    if (props.donationMin && props.numberOfGuests) {
      if (
        sortedEvents[j].donationMin <= props.donationMin &&
        props.numberOfGuests <= sortedEvents[j].numberOfGuests
      ) {
        eventElements.push(
          <HomeEvent
            key={j}
            home={props.home}
            event={sortedEvents[j]}
          ></HomeEvent>
        );
      }
    } else {
      eventElements.push(
        <HomeEvent
          key={j}
          home={props.home}
          event={sortedEvents[j]}
        ></HomeEvent>
      );
    }
  }

  return (
    <Container>
      <div>
        {props.home.active ? (
          <Title>
            <Highlighter
              searchWords={[props.home.title]}
              autoEscape={true}
              textToHighlight={props.home.title}
            />
          </Title>
        ) : (
          <Title>{props.home.title}</Title>
        )}
      </div>
      <BottomContainer>
        <LeftContainer>
          <Bold>Type of food:</Bold>
          <Content>{props.home.typeOfFood}</Content>
          <Bold>Address: </Bold>
          <Content>{props.home.address}</Content>
          <Bold>Bookings: </Bold>
          <div>{eventElements}</div>
        </LeftContainer>

        <RightContainer>
          <Photos photoLinks={props.home.photos} />
        </RightContainer>
      </BottomContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
  padding: 15px;
  border: solid white;
  border-width: 1px 1px;
  border-radius: 10px;
  margin: 0px 8px 8px 0px;
`;

const BottomContainer = styled.div`
  display: flex;
  font-size: 15px;
  line-spacing: 20px;
`;

const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

const Bold = styled.div`
  font-weight: bold;
  padding-top: 20px;
`;

const Content = styled.div`
  padding-right: 5px;
`;

export default HomeListEntry;
