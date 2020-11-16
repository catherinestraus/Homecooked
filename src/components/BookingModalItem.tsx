import dayjs from "dayjs";
import React from "react";
import styled from "styled-components";
import firebase from "../firebase";
import { Home, HomeEvent } from "../types";
import { getUid } from "../utils";
import Photos from "./Photos";

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
    const { home, event } = this.props;
    return (
      <div>
        <div>Type of food:</div>
        <div>{home.typeOfFood}</div>
        <div>Address: </div>
        <div>{home.address}</div>
        <div>Bookings: </div>

        <div>
          {dayjs(event.startDate).format("MMMM D, YYYY h A")} -{" "}
          {dayjs(event.endDate).format("h A")}
        </div>
        <div>Minimum donation: ${event.donationMin}</div>
        <div>Remaining guests available: {event.numberOfGuests}</div>

        <CancelBooking {...this.props} />

        <Photos photoLinks={home.photos} />
      </div>
    );
  }
}

interface CancelBookingProps {
  id: number;
  home: Home;
  event: HomeEvent;
  numberOfGuests: number;
}

const CancelButton = styled.div`
  padding: 5px 10px;
  width: 120px;
  box-shadow: 0px 0px 3px rgba(136, 136, 136, 0.2);
  background-color: #eb695b;
  border-radius: 5px;
  color: white;
  cursor: pointer;
`;

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

export default BookingModalItemWrapper;
