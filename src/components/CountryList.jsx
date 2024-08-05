import React from 'react';
import Message from './Message';
import Spinner from './Spinner';
import CountryItem from './CountryItem';
import styles from './CountryList.module.css';

function CountryList({ cities, isLoading }) {
  const countries = cities.reduce((acc, city) => {
    const country = acc.find(item => item.country === city.country);
    if (!country) {
      acc.push({
        country: city.country,
        emoji: city.emoji,
      });
    }
    return acc;
  }, []);

  if (!countries.length) {
    return (
      <Message message="Add your first city by clicking a city on the map. Then you can see the list of the countries you have visited" />
    );
  }

  return (
    <ul className={styles.countryList}>
      {isLoading ? (
        <Spinner />
      ) : (
        countries.map(country => (
          <CountryItem
            country={country}
            key={country.country}
          />
        ))
      )}
    </ul>
  );
}

export default CountryList;
