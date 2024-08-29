import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from 'react';

const BASE_URL = 'http://localhost:9000';

// 1) Create a new context. This is a hook function just like useEffect and useState. We are storing the context in a variable called CitiesContext.
const CitiesContext = createContext();

// 2) Create a new component called CitiesProvider. This component will be used to wrap the rest of the application. It will provide the cities data to the rest of the application. Add the children prop to the CitiesProvider component. This prop will be used to render the rest of the application.
function CitiesProvider({ children }) {
  // 3) Put all the variables and functions that you want to share with the rest of the application inside the CitiesProvider component.

  //define the initial state
  const initialState = {
    cities: [],
    isLoading: false,
    currentCity: {},
    error: '',
  };

  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    cityReducer,
    initialState
  );

  //define a reducer function to handle the state changes
  function cityReducer(state, action) {
    switch (action.type) {
      case 'loading':
        return {
          ...state,
          isLoading: true,
        };
      case 'cities/loaded':
        return {
          ...state,
          isLoading: false,
          cities: action.payload,
        };
      case 'city/loaded':
        return {
          ...state,
          isLoading: false,
          currentCity: action.payload,
        };

      case 'city/created':
        return {
          ...state,
          isLoading: false,
          cities: [...state.cities, action.payload],
          currentCity: action.payload,
        };

      case 'city/deleted':
        return {
          ...state,
          cities: state.cities.filter(city => city.id !== action.payload),
          currentCity: {},
        };

      case 'rejected':
        return {
          ...state,
          isLoading: false,
          error: action.payload,
        };

      default:
        throw new Error(`Unsupported action type: ${action.type}`);
    }
  }

  useEffect(function () {
    async function fetchCities() {
      dispatch({ type: 'loading' });
      try {
        const response = await fetch(`${BASE_URL}/cities`);
        const cities = await response.json();
        dispatch({ type: 'cities/loaded', payload: cities });
      } catch {
        alert('Error fetching cities');
      } finally {
        dispatch({ type: 'rejected', payload: 'Error fetching cities' });
      }
    }
    fetchCities();
  }, []);

  const getCity = useCallback(
    async function getCity(id) {
      if (Number(id) === currentCity.id) return;

      dispatch({ type: 'loading' });
      try {
        const response = await fetch(`${BASE_URL}/cities/${id}`);
        const city = await response.json();
        dispatch({ type: 'city/loaded', payload: city });
      } catch {
        alert('Error fetching city details');
      } finally {
        dispatch({ type: 'rejected', payload: 'Error fetching city details' });
      }
    },

    [currentCity.id]
  );

  async function createCity(newCity) {
    dispatch({ type: 'loading' });
    try {
      const response = await fetch(`${BASE_URL}/cities`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCity),
      });
      const cityData = await response.json();
      dispatch({ type: 'city/created', payload: cityData });
    } catch {
      alert('Error creating a city');
    } finally {
      dispatch({ type: 'rejected', payload: 'Error creating a city' });
    }
  }

  async function deleteCity(id) {
    dispatch({ type: 'loading' });
    try {
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: 'DELETE',
      });

      dispatch({ type: 'city/deleted', payload: id });
    } catch {
      alert('Error deleting a city');
    } finally {
      dispatch({ type: 'rejected', payload: 'Error deleting the city' });
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
        error,
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
