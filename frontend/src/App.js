import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

const API = 'http://localhost:5000/api';

function App() {
  const [data, setData] = useState('');

  useEffect(() => {
    fetch(API)
      .then((res) => res.text())
      .then((data) => setData(data))
      .catch((error) => console.error('Error:', error));
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <div>
            <h1>Welcome to the home page</h1>
            <p>Data from Express: {data}</p>
          </div>
        } />
        <Route path="/user" element={
          <div>
            <h1>Welcome to user page</h1>
          </div>
        }/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
