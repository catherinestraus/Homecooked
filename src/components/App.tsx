import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import firebase from "../firebase";
import { Filters, Home } from "../types";
import BookingsModal from "./BookingsModal";
import FilterBar from "./FilterBar";
import HomeList from "./HomeList";
import MapView from "./MapView";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: Circular, -apple-system, system-ui, Roboto;
    color: rgb(34, 34, 34);
    position: relative;
  }
  body.modal-open {
    overflow: hidden;
  }
  input {
    font-family: Circular, -apple-system, system-ui, Roboto;
    color: rgb(34, 34, 34);
  }
`;

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10%;
  margin-right: 10%;
`;

const TopBar = styled.div`
  display: flex;
  align-items: center;
`;

const MyBookingsButton = styled.div`
  padding: 10px 20px;
  cursor: pointer;
`;

interface AppProps {}

interface AppState {
  filter: Filters;
  homes: Home[];
  showBookingsModal: boolean;
}

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);

    this.state = {
      filter: { typeOfFood: [], numberOfGuests: 0, donationMin: 0 },
      homes: [],
      showBookingsModal: false,
    };

    this.getHomes = this.getHomes.bind(this);
    this.changeFilter = this.changeFilter.bind(this);
    this.onMarkerClick = this.onMarkerClick.bind(this);
  }

  componentDidMount() {
    const user = firebase.auth().currentUser;

    this.getHomes();
  }

  getHomes() {
    firebase
      .database()
      .ref("homes")
      .on("value", (snapshot) => {
        const data = snapshot.val();

        this.setState({
          homes: Object.values(data),
        });
      });
  }

  changeFilter(filters: Filters) {
    this.setState({
      filter: filters,
    });
  }

  onMarkerClick(homeId: number) {
    const newHomes = this.state.homes.map((h) => {
      return Object.assign({}, h, {
        active: h.id === homeId,
      });
    });

    this.setState({
      homes: newHomes,
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

          const homeEvents = Object.values(home.events);
          for (let j = 0; j < homeEvents.length; j++) {
            if (
              homeEvents[j].donationMin <= donationMin &&
              numberOfGuests <= homeEvents[j].numberOfGuests
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

    homeDisplayed.sort((homeOne: Home, homeTwo: Home) => {
      if (homeOne.active && !homeTwo.active) {
        return -1;
      }

      if (homeTwo.active && !homeOne.active) {
        return 1;
      }

      return 0;
    });

    return (
      <AppContainer>
        <GlobalStyle />

        {this.state.showBookingsModal ? (
          <BookingsModal
            close={() => {
              this.setState({
                showBookingsModal: false,
              });
            }}
          />
        ) : null}

        <TopBar>
          <FilterBar changeFilter={this.changeFilter} />
          <MyBookingsButton
            onClick={() => {
              this.setState({
                showBookingsModal: true,
              });
            }}
          >
            My Bookings
          </MyBookingsButton>
        </TopBar>

        {this.state.homes.length > 0 ? (
          <MapView
            filter={this.state.filter}
            homes={homeDisplayed}
            onMarkerClick={this.onMarkerClick}
          />
        ) : null}

        <HomeList
          homeDisplayed={homeDisplayed}
          donationMin={donationMin}
          numberOfGuests={numberOfGuests}
          getHomes={this.getHomes}
        />

        <div
          onClick={() => {
            firebase.auth().signOut();
          }}
        >
          Log out
        </div>
      </AppContainer>
    );
  }
}

export default App;
