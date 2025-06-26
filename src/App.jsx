import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Simulator from './Simulator';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/*" element={<Simulator />} />
    </Routes>
  </BrowserRouter>
);

export default App;