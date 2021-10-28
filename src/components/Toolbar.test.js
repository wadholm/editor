// eslint-disable-next-line no-unused-vars
import { render, screen } from '@testing-library/react';
import { unmountComponentAtNode } from "react-dom";
import '@testing-library/jest-dom';
import 'jest-canvas-mock';
import Toolbar from './Toolbar';

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


test('renders Toolbar', () => {
    render(<Toolbar />, container);
    const toolbar = screen.getByRole("toolbar");
    const newDoc = screen.getByTitle("New document");
    const saveDoc = screen.getByTitle("Save changes");
    const sendInvite = screen.getByTitle("Send invite");
    const send = screen.getByTitle("Send");

    expect(toolbar).toBeInTheDocument();
    expect(newDoc).toBeInTheDocument();
    expect(saveDoc).toBeInTheDocument();
    expect(sendInvite).toBeInTheDocument();
    expect(send).toBeInTheDocument();
});

