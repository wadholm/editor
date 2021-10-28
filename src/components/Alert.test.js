// eslint-disable-next-line no-unused-vars
import { render, screen } from '@testing-library/react';
import { unmountComponentAtNode } from "react-dom";
import '@testing-library/jest-dom';
import 'jest-canvas-mock';
import { act } from "react-dom/test-utils";
import Alert from './Alert';

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


it("renders Alert", async () => {
  const fakeMessage = {
    title: "Test",
    text: "Test text."
  };
  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(fakeMessage)
    })
  );

  // Use the asynchronous version of act to apply resolved promises
  await act(async () => {
    render(<Alert message={fakeMessage} />, container);
  });

  const title = screen.getByTitle("Close");
  const header = screen.getByText("Test");
  const message = screen.getByText("Test text.");

  expect(title).toBeInTheDocument();
  expect(header).toBeInTheDocument();
  expect(message).toBeInTheDocument();

  // remove the mock to ensure tests are completely isolated
  global.fetch.mockRestore();
});

it("renders Alert in Code-mode", async () => {
  const fakeMessage = {
    title: "Test Code-mode",
    text: "Test text in Code-mode."
  };
  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(fakeMessage)
    })
  );

  // Use the asynchronous version of act to apply resolved promises
  await act(async () => {
    render(<Alert message={fakeMessage} codeMode="true" />, container);
  });

  const title = screen.getByTitle("Close");
  const header = screen.getByText("Test Code-mode");
  const message = screen.getByText("Test text in Code-mode.");

  expect(title).toBeInTheDocument();
  expect(header).toBeInTheDocument();
  expect(message).toBeInTheDocument();

  // remove the mock to ensure tests are completely isolated
  global.fetch.mockRestore();
});

