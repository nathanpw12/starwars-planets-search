import React, { useContext, useEffect, useState } from 'react';
import PlanetsContext from '../context/planetsContext';

function Table() {
  const { planetsList, getPlanets } = useContext(PlanetsContext);
  getPlanets();

  const { setFilteredNameState: { filterByName: { filteredName },
    setFilteredName } } = useContext(PlanetsContext);

  const { setNumericFilterState:
      { numericFilter, setNumericFilter } } = useContext(PlanetsContext);

  const [selectsFilter, setSelectsFilter] = useState({
    column: 'population',
    comparison: 'maior que',
    value: '0',
  });

  // const [populationOption, setPopulationOption] = useState('population');

  // const [options, setOptions] = useState(
  //   ['population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'],
  // );

  const allOptions = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];

  const optionsFilter = allOptions.filter(
    (column) => !numericFilter.some((options) => column === options.column),
  );

  useEffect(() => {
    setSelectsFilter((elements) => ({ ...elements, column: optionsFilter[0] }));
  }, [numericFilter]);

  const handleChange = ({ target }) => {
    const { name } = target;
    setSelectsFilter({ ...selectsFilter, [name]: target.value });
    // setOptions(options.filter((option) => option !== populationOption));
    // setPopulationOption('population');
  };

  return (
    <div>

      <h1>StarWars Planets Search</h1>

      <input
        type="text"
        data-testid="name-filter"
        placeholder="search for a planet by name here"
        value={ filteredName }
        onChange={ (e) => setFilteredName(e.target.value) }
      />

      <select
        name="column"
        value={ selectsFilter.column }
        onChange={ handleChange }
        data-testid="column-filter"
      >
        {optionsFilter.map((collumn) => (
          <option key={ collumn } value={ collumn }>
            {collumn}
          </option>
        ))}
      </select>

      <select
        name="comparison"
        data-testid="comparison-filter"
        value={ selectsFilter.comparison }
        onChange={ handleChange }
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>

      <input
        type="number"
        data-testid="value-filter"
        className="value-fil"
        name="value"
        value={ selectsFilter.value }
        onChange={ handleChange }
      />

      <button
        type="button"
        data-testid="button-filter"
        onClick={ () => setNumericFilter([...numericFilter, selectsFilter]) }
      >
        Filtrar
      </button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {planetsList
            .filter((data) => data.name.includes(filteredName))
            .filter((data) => numericFilter.every(({ column, comparison, value }) => {
              if (comparison === 'menor que') {
                return +data[column] < +value;
              } if (comparison === 'maior que') {
                return +data[column] > +value;
              }
              return +data[column] === +value;
            }))
            .map((data) => (
              <tr key={ data.name }>
                <td>{data.name}</td>
                <td>{data.rotation_period}</td>
                <td>{data.orbital_period}</td>
                <td>{data.diameter}</td>
                <td>{data.climate}</td>
                <td>{data.gravity}</td>
                <td>{data.terrain}</td>
                <td>{data.surface_water}</td>
                <td>{data.population}</td>
                <td>{data.films}</td>
                <td>{data.created}</td>
                <td>{data.edite}</td>
                <td>{data.url}</td>
              </tr>))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
