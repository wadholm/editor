// eslint-disable-next-line no-unused-vars
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import 'jest-canvas-mock';
import { unmountComponentAtNode } from "react-dom";
import Switch from './Switch';

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

test('renders Switch', () => {
    render(<Switch />, container);
    const pdf = screen.getByTitle("Download PDF");
    const comment = screen.getByTitle("Add comment");
    const comments = screen.getByTitle("Show comments");

    expect(pdf).toBeInTheDocument();
    expect(comment).toBeInTheDocument();
    expect(comments).toBeInTheDocument();
});

test('renders Switch in code-mode', () => {
    render(<Switch codeMode="true" />, container);

    const code = screen.getByTitle("Run code");

    expect(code).toBeInTheDocument();
});

