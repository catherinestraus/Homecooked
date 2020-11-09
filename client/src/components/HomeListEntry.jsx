import React from "react";
import HomeEvent from "./HomeEvent.jsx";
import dayjs from "dayjs";
import styled from "styled-components";
import Highlighter from "react-highlight-words";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
  padding: 15px;
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

const Image = styled.img`
  display: flex;
  flex-direction: column;
  width: 115px;
  height: 115px;
  object-fit: cover;
`;

const HomeListEntry = (props) => {
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
    if (props.donationMin && props.numberOfGuests) {
      if (
        sortedEvents[j].donationMin <= props.donationMin &&
        props.numberOfGuests <= sortedEvents[j].numberOfGuests
      ) {
        eventElements.push(<HomeEvent event={sortedEvents[j]}></HomeEvent>);
      }
    } else {
      eventElements.push(<HomeEvent event={sortedEvents[j]}></HomeEvent>);
    }
  }

  let photos = [];
  const homePhotos = Object.values(props.home.photos);
  for (let i = 0; i < homePhotos.length; i++) {
    photos.push(<Image src={homePhotos[i]} />);
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
          <div>{photos}</div>
        </RightContainer>
      </BottomContainer>
    </Container>
  );
};

export default HomeListEntry;
