import React, { createContext, useContext, useEffect, useState } from 'react';

const BASE_URL = 'http://localhost:9000';

// 1) Create a new context. This is a hook function just like useEffect and useState. We are storing the context in a variable called CitiesContext.
const CitiesContext = createContext();

// 2) Create a new component called CitiesProvider. This component will be used to wrap the rest of the application. It will provide the cities data to the rest of the application. Add the children prop to the CitiesProvider component. This prop will be used to render the rest of the application.
function CitiesProvider({ children }) {
  // 3) Put all the variables and functions that you want to share with the rest of the application inside the CitiesProvider component.
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  useEffect(function () {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const response = await fetch(`${BASE_URL}/cities`);
        const cities = await response.json();
        setCities(cities);
      } catch {
        alert('Error fetching cities');
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);

  async function getCity(id) {
    try {
      setIsLoading(true);
      const response = await fetch(`${BASE_URL}/cities/${id}`);
      const city = await response.json();
      setCurrentCity(city);
    } catch {
      alert('Error fetching city details');
    } finally {
      setIsLoading(false);
    }
  }

  async function createCity(newCity) {
    try {
      setIsLoading(true);
      const response = await fetch(`${BASE_URL}/cities`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCity),
      });
      const cityData = await response.json();
      setCities(cities => [...cities, cityData]);
    } catch {
      alert('Error creating a city');
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteCity(id) {
    try {
      setIsLoading(true);
      const response = await fetch(`${BASE_URL}/cities/${id}`, {
        method: 'DELETE',
      });

      setCities(cities => cities.filter(city => city.id !== id));
    } catch {
      alert('Error deleting a city');
    } finally {
      setIsLoading(false);
    }
  }

  // 4) Return the CitiesContext.Provider component. This component will wrap the rest of the application and provide the cities data to the rest of the application.
  return (
    <CitiesContext.Provider
      //5) Pass the cities and isLoading variables to the value prop of the CitiesContext.Provider component. This will make the cities and isLoading variables available to the rest of the application.
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
      }}>
      {children}
    </CitiesContext.Provider>
  );
}

//6)The useCities custom hook is designed to provide an easy way to access the value stored in CitiesContext from any functional component that calls this hook. This hook will return the cities and isLoading variables from the context.
function useCities() {
  const context = useContext(CitiesContext);
  if (!context) {
    throw new Error('useCities must be used within a CitiesProvider');
  }
  return context;
}

//7) Export the useCities and CitiesProvider components so that they can be used in the rest of the application. Use a named export instead of the default so that you can export multiple variables from the same file.
export { CitiesProvider, useCities };
