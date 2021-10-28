// eslint-disable-next-line no-unused-vars
import { render, screen } from '@testing-library/react';
import { unmountComponentAtNode } from "react-dom";
import '@testing-library/jest-dom';
import 'jest-canvas-mock';
import Dropdown from './Dropdown';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});


test('renders Dropdown', () => {
    render(<Dropdown />, container);
    const title = screen.getByTitle("No docs available");

    expect(title).toBeInTheDocument();
});

