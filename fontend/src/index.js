import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import productsSlice, { productsFetch } from "./features/producrsSlice.js";
import cartSlice, { getTotal } from "./features/cartSlice.js";
import {productsApi} from "./features/producrsAPI.js";

const store = configureStore({
  reducer: {
    products: productsSlice,
    cart: cartSlice,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(productsApi.middleware)
  
})

store.dispatch(productsFetch());
store.dispatch(getTotal());

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
