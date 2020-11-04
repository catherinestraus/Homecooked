import React from "react";
import $ from "jquery";
import HomeList from "./HomeList";
import FilterBar from "./FilterBar";
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    font-family: system-ui;
    color: rgb(34, 34, 34);
  }
  input {
    font-family: system-ui;
    color: rgb(34, 34, 34);
  }
`;

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10%;
  margin-right: 10%;
`;

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

    let homeDisplayed = homes;

    if (!this.isEmpty()) {
      homeDisplayed = [];
      for (let i = 0; i < homes.length; i++) {
        let home = homes[i];
        if (typeOfFood.includes(home.typeOfFood)) {
          let hasEvents = false;
          for (let j = 0; j < home.events.length; j++) {
            if (
              home.events[j].donationMin <= donationMin &&
              numberOfGuests <= home.events[j].numberOfGuests
            ) {
              hasEvents = true;
            }
          }
          if (hasEvents) {
            homeDisplayed.push(home);
          }
        }
      }
    }

    return (
      <AppContainer>
        <GlobalStyle />
        <FilterBar changeFilter={this.changeFilter} />

        <HomeList
          homeDisplayed={homeDisplayed}
          donationMin={donationMin}
          numberOfGuests={numberOfGuests}
          getHomes={this.getHomes}
        />
      </AppContainer>
    );
  }
}

export default App;
