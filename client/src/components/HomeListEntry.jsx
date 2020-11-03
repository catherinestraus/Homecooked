import React from "react";
import HomeEvent from "./HomeEvent.jsx";

const HomeListEntry = (props) => {
  let events = [];

  for (let j = 0; j < props.home.events.length; j++) {
    if (props.donationMin && props.numberOfGuests) {
      if (
        props.home.events[j].donationMin <= props.donationMin &&
        props.numberOfGuests <= props.home.events[j].numberOfGuests
      ) {
        events.push(<HomeEvent event={props.home.events[j]}></HomeEvent>);
      }
    } else {
      events.push(<HomeEvent event={props.home.events[j]}></HomeEvent>);
    }
  }

  let photos = [];
  for (let i = 0; i < props.home.photos.length; i++) {
    photos.push(<img src={props.home.photos[i]} />);
  }

  return (
    <div>
      <div>{props.home.title}</div>
      <div>Type of food: {props.home.typeOfFood}</div>
      <div>Address: {props.home.address}</div>
      <div>{photos}</div>
      <div>{events}</div>
    </div>
  );
};

export default HomeListEntry;
