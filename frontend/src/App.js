import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <div>
            <h1>Welcome to the home page</h1>
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
