import React from 'react';
import ReactDOM from 'react-dom';
import Calculator from './Components/Calculator';
import ThemeSelector from "./Components/ThemeSelector";

ReactDOM.render(
  <React.StrictMode>
    <ThemeSelector>
        <Calculator />
    </ThemeSelector>
  </React.StrictMode>,
  document.getElementById('root')
);
