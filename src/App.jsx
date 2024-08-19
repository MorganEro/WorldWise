import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import AppLayout from './pages/AppLayout.jsx';
import CityList from './components/CityList.jsx';
import City from './components/City.jsx';
import CountryList from './components/CountryList.jsx';
import Form from './components/Form.jsx';
import Homepage from './pages/Homepage.jsx';
import Login from './pages/Login.jsx';
import PageNotFound from './pages/PageNotFound.jsx';
import Product from './pages/Product.jsx';
import Pricing from './pages/Pricing.jsx';
import { CitiesProvider } from './contexts/CitiesContext.jsx';
import { AuthProvider } from './contexts/FakeAuthContext.jsx';
import ProtectedRoute from './pages/ProtectedRoute.jsx';

function App() {
  return (
    //8) Wrap the entire application in the CitiesProvider component. This will provide the CitiesContext data to the rest of the application.
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={<Homepage />}
            />
            <Route
              path="pricing"
              element={<Pricing />}
            />
            <Route
              path="product"
              element={<Product />}
            />
            <Route
              path="login"
              element={<Login />}
            />
            <Route
              path="app"
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }>
              <Route
                index
                element={
                  <Navigate
                    replace
                    to="cities"
                  />
                }
              />
              <Route
                path="cities"
                element={<CityList />}
              />

              <Route
                path="cities/:id" // use parameters to pass the city id to get information for a specific city
                element={<City />}
              />
              <Route
                path="countries"
                element={<CountryList />}
              />
              <Route
                path="form"
                element={<Form />}
              />
            </Route>
            <Route
              path="*"
              element={<PageNotFound />}
            />
          </Routes>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;
