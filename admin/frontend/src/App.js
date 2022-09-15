import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import BaseRoute from './routes';

function App() {
  return (
    <Router>
      <BaseRoute />
    </Router>
  );
}

export default App;
