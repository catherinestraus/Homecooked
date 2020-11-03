import React from "react";
import dayjs from "dayjs";

class HomeEvent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      guestCount: 0,
    };
  }

  bookListing(guests) {
    $.ajax({
      url: `/api/book`,
      type: "POST",
      data: JSON.stringify({
        eventId: this.props.event._id,
        guests: guests,
      }),
      contentType: "application/json",
      dataType: "json",
      success: (responseData) => {
        this.props.getHomes();
      },
    });
  }

  render() {
    return (
      <div>
        <div>
          {dayjs(this.props.event.startDate).format("MMMM D, YYYY h A")} -{" "}
          {dayjs(this.props.event.endDate).format("h A")}
        </div>
        <div>Minimum donation: ${this.props.event.donationMin}</div>
        <input
          type="number"
          placeholder="Number of Guests"
          onChange={(e) => {
            this.setState({
              guestCount: e.target.value,
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
      </div>
    );
  }
}

export default HomeEvent;
