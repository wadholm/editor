import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
// import { act } from "react-dom/test-utils";
import App from './App';

test('renders header', () => {
    render(<App />);
    const titel = screen.getByText(/Editor/i);

    expect(titel).toBeInTheDocument();
});
