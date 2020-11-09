import React from "react";
import { getUid } from "../utils";
import firebase from "firebase";
import Modal from "./Modal.jsx";

class BookingsModal extends React.Component {
  constructor(props) {
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
          bookings: Object.values(snapshot.val()),
        });
      });
  }

  render() {
    return (
      <Modal {...this.props}>
        {this.state.bookings.map((booking) => {
          return <div>{JSON.stringify(booking)}</div>;
        })}
      </Modal>
    );
  }
}

export default BookingsModal;
