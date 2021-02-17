import React from "react";
import styled from "styled-components";
import firebase from "../firebase";
import { Filters, Home } from "../types";
import BookingsModal from "./BookingsModal";
import FilterBar from "./FilterBar";
import HomeList from "./HomeList";
import MapView from "./MapView";
import berry from "../images/berry.png";

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
  padding: 6px;
  cursor: pointer;
  position: absolute;
  top: 80px;
  left: 79%;
  width: 170px;
  background-color: #5fd084;
  border-radius: 10px;
  font-size: 20px;
  font-weight: bold;
  color: #2b2d34;
  border-width: 0px;
  outline: none;
  cursor: pointer;
  text-align: center;
`;

const LogOutButton = styled.button`
  width: 125px;
  background-color: #e2e0e5;
  border-radius: 10px;
  font-size: 20px;
  font-weight: bold;
  color: #2b2d34;
  border-width: 0px;
  outline: none;
  cursor: pointer;
  padding: 6px;
  margin-bottom: 20px;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Title = styled.div`
  font-size: 45px;
  font-weight: bold;
  color: white;
`;

const Berry = styled.img`
  height: 60px;
  width: 60px;
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
        {this.state.showBookingsModal ? (
          <BookingsModal
            close={() => {
              this.setState({
                showBookingsModal: false,
              });
            }}
          />
        ) : null}

        <TitleContainer>
          <Title>Homecooked</Title>
          <Berry src={berry}></Berry>
        </TitleContainer>
        <TopBar>
          <FilterBar changeFilter={this.changeFilter} />
        </TopBar>
        <MyBookingsButton
          onClick={() => {
            this.setState({
              showBookingsModal: true,
            });
          }}
        >
          My Bookings
        </MyBookingsButton>

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

        <LogOutButton
          onClick={() => {
            firebase.auth().signOut();
          }}
        >
          Log out
        </LogOutButton>
      </AppContainer>
    );
  }
}

export default App;
