import firebase from "firebase";
import React from "react";
import { Booking } from "../types";
import { getUid } from "../utils";
import BookingModalItem from "./BookingModalItem";
import Modal from "./Modal";

interface BookingsModalState {
  bookings: Booking[];
}

interface BookingsModalProps {
  close: () => void;
}

class BookingsModal extends React.Component<
  BookingsModalProps,
  BookingsModalState
> {
  constructor(props: BookingsModalProps) {
    super(props);

    this.state = {
      bookings: [],
    };
  }

  componentDidMount() {
    const myUserId = getUid();
    firebase
      .database()
      .ref(`users/${myUserId}/bookings`)
      .on("value", (snapshot) => {
        this.setState({
          bookings: Object.values(snapshot.val() ?? {}),
        });
      });
  }

  render() {
    return (
      <Modal {...this.props}>
        {this.state.bookings.map((booking) => {
          return <BookingModalItem {...booking} />;
        })}
      </Modal>
    );
  }
}

export default BookingsModal;
