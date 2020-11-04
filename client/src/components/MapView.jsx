import React from "react";
import mapConfig from "../MapConfig.js";
import {
  Map,
  InfoWindow,
  Listing,
  Marker,
  GoogleApiWrapper,
} from "google-maps-react";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

class MapContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      places: [],
    };

    this.fetchPlaces = this.fetchPlaces.bind(this);
    this.onMapMount = this.onMapMount.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.filter !== this.props.filter) {
      if (this.mapProps && this.map) {
        this.setState({
          places: [],
        });
        this.fetchPlaces();
      }
    }
  }

  onMapMount(mapProps, map) {
    this.mapProps = mapProps;
    this.map = map;
    this.fetchPlaces();
  }

  async fetchPlaces() {
    const { homes } = this.props;
    const { google } = this.mapProps;
    const service = new google.maps.places.PlacesService(this.map);

    for (const home of homes) {
      const request = {
        query: home.address,
        fields: ["name", "geometry"],
      };
      service.findPlaceFromQuery(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          this.setState((state) => {
            for (const result of results) {
              state.places.push({
                homeId: home._id,
                name: result.name,
                lat: result.geometry.location.lat(),
                lng: result.geometry.location.lng(),
              });
            }
            return state;
          });
        }
      });

      await sleep(500);
    }
  }

  render() {
    console.log(this.state.places);
    return (
      <div>
        <Map
          google={this.props.google}
          zoom={14}
          // 25 Balboa address
          initialCenter={{
            lat: 37.7775907,
            lng: -122.461523,
          }}
          containerStyle={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            height: 300,
          }}
          onReady={this.onMapMount}
        >
          {this.state.places.map((place, key) => {
            return (
              <Marker
                key={place.name}
                onClick={() => {
                  console.log("Firing on marker click", place);
                  this.props.onMarkerClick(place.homeId);
                }}
                name={place.name}
                position={{
                  lat: place.lat,
                  lng: place.lng,
                }}
              />
            );
          })}
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: mapConfig.API_KEY,
})(MapContainer);
