import React from 'react';
import { render } from 'react-dom';

import BpComponent from './components/bp-component/BpComponent.jsx';

render(
  <BpComponent
    headingTitle={"Boilerplate"}
    subHeading={"Start with something rather than nothing!"}
  />, document.getElementById('app')
);
