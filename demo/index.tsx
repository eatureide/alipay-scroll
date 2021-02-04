import React, { StrictMode } from 'react';
import { render } from 'react-dom';
import Demo from '../src';

render(
  <StrictMode>
    <Demo />
  </StrictMode>,
  document.getElementById('root')
);
