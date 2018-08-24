import React from 'react';
import ReactDOM from 'react-dom';
import { hashHistory, Route, Router } from 'react-router';

import './App.scss';

const appRoot = document.getElementById('app');

appRoot!.className = 'app';

ReactDOM.render(
  <h1>
    {'Hello, world'}
  </h1>,
  appRoot
);
