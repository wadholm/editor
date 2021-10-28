// eslint-disable-next-line no-unused-vars
import { render, screen } from '@testing-library/react';
import { unmountComponentAtNode } from "react-dom";
import '@testing-library/jest-dom';
import 'jest-canvas-mock';
import { act } from "react-dom/test-utils";
import Header from './Header';

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


it("renders Header", async () => {

  await act(async () => {
    render(<Header 
            currentEditor="Test-Editor"
            docName="TestName"
            allowedUsers="test1, test2"
          />, container);
  });

  const header = screen.getByText("Test-Editor");
  const name = screen.getByDisplayValue("TestName");
  const allowedUsers = screen.getByDisplayValue("test1, test2");

  expect(header).toBeInTheDocument();
  expect(name).toBeInTheDocument();
  expect(allowedUsers).toBeInTheDocument();

});

