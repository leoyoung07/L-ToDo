import React from 'react';
import ReactDOM from 'react-dom';
import Main from './Main';

import './App.scss';

const appRoot = document.getElementById('app');

appRoot!.className = 'app';

ReactDOM.render(
  <Main/>,
  appRoot
);
