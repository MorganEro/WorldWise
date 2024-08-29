import React, { createContext, useContext, useReducer } from 'react';

const FAKE_USER = {
  name: 'Jack',
  email: 'jack@example.com',
  password: 'qwerty',
  avatar: 'https://i.pravatar.cc/100?u=zz',
};

// 1) Create a new context. This is a hook function just like useEffect and useState. We are storing the context in a variable called AuthContext.
const AuthContext = createContext();

// 2) Create a new component called AuthProvider. This component will be used to wrap the rest of the application. It will provide the user data to the rest of the application. Add the children prop to the CitiesProvider component. This prop will be used to render the rest of the application.
function AuthProvider({ children }) {
  // 3) Put all the variables and functions that you want to share with the rest of the application inside the AuthProvider component.

  // Define the initial state of your application
  const initialState = {
    user: null,
    isAuthenticated: false,
  };

  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  // Define the reducer function that will manage the state updates
  function reducer(state, action) {
    switch (action.type) {
      case 'login':
        return {
          ...state,
          user: action.payload,
          isAuthenticated: true,
        };
      case 'logout':
        return {
          ...state,
          user: null,
          isAuthenticated: false,
        };
      default:
        throw new Error('Unknown action type');
    }
  }

  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({ type: 'login', payload: FAKE_USER });
    }
  }

  function logout() {
    dispatch({ type: 'logout' });
  }

  // 4) Return the AuthContext.Provider component. This component will wrap the rest of the application and provide the user data to the rest of the application.
  return (
    <AuthContext.Provider
      //5) Pass the states, variables, and functions to the value prop of the AuthContext.Provider component. This will make these states and variables available to the rest of the application.
      value={{
        user,
        isAuthenticated,
        login,
        logout,
      }}>
      {children}
    </AuthContext.Provider>
  );
}

//6)The useAuth custom hook is designed to provide an easy way to access the value stored in AuthContext from any functional component that calls this hook. This hook will return the Auth and isLoading variables from the context.
function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
}

//7) Export the useAuth and AuthProvider components so that they can be used in the rest of the application. Use a named export instead of the default so that you can export multiple variables from the same file.
export { AuthProvider, useAuth };
