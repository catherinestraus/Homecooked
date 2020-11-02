import React from 'react';

class HomeEvent extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      guestCount: 0
    }
  }

  bookListing (guests) => {
    $.ajax({
      url: `/api/book`,
      type: "POST",
      data: JSON.stringify({
        eventId: this.props.event._id,
        guests: guests
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
        <input onChange={(e) => {
          this.setState({
            guestCount: e.target.value
          })
        }} />
        <button onClick={() => {
          this.bookListing(this.state.guestCount)
        }}>Book</button>
      </div>
    )
  }
}

export default HomeListEntry;