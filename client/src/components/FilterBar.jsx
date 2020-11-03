import React from "react";
import Select from "react-select";

const foods = [
  "Chinese",
  "French",
  "Indian",
  "Italian",
  "Japanese",
  "Korean",
  "Middle-Eastern",
  "Mexican",
  "Southern",
  "Thai",
];

class FilterBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      typeOfFood: [],
      numberOfGuests: 0,
      donationMin: 0,
    };
  }
  render() {
    const foodOptions = foods.map((f) => {
      return {
        value: f,
        label: f,
      };
    });
    return (
      <div>
        <Select
          isMulti={true}
          defaultValue={foods[0]}
          isSearchable={true}
          options={foodOptions}
          onChange={(selectedOptions) => {
            this.setState({
              typeOfFood: selectedOptions
                ? selectedOptions.map((o) => o.value)
                : [],
            });
          }}
        />

        <input
          type="number"
          placeholder="Number of Guests"
          onChange={(e) => {
            this.setState({
              numberOfGuests: Number(e.target.value),
            });
          }}
        />

        <input
          type="number"
          placeholder="Donation Minimum"
          onChange={(e) => {
            this.setState({
              donationMin: Number(e.target.value),
            });
          }}
        />

        <button
          onClick={() => {
            this.props.changeFilter(this.state);
          }}
        >
          Search
        </button>
      </div>
    );
  }
}

export default FilterBar;
