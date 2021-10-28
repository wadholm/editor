// eslint-disable-next-line no-unused-vars
import { render, screen } from '@testing-library/react';
import { unmountComponentAtNode } from "react-dom";
import '@testing-library/jest-dom';
import 'jest-canvas-mock';
import { act } from "react-dom/test-utils";
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


test('renders Dropdown no docs', () => {
    render(<Dropdown />, container);
    const title = screen.getByTitle("No docs available");

    expect(title).toBeInTheDocument();
});


test("renders Dropdown with docs", async () => {
    const fakeDocs = [
                {
                    "_id": "6140cf0786ccbf03bc9fcad0",
                    "name": "FakeDoc1",
                    "content": "Fake 1",
                    "allowed_users": ["user1@fakedocs.com"]
                },
                {
                    "_id": "6140cf721394e4c39427c304",
                    "name": "FakeDoc2",
                    "content": "Fake 2",
                    "allowed_users": ["user2@fakedocs.com", "user1@fakedocs.com"]
                },
                {
                    "_id": "6144916c666f9a83677fb38a",
                    "name": "FakeDoc3",
                    "content": "Fake 3",
                    "allowed_users": ["user3@fakedocs.com", "user2@fakedocs.com", "user1@fakedocs.com"]
                }
            ]

    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(fakeDocs)
      })
    );
  
    // Use the asynchronous version of act to apply resolved promises
    await act(async () => {
      render(<Dropdown docs={fakeDocs} />, container);
    });

    const title = screen.getByTitle("Open document");
    const fake1 = screen.getByText("FakeDoc1");
    const fake2 = screen.getByText("FakeDoc2");
    const fake3 = screen.getByText("FakeDoc3");

    expect(title).toBeInTheDocument();
    expect(fake1).toBeInTheDocument();
    expect(fake2).toBeInTheDocument();
    expect(fake3).toBeInTheDocument();
  
    // remove the mock to ensure tests are completely isolated
    global.fetch.mockRestore();
  });

  test("renders Dropdown with codes", async () => {
    const fakeDocs = [
                {
                    "_id": "6140cf0786ccbf03bc9fcad0",
                    "name": "FakeDoc1",
                    "content": "Fake 1",
                    "allowed_users": ["user1@fakedocs.com"]
                },
                {
                    "_id": "6140cf721394e4c39427c304",
                    "name": "FakeDoc2",
                    "content": "Fake 2",
                    "allowed_users": ["user2@fakedocs.com", "user1@fakedocs.com"]
                },
                {
                    "_id": "6144916c666f9a83677fb38a",
                    "name": "FakeDoc3",
                    "content": "Fake 3",
                    "allowed_users": ["user3@fakedocs.com", "user2@fakedocs.com", "user1@fakedocs.com"]
                }
            ]

    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(fakeDocs)
      })
    );
  
    // Use the asynchronous version of act to apply resolved promises
    await act(async () => {
      render(<Dropdown codeMode="true" codes={fakeDocs} />, container);
    });
    
    const title = screen.getByTitle("Open code-document");
    const fake1 = screen.getByText("FakeDoc1");
    const fake2 = screen.getByText("FakeDoc2");
    const fake3 = screen.getByText("FakeDoc3");

    expect(title).toBeInTheDocument();
    expect(fake1).toBeInTheDocument();
    expect(fake2).toBeInTheDocument();
    expect(fake3).toBeInTheDocument();
  
    // remove the mock to ensure tests are completely isolated
    global.fetch.mockRestore();
  });



