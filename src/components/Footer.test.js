// eslint-disable-next-line no-unused-vars
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import 'jest-canvas-mock';
import Footer from './Footer';

test('renders Footer', () => {
    render(<Footer />);
    const footer = screen.getByText("© Malin Wadholm 2021");

    expect(footer).toBeInTheDocument();
});

