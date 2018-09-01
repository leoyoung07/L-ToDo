import Button from 'antd/lib/button';
import React from 'react';
import ReactDOM from 'react-dom';

import './App.scss';

const appRoot = document.getElementById('app');

appRoot!.className = 'app';

ReactDOM.render(
  <div className="App">
    <Button type="primary">Button</Button>
  </div>,
  appRoot
);
