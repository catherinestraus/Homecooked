import React from "react";
import Select from "react-select";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 20px 20px 20px;
`;

const SearchButton = styled.button`
  width: 15%;
`;

const Input = styled.input`
  width: 20%;
`;

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

    const customStyles = {
      option: (provided, state) => ({
        ...provided,
        padding: 5,
      }),
      control: (provided) => ({
        ...provided,
        width: 450,
      }),
      singleValue: (provided, state) => {
        const opacity = state.isDisabled ? 0.5 : 1;
        const transition = "opacity 300ms";

        return { ...provided, opacity, transition };
      },
    };
    return (
      <Container>
        <Select
          styles={customStyles}
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

        <Input
          type="number"
          placeholder="Number of Guests"
          onChange={(e) => {
            this.setState({
              numberOfGuests: Number(e.target.value),
            });
          }}
        />

        <Input
          type="number"
          placeholder="Donation Minimum"
          onChange={(e) => {
            this.setState({
              donationMin: Number(e.target.value),
            });
          }}
        />

        <SearchButton
          onClick={() => {
            this.props.changeFilter(this.state);
          }}
        >
          Search
        </SearchButton>
      </Container>
    );
  }
}

export default FilterBar;
