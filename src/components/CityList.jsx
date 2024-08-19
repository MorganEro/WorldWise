import React from 'react';
import styles from './CityList.module.css';
import Spinner from './Spinner.jsx';
import CityItem from './CityItem';
import Message from './Message.jsx';
import { useCities } from '../contexts/CitiesContext.jsx';

function CityList() {
  //9) deconstruct the cities and isLoading variables from the useCities custom hook
  const { cities, isLoading } = useCities();

  if (!cities.length) {
    return (
      <Message message="Add your first city by clicking a city on the map" />
    );
  }

  return (
    <ul className={styles.cityList}>
      {isLoading ? (
        <Spinner />
      ) : (
        cities.map(city => (
          <CityItem
            city={city}
            key={city.id}
          />
        ))
      )}
    </ul>
  );
}

export default CityList;
