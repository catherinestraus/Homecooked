import React from "react";
import dayjs from "dayjs";
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

  bookListing(guests: number) {
    const { home, event } = this.props;
    const myUser = firebase.auth().currentUser;

    if (!myUser) {
      return null;
    }

    const myUserId = myUser.uid;

    if (event.numberOfGuests >= guests) {
      firebase
        .database()
        .ref(`homes/${home.id}/events/${event.id}/numberOfGuests`)
        .set(event.numberOfGuests - guests);

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
      <div>
        <div>
          {dayjs(this.props.event.startDate).format("MMMM D, YYYY h A")} -{" "}
          {dayjs(this.props.event.endDate).format("h A")}
        </div>
        <div>Minimum donation: ${this.props.event.donationMin}</div>
        <div>Maximum number of guests: {this.props.event.numberOfGuests}</div>

        {this.props.event.numberOfGuests > 0 ? (
          <>
            <input
              value={this.state.guestCount}
              type="number"
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
          </>
        ) : null}
      </div>
    );
  }
}

export default HomeEvent;
