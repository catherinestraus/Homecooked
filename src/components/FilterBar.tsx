import React, { CSSProperties } from "react";
import Select from "react-select";
import { Props } from "react-select/src/styles";
import styled from "styled-components";
import type { Filters } from "../types";

const Container = styled.div`
  flex: 1;
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

interface FilterBarProps {
  changeFilter: (filter: Filters) => void;
}

class FilterBar extends React.Component<FilterBarProps, Filters> {
  constructor(props: FilterBarProps) {
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
      option: (provided: CSSProperties, state: Props) => ({
        ...provided,
        padding: 5,
      }),
      control: (provided: CSSProperties) => ({
        ...provided,
        width: 450,
      }),
      singleValue: (provided: CSSProperties, state: Props) => {
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
          defaultValue={{
            value: foods[0],
            label: foods[0],
          }}
          isSearchable={true}
          options={foodOptions}
          onChange={(selectedOptions) => {
            this.setState({
              typeOfFood: selectedOptions
                ? // @ts-ignore
                  selectedOptions.map((o) => o.value)
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
