// eslint-disable-next-line no-unused-vars
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import 'jest-canvas-mock';
import Comments from './Comments';

test('renders Comments', () => {
    render(<Comments />);
    const footer = screen.getByText("No comments to display.");

    expect(footer).toBeInTheDocument();
});

