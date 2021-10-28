// eslint-disable-next-line no-unused-vars
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { unmountComponentAtNode } from "react-dom";
import 'jest-canvas-mock';
import { act } from "react-dom/test-utils";
import Comments from './Comments';

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

test('renders Comments no comments', () => {
    render(<Comments />, container);
    const message = screen.getByText("No comments to display.");

    expect(message).toBeInTheDocument();
});

it("renders Comments", async () => {
    let span = document.createElement("span");

    span.classList.add("user-comments");
    span.id = "test id";
    span.textContent = "some text for test"
    span.dataset.comment = "test comment";
    span.dataset.user = "user1@test.com";
    container.appendChild(span);

    // Use the asynchronous version of act to apply resolved promises
    await act(async () => {
      render(<Comments displayComments="true" />, container);
    });
  
    const text = screen.getAllByText("some text for test");
    const comment = screen.getAllByText("test comment");
    const user = screen.getAllByText("user1@test.com");

    expect(text[0]).toBeInTheDocument();
    expect(comment[0]).toBeInTheDocument();
    expect(user[0]).toBeInTheDocument();
  });

