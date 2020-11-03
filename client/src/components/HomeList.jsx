import React from "react";
import HomeListEntry from "./HomeListEntry.jsx";

const HomeList = (props) => {
  return (
    <div className="home-list">
      {props.homeDisplayed.map((home) => (
        <HomeListEntry
          key={home._id}
          home={home}
          donationMin={props.donationMin}
          numberOfGuests={props.numberOfGuests}
          getHomes={props.getHomes}
        />
      ))}
    </div>
  );
};

export default HomeList;
