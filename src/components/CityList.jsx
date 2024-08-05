import React from 'react';
import styles from './CityList.module.css';
import Spinner from './Spinner.jsx';
import CityItem from './CityItem';
import Message from './Message.jsx';

function CityList({ cities, isLoading }) {
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
