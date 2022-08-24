import React, { useContext } from 'react';
import PlanetsContext from '../context/planetsContext';

function Table() {
  const { planetsList, getPlanets } = useContext(PlanetsContext);
  getPlanets();

  const { setFilteredNameState: { filterByName: { filteredName },
    setFilteredName } } = useContext(PlanetsContext);

  return (
    <div>
      <h1>StarWars Planets Search</h1>
      <input
        type="text"
        data-testid="name-filter"
        placeholder="search for a planet here"
        value={ filteredName }
        onChange={ (e) => setFilteredName(e.target.value) }
      />

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
          {planetsList.filter((data) => data.name.includes(filteredName)).map((data) => (
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
