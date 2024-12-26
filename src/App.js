import logo from './logo.svg';
import React from 'react';
import './App.css';
import Layout from './components/Layout';

import { routes } from './config/Router';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        {routes.map((route) => (
          // Her bir eleman için unique bir key verilmesi gerekiyor
          <Route
            key={route.path} // Benzersiz bir key atandı
            path={route.path}
            element={
              <Layout>
                {route.component}
              </Layout>
            }
          />
        ))}
      </Routes>
    </Router>
  );
}

/*
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}*/

export default App;
