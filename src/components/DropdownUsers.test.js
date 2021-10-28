// eslint-disable-next-line no-unused-vars
import { render, screen } from '@testing-library/react';
import { unmountComponentAtNode } from "react-dom";
import '@testing-library/jest-dom';
import 'jest-canvas-mock';
import { act } from "react-dom/test-utils";
import DropdownUsers from './DropdownUsers';

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


test('renders DropdownUsers no users set', () => {
    render(<DropdownUsers />, container);
    const title = screen.getByTitle("No users available");

    expect(title).toBeInTheDocument();
});

test("renders DropdownUsers all users available", async () => {
  const fakeAuthUsers = ["user3@fakedocs.com", "user2@fakedocs.com", "user1@fakedocs.com"]

  let allowed = "";

  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(fakeAuthUsers)
    })
  );

  // Use the asynchronous version of act to apply resolved promises
  await act(async () => {
    render(<DropdownUsers authUsers={fakeAuthUsers} allowedUsers={allowed} />, container);
  });

  const title = screen.getByTitle("Add allowed users");

  expect(title).toBeInTheDocument();

  // remove the mock to ensure tests are completely isolated
  global.fetch.mockRestore();
});

test("renders DropdownUsers one user available", async () => {
  const fakeAuthUsers = ["user3@fakedocs.com", "user2@fakedocs.com", "user1@fakedocs.com"]

  let allowed = "user3@fakedocs.com, user2@fakedocs.com";

  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(fakeAuthUsers)
    })
  );

  // Use the asynchronous version of act to apply resolved promises
  await act(async () => {
    render(<DropdownUsers authUsers={fakeAuthUsers} allowedUsers={allowed} />, container);
  });

  const title = screen.getByTitle("Add allowed users");
  const user = screen.getByText("user1@fakedocs.com");

  expect(title).toBeInTheDocument();
  expect(user).toBeInTheDocument();

  // remove the mock to ensure tests are completely isolated
  global.fetch.mockRestore();
});

test("renders DropdownUsers no users available", async () => {
  const fakeAuthUsers = ["user3@fakedocs.com", "user2@fakedocs.com", "user1@fakedocs.com"]

  let allowed = "user3@fakedocs.com, user2@fakedocs.com, user1@fakedocs.com";

  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(fakeAuthUsers)
    })
  );

  // Use the asynchronous version of act to apply resolved promises
  await act(async () => {
    render(<DropdownUsers authUsers={fakeAuthUsers} allowedUsers={allowed} />, container);
  });

  const title = screen.getByTitle("No users available");

  expect(title).toBeInTheDocument();

  // remove the mock to ensure tests are completely isolated
  global.fetch.mockRestore();
});


