// eslint-disable-next-line no-unused-vars
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
// import { act } from "react-dom/test-utils";
import 'jest-canvas-mock';
import App from './App';

test('renders login', () => {
    render(<App />);
    const titel = screen.getByText(/Editor/i);
    const inputEmail = screen.getAllByText(/Email/i);
    const inputPassword = screen.getAllByText(/Password/i);
    const login = screen.getAllByText(/Login/i);
    const register = screen.getAllByText(/Register/i);


    expect(titel).toBeInTheDocument();
    expect(inputEmail[0]).toBeInTheDocument();
    expect(inputPassword[0]).toBeInTheDocument();
    expect(login[0]).toBeInTheDocument();
    expect(register[0]).toBeInTheDocument();

});

// test('gets all documents for drop-down menu', async () => {
//     const fakeDocs = {
//             "data": [
//                 {
//                     "_id": "6140cf0786ccbf03bc9fcad0",
//                     "name": "FakeDoc1",
//                     "content": "Fake 1"
//                 },
//                 {
//                     "_id": "6140cf721394e4c39427c304",
//                     "name": "FakeDoc2",
//                     "content": "Fake 2"
//                 },
//                 {
//                     "_id": "6144916c666f9a83677fb38a",
//                     "name": "FakeDoc3",
//                     "content": "Fake 3"
//                 }
//             ]
//     }

//     jest.spyOn(global, "fetch").mockImplementation(() =>
//         Promise.resolve({
//             json: () => Promise.resolve(fakeDocs)
//         })
//     );

//     await act(async () => {
//         render(<Toolbar />);
//     });

//     const fake1 = screen.getByText(/FakeDoc1/i);
//     const fake2 = screen.getByText(/FakeDoc2/i);
//     const fake3 = screen.getByText(/FakeDoc3/i);

//     expect(fake1).toBeInTheDocument();
//     expect(fake2).toBeInTheDocument();
//     expect(fake3).toBeInTheDocument();

// });

// test('display name of opened document', async () => {

//     const fakeUser = "faked@user.com";
//     const fakeToken = "fakedToken";
//     const fakeDocs = {
//             "data": [
//                 {
//                     "_id": "6140cf0786ccbf03bc9fcad0",
//                     "name": "FakeDoc1",
//                     "content": "Fake 1"
//                 },
//                 {
//                     "_id": "6140cf721394e4c39427c304",
//                     "name": "FakeDoc2",
//                     "content": "Fake 2"
//                 },
//                 {
//                     "_id": "6144916c666f9a83677fb38a",
//                     "name": "FakeDoc3",
//                     "content": "Fake 3"
//                 }
//             ]
//     }

//     jest.spyOn(global, "fetch").mockImplementation(() =>
//         Promise.resolve({
//             json: () => Promise.resolve(fakeUser, fakeToken, fakeDocs)
//         })
//     );

//     await act(async () => {
//         render(<App token="fakeToken"/>);
//     });

//     const fake2 = screen.getByText(/FakeDoc2/i);
//     fireEvent.click(fake2);

//     await waitFor(async () => {
//         const docName = screen.getByPlaceholderText(/Document name/i);

//         expect(docName.value).toBe("FakeDoc2");
//     });

// });
