import React from "react";
import $ from "jquery";
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filter: { typeOfFood: [], numberOfGuests: 0, donationMin: 0 },
      homes: [],
    };

    this.getHomes = this.getHomes.bind(this);
  }

  componentDidMount() {
    this.getHomes();
  }

  // type of food is an array of strings
  // min donation, needs to be <= than
  // number of guests, needs to be >=
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

  isEmpty() {
    const { typeOfFood, donationMin, numberOfGuests } = this.state.filter;

    return !typeOfFood.length && !numberOfGuests && !donationMin;
  }

  render() {
    const {
      filter: { typeOfFood, donationMin, numberOfGuests },
      homes,
    } = this.state;
    let homeDisplayed = homes;

    if (!this.isEmpty()) {
      homeDisplayed = [];
      for (let i = 0; i < homes.length; i++) {
        if (
          typeOfFood.contains(homes[i].typeOfFood) &&
          homes[i].donationMin <= donationMin &&
          responseData[i].numberOfGuests >= numberOfGuests
        ) {
          homeDisplayed.push(homes[i]);
        }
      }
    }

    return (
      <>
        <AppContainer>
          <GlobalStyle />

          <HomeList homesDisplayed={homeDisplayed} getHomes={this.getHomes} />
        </AppContainer>
      </>
    );
  }
}

export default App;
