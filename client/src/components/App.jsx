import React from "react";
import $ from "jquery";
import styled from "styled-components";
import HomeList from "./HomeList";
import FilterBar from "./FilterBar";
import { createGlobalStyle } from "styled-components";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filter: { typeOfFood: [], numberOfGuests: 0, donationMin: 0 },
      homes: [],
    };

    this.getHomes = this.getHomes.bind(this);
    this.changeFilter = this.changeFilter.bind(this);
  }

  componentDidMount() {
    this.getHomes();
  }

  getHomes() {
    $.ajax({
      url: `/api/homes`,
      type: "GET",
      dataType: "json",
      success: (responseData) => {
        this.setState({
          homes: responseData,
        });
      },
    });
  }

  changeFilter(filters) {
    console.log("filters", filters);
    this.setState({
      filter: filters,
    });
  }

  isEmpty() {
    const { typeOfFood, donationMin, numberOfGuests } = this.state.filter;

    return !typeOfFood.length && !numberOfGuests && !donationMin;
  }

  render() {
    const {
      filter: { typeOfFood, donationMin, numberOfGuests },
      homes,
    } = this.state;
    console.log("Rendering filter", typeOfFood);
    let homeDisplayed = homes;

    if (!this.isEmpty()) {
      homeDisplayed = [];
      for (let i = 0; i < homes.length; i++) {
        console.log("Home constraint", i, homes[i]);
        if (
          typeOfFood.includes(homes[i].typeOfFood)
          // homes[i].donationMin <= donationMin &&
          // homes[i].numberOfGuests >= numberOfGuests
        ) {
          homeDisplayed.push(homes[i]);
        }
      }
    }

    return (
      <div>
        <FilterBar changeFilter={this.changeFilter} />
        <HomeList homeDisplayed={homeDisplayed} getHomes={this.getHomes} />
      </div>
    );
  }
}

export default App;
