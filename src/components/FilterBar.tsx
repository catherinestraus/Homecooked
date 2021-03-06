import React, { CSSProperties } from "react";
import Select from "react-select";
import { Props } from "react-select/src/styles";
import styled from "styled-components";
import { FOOD_TYPES } from "../constants";
import type { Filters } from "../types";

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
    const foodOptions = FOOD_TYPES.map((f) => {
      return {
        value: f,
        label: f,
      };
    });

    const customStyles = {
      option: (provided: CSSProperties, state: Props) => ({
        ...provided,
        padding: 5,
        color: "#2b2d34",
      }),
      control: (provided: CSSProperties) => ({
        ...provided,
        width: 450,
        boxShadow: "none",
      }),
      singleValue: (provided: CSSProperties, state: Props) => {
        const opacity = state.isDisabled ? 0.5 : 1;
        const transition = "opacity 300ms";

        return { ...provided, opacity, transition };
      },
    };
    return (
      <Container>
        <Selections>
          <Select
            styles={customStyles}
            isMulti={true}
            defaultValue={{
              value: FOOD_TYPES[0],
              label: FOOD_TYPES[0],
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
        </Selections>

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

const Container = styled.div`
  flex: 1;
  display: flex;
  padding: 20px 0px 20px 0px;
`;

const SearchButton = styled.button`
  width: 125px;
  background-color: #e2e0e5;
  border-radius: 10px;
  font-size: 20px;
  font-weight: bold;
  color: #2b2d34;
  border-width: 0px;
  outline: none;
  cursor: pointer;
`;

const Selections = styled.div`
  display: flex;
  padding-right: 20px;
  color: #2b2d34;
`;

const Input = styled.input`
  width: 20%;
  border-width: 0px;
  outline: none;
`;

export default FilterBar;
