// eslint-disable-next-line no-unused-vars
import { render, screen } from '@testing-library/react';
import { unmountComponentAtNode } from "react-dom";
import '@testing-library/jest-dom';
import 'jest-canvas-mock';
import Login from './Login';

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


test('renders Login', () => {
  render(<Login />, container);
  const inputEmail = screen.getAllByText(/Email/i);
  const inputPassword = screen.getAllByText(/Password/i);
  const login = screen.getAllByText(/Login/i);
  const register = screen.getAllByText(/Register/i);

  expect(inputEmail[0]).toBeInTheDocument();
  expect(inputPassword[0]).toBeInTheDocument();
  expect(login[0]).toBeInTheDocument();
  expect(register[0]).toBeInTheDocument();
});

