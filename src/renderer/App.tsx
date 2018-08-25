import React from 'react';
import ReactDOM from 'react-dom';

import './App.scss';

const appRoot = document.getElementById('app');

appRoot!.className = 'app';

ReactDOM.render(
  <h1>
    {'L-ToDo'}
  </h1>,
  appRoot
);
