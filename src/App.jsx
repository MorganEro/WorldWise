import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import SpinnerFullPage from './components/SpinnerFullPage.jsx';

import { CitiesProvider } from './contexts/CitiesContext.jsx';
import { AuthProvider } from './contexts/FakeAuthContext.jsx';
import ProtectedRoute from './pages/ProtectedRoute.jsx';

import CityList from './components/CityList.jsx';
import City from './components/City.jsx';
import CountryList from './components/CountryList.jsx';
import Form from './components/Form.jsx';

// import AppLayout from './pages/AppLayout.jsx';
// import Homepage from './pages/Homepage.jsx';
// import Login from './pages/Login.jsx';
// import PageNotFound from './pages/PageNotFound.jsx';
// import Product from './pages/Product.jsx';
// import Pricing from './pages/Pricing.jsx';

// Lazy loading
const AppLayout = lazy(() => import('./pages/AppLayout.jsx'));
const Homepage = lazy(() => import('./pages/Homepage.jsx'));
const Login = lazy(() => import('./pages/Login.jsx'));
const PageNotFound = lazy(() => import('./pages/PageNotFound.jsx'));
const Product = lazy(() => import('./pages/Product.jsx'));
const Pricing = lazy(() => import('./pages/Pricing.jsx'));

// dist/assets/index-d5677948.css   29.96 kB │ gzip:   5.10 kB
// dist/assets/index-5eaf0ff4.js   509.45 kB │ gzip: 148.71 kB

function App() {
  return (
    //8) Wrap the entire application in the CitiesProvider component. This will provide the CitiesContext data to the rest of the application.
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
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
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;
