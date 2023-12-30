import './App.css';
import "react-toastify/dist/ReactToastify.css";
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {Cart} from "./components/cart.js";
import {Home} from "./components/home.js";
import {NavBar} from "./components/navbar.js";
import {NotFound} from "./components/notFound.js";
import { ToastContainer } from 'react-toastify';
function App() {

  return (
    <>
      <Router>
        <ToastContainer />
        <NavBar />
        <Routes>
          <Route path='/' exact element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
