import PropTypes from 'prop-types';
import React, { useState } from 'react';
import PlanetsContext from './planetsContext';

function PlanetsProvider(props) {
  const [endpoint, setEndpoint] = useState('https://swapi-trybe.herokuapp.com/api/planets/');
  const [filteredName, setFilteredName] = useState('');
  const [numericFilter, setNumericFilter] = useState([]);

  const setEndpointState = (data) => {
    setEndpoint(data);
  };

  const [planetsList, setPlanetsList] = useState([]);

  const getPlanets = async () => {
    if (planetsList.length === 0) {
      const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
      const data = await response.json();
      const finalData = data.results.filter((key) => delete key.residents);
      setPlanetsList(finalData);
    }
  };

  const { children } = props;

  const setFilteredNameState = {
    filterByName: {
      filteredName,
    },
    setFilteredName,
  };

  const setNumericFilterState = { numericFilter, setNumericFilter };

  return (
    <PlanetsContext.Provider
      value={
        { endpoint,
          setEndpointState,
          getPlanets,
          planetsList,
          setPlanetsList,
          setFilteredNameState,
          setNumericFilterState }
      }
    >
      {children}
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
}.isRequired;

export default PlanetsProvider;
