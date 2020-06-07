
import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import { mount, shallow } from 'enzyme';
import Entrance from './scene/Entrance/Entrance';
import { Provider } from 'react-redux';
import { store } from './Store';

/*
  Enzyme is being used to render a component in a testable state
  This can be accomplished in a few ways:
  shallow - Which shallowly renders a component for testing.  A shallow render
      does not include any child components.
  mount - Mount more deeply renders a component for testing, rendering 
      child components defined in the component structure. We will use this 
      primarily, due to the heavy usage of higher components in this app.
  Why can't we just test the app with Jest alone?
  1. Jest is great for testing a simple JavaScript.
*/

describe('<App />', () => {

  test('renders learn react link', () => {
    const app = render(<App />);
    expect(app).toBeTruthy();
  });
})