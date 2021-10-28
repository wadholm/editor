// eslint-disable-next-line no-unused-vars
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import 'jest-canvas-mock';
import Toggle from './Toggle';

test('renders Toggle', () => {
    render(<Toggle />);
    const toggle = screen.getByTestId("toggle");

    expect(toggle).toBeInTheDocument();
});

