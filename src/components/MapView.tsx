import {
  GoogleAPI,
  GoogleApiWrapper,
  IMapProps,
  Map,
  Marker,
} from "google-maps-react";
import React from "react";
import mapConfig from "../MapConfig";
import firebase from "../firebase";
import { Filters, Home, Place } from "../types";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

interface MapViewProps {
  filter: Filters;
  homes: Home[];
  onMarkerClick: (homeId: number) => void;
  google: GoogleAPI;
}

interface MapViewState {
  places: Place[];
}

class MapView extends React.Component<MapViewProps, MapViewState> {
  mapProps?: IMapProps;
  map?: google.maps.Map;

  constructor(props: MapViewProps) {
    super(props);
    this.state = {
      places: [],
    };

    this.fetchPlaces = this.fetchPlaces.bind(this);
    this.onMapMount = this.onMapMount.bind(this);
  }

  componentDidUpdate(prevProps: MapViewProps) {
    if (prevProps.filter !== this.props.filter) {
      if (this.mapProps && this.map) {
        this.setState({
          places: [],
        });
        this.fetchPlaces();
      }
    }
  }

  onMapMount(mapProps?: IMapProps, map?: google.maps.Map) {
    this.mapProps = mapProps;
    this.map = map;
    this.fetchPlaces();
  }

  async fetchPlaces() {
    let { homes } = this.props;
    homes = Object.values(homes);

    firebase
      .database()
      .ref("/mappings")
      .once("value")
      .then(async (snap) => {
        const mappings = snap.val() ?? {};

        if (!this.mapProps) {
          return;
        }

        if (!this.map) {
          return;
        }

        const newPlaces = [];

        const needsGeocoding = this.props.homes.filter((home) => {
          return !mappings[home.address];
        });

        const needsNoGeocoding = this.props.homes.filter((home) => {
          return mappings[home.address];
        });

        const noGeocodePlaces = needsNoGeocoding.map((h) => {
          return {
            homeId: h.id,
            name: mappings[h.address].name,
            lat: mappings[h.address].lat,
            lng: mappings[h.address].lng,
          };
        });

        this.setState((state) => {
          const newState = Object.assign({}, state) as MapViewState;
          newState.places = noGeocodePlaces;
          return newState;
        });

        const { google } = this.mapProps;

        const service = new google.maps.places.PlacesService(this.map);

        for (const home of needsGeocoding) {
          const request = {
            query: home.address,
            fields: ["name", "geometry"],
          };
          service.findPlaceFromQuery(
            request,
            async (results: any, status: any) => {
              if (status === google.maps.places.PlacesServiceStatus.OK) {
                for (const result of results) {
                  const cleanResult = {
                    name: result.name,
                    lat: result.geometry.location.lat(),
                    lng: result.geometry.location.lng(),
                  };

                  await firebase
                    .database()
                    .ref(`/mappings/${home.address}`)
                    .set(cleanResult);

                  this.setState((state) => {
                    state.places.push({
                      homeId: home.id,
                      ...cleanResult,
                    });
                    return state;
                  });
                }
              }
            }
          );

          await sleep(500);
        }
      });
  }

  render() {
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
            const home = this.props.homes.filter(
              (h) => h.id === place.homeId
            )[0];

            return (
              <Marker
                key={place.name}
                onClick={() => {
                  this.props.onMarkerClick(place.homeId);
                }}
                icon={`${process.env.PUBLIC_URL}/images/${
                  home && home.active ? "green" : "red"
                }-marker-icon.png`}
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
})(MapView);
