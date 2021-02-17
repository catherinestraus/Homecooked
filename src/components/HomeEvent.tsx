import dayjs from "dayjs";
import React from "react";
import styled from "styled-components";
import firebase from "../firebase";
import { Home, HomeEvent as HomeEventType } from "../types";

interface HomeEventProps {
  home: Home;
  event: HomeEventType;
}

interface HomeEventState {
  guestCount: number;
}

class HomeEvent extends React.Component<HomeEventProps, HomeEventState> {
  constructor(props: HomeEventProps) {
    super(props);

    this.state = {
      guestCount: 0,
    };
  }

  async bookListing(guests: number) {
    const { home, event } = this.props;
    const myUser = firebase.auth().currentUser;

    if (!myUser) {
      return null;
    }

    const myUserId = myUser.uid;

    if (event.numberOfGuests >= guests) {
      const { committed, snapshot } = await firebase
        .database()
        .ref(`homes/${home.id}/events/${event.id}/numberOfGuests`)
        .transaction((numberOfGuests) => {
          if (!numberOfGuests) {
            return null;
          }

          if (numberOfGuests >= guests) {
            return numberOfGuests - guests;
          }

          return numberOfGuests;
        });

      if (!committed || snapshot.val() !== event.numberOfGuests - guests) {
        console.error(
          "Multiple people tried to book the same reservation and you couldn't get the booking"
        );
        return;
      }

      const newBookingKey = firebase
        .database()
        .ref(`users/${myUserId}/bookings/`)
        .push().key;

      firebase
        .database()
        .ref(`users/${myUserId}/bookings/${newBookingKey}`)
        .set({
          id: newBookingKey,
          homeId: home.id,
          eventId: event.id,
          numberOfGuests: guests,
        });

      this.setState({
        guestCount: 0,
      });
    }
  }

  render() {
    return (
      <Container>
        <div>
          Date: {dayjs(this.props.event.startDate).format("MMMM D, YYYY")}
          <div>
            Time: {dayjs(this.props.event.startDate).format("h A")} -{" "}
            {dayjs(this.props.event.endDate).format("h A")}
          </div>
        </div>
        <div>Minimum donation: ${this.props.event.donationMin}</div>
        <div>Maximum guests: {this.props.event.numberOfGuests}</div>

        {this.props.event.numberOfGuests > 0 ? (
          <BookingContainer>
            <Input
              value={this.state.guestCount}
              type="number"
              min={0}
              max={this.props.event.numberOfGuests}
              placeholder="Number of Guests"
              onChange={(e) => {
                this.setState({
                  guestCount: Number(e.target.value),
                });
              }}
            />
            <button
              onClick={() => {
                this.bookListing(this.state.guestCount);
              }}
            >
              Book
            </button>
          </BookingContainer>
        ) : null}
      </Container>
    );
  }
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2px;
  border: solid white;
  border-width: 1px 1px;
  border-radius: 10px;
  margin: 0px 15px 10px 0px;
`;

const BookingContainer = styled.div`
  display: flex;
`;

const Input = styled.input`
  width: 40px;
`;

export default HomeEvent;
