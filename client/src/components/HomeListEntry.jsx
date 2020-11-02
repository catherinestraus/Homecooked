import React from "react";
import HomeEvent from "./HomeEvent.jsx";

class HomeListEntry extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      events: [],
    };
  }

  getEvents() {
    $.ajax({
      url: `/api/home/${this.props.home._id}/events`,
      type: "GET",
      dataType: "json",
      success: (responseData) => {
        this.setState({
          events: responseData,
        });
      },
    });
  }

  render() {
    let events = [];
    for (let i = 0; i < events.length; i++) {
      events.push(<HomeEvent event={this.state.events[i]}></HomeEvent>);
    }

    let photos = [];
    for (let i = 0; i < this.props.home.photos.length; i++) {
      photos.push(<img src={this.props.home.photos[i]} />);
    }

    return (
      <div>
        <div>{this.props.home.title}</div>
        <div>{this.props.home.typeOfFood}</div>
        <div>{this.props.home.address}</div>
        <div>{photos}</div>
        <div>{events}</div>
      </div>
    );
  }
}

export default HomeListEntry;
