import React from 'react';

class HomeListEntry extends React.Component {
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
        listingId: this.props.home._id,
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
      </div>
    )
  }
}

export default HomeListEntry;