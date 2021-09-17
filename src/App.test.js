import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { act } from "react-dom/test-utils";
import App from './App';

test('renders header and toolbar', () => {
    render(<App />);
    const titel = screen.getByText(/Editor/i);

    const docName = screen.getByPlaceholderText(/Document name/i);

    const toolbar = screen.getByRole("toolbar");

    expect(titel).toBeInTheDocument();
    expect(docName).toBeInTheDocument();
    expect(toolbar).toBeInTheDocument();

});

test('gets all documents for drop-down menu', async () => {
    const fakeDocs = {
            "data": [
                {
                    "_id": "6140cf0786ccbf03bc9fcad0",
                    "name": "FakeDoc1",
                    "content": "Fake 1"
                },
                {
                    "_id": "6140cf721394e4c39427c304",
                    "name": "FakeDoc2",
                    "content": "Fake 2"
                },
                {
                    "_id": "6144916c666f9a83677fb38a",
                    "name": "FakeDoc3",
                    "content": "Fake 3"
                }
            ]
    }

    jest.spyOn(global, "fetch").mockImplementation(() =>
        Promise.resolve({
            json: () => Promise.resolve(fakeDocs)
        })
    );

    await act(async () => {
        render(<App />);
    });

    const fake1 = screen.getByText(/FakeDoc1/i);
    const fake2 = screen.getByText(/FakeDoc2/i);
    const fake3 = screen.getByText(/FakeDoc3/i);

    expect(fake1).toBeInTheDocument();
    expect(fake2).toBeInTheDocument();
    expect(fake3).toBeInTheDocument();

});

test('display name of opened document', async () => {
    const fakeDocs = {
            "data": [
                {
                    "_id": "6140cf0786ccbf03bc9fcad0",
                    "name": "FakeDoc1",
                    "content": "Fake 1"
                },
                {
                    "_id": "6140cf721394e4c39427c304",
                    "name": "FakeDoc2",
                    "content": "Fake 2"
                },
                {
                    "_id": "6144916c666f9a83677fb38a",
                    "name": "FakeDoc3",
                    "content": "Fake 3"
                }
            ]
    }

    jest.spyOn(global, "fetch").mockImplementation(() =>
        Promise.resolve({
            json: () => Promise.resolve(fakeDocs)
        })
    );

    await act(async () => {
        render(<App />);
    });

    const fake2 = screen.getByText(/FakeDoc2/i);
    fireEvent.click(fake2);

    await waitFor(async () => {
        const docName = screen.getByPlaceholderText(/Document name/i);

        expect(docName.value).toBe("FakeDoc2");
    });

});
