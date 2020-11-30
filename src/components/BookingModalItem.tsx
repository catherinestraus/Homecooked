import dayjs from "dayjs";
import React from "react";
import styled from "styled-components";
import firebase from "../firebase";
import { Home, HomeEvent } from "../types";
import { getUid } from "../utils";

interface BookingModalItemState {}

interface BookingModalItemProps {
  id: number;
  home: Home;
  event: HomeEvent;
  numberOfGuests: number;
}

class BookingModalItem extends React.Component<
  BookingModalItemProps,
  BookingModalItemState
> {
  render() {
    const { home, event, numberOfGuests } = this.props;
    return (
      <Container>
        <div>Type of food: {home.typeOfFood} </div>
        <div>Address: {home.address}</div>
        <div>
          Date: {dayjs(event.startDate).format("MMMM D, YYYY")}
          {dayjs(event.endDate).format("h A")}
        </div>
        <div>
          Time: {dayjs(event.startDate).format("h A")} -{" "}
          {dayjs(event.endDate).format("h A")}
        </div>
        <div>Minimum donation: ${event.donationMin}</div>
        <div>Guests: {numberOfGuests}</div>

        <CancelBooking {...this.props} />
      </Container>
    );
  }
}

interface CancelBookingProps {
  id: number;
  home: Home;
  event: HomeEvent;
  numberOfGuests: number;
}

function CancelBooking({
  home,
  event,
  numberOfGuests,
  id,
}: CancelBookingProps) {
  const uid = getUid();
  return (
    <CancelButton
      onClick={() => {
        const updates = {
          [`homes/${home.id}/events/${event.id}/numberOfGuests`]:
            event.numberOfGuests + numberOfGuests,
          [`users/${uid}/bookings/${id}`]: null,
        };

        firebase.database().ref().update(updates);
      }}
    >
      Cancel Booking
    </CancelButton>
  );
}

// HOC code
interface BookingModalItemWrapperProps {
  id: number;
  homeId: number;
  eventId: number;
  numberOfGuests: number;
}

interface BookingModalItemWrapperState {
  loading: boolean;
  home?: Home;
  event?: HomeEvent;
}

class BookingModalItemWrapper extends React.Component<
  BookingModalItemWrapperProps,
  BookingModalItemWrapperState
> {
  constructor(props: BookingModalItemWrapperProps) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    const { homeId, eventId } = this.props;
    firebase
      .database()
      .ref(`homes/${homeId}`)
      .on("value", (snapshot) => {
        const home: Home = snapshot.val();

        const event = Object.values(home.events).filter((e: HomeEvent) => {
          return e.id === eventId;
        })[0];

        this.setState({
          home,
          event,
          loading: false,
        });
      });
  }

  render() {
    const { loading, home, event } = this.state;
    const { id, numberOfGuests } = this.props;

    if (loading || !home || !event) {
      return null;
    }

    return (
      <BookingModalItem
        home={home}
        event={event}
        id={id}
        numberOfGuests={numberOfGuests}
      />
    );
  }
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 28%;
  padding: 15px;
  border: solid #2b2d35;
  border-width: 1px 1px;
  border-radius: 10px;
  margin: 0px 8px 8px 0px;
  color: #2b2d35;
`;

const CancelButton = styled.div`
  padding: 5px 10px;
  width: 120px;
  box-shadow: 0px 0px 3px rgba(136, 136, 136, 0.2);
  background-color: #5fd084;
  border-radius: 5px;
  color: #2b2d35;
  cursor: pointer;
  margin-top: 10px;
`;

export default BookingModalItemWrapper;
