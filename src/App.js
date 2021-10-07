import React, { useEffect, useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import socketIOClient from "socket.io-client";
import Alert from 'react-popup-alert'
import Header from './components/Header';
import Login from './components/Login';
import Toolbar from './components/Toolbar';
import Axios from "axios";
// eslint-disable-next-line no-unused-vars
import { devENDPOINT, prodENDPOINT } from './variables';

const ENDPOINT = devENDPOINT;

const socket = socketIOClient(ENDPOINT);

function App() {
    const editorRef = useRef(null);
    const [allDocs, setAllDocs] = useState(null);
    const [docID, setDocID] = useState(null);
    const [docName, setDocName] = useState(null);
    const [docContent, setDocContent] = useState(null);
    const [registerUsername, setRegisterUsername] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [loginUsername, setLoginUsername] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [token, setToken] = useState("");
    const [currentUser, setCurrentUser] = useState("");
    const [registered, setRegistered] = useState("");
    const [authUsers, setAuthUsers] = useState("");
    const [allowedUsers, setAllowedUsers] = useState("");
    const register = () => {
        Axios({
            method: "POST",
            data: {
                email: registerUsername,
                password: registerPassword
            },
            withCredentials: true,
            url: `${ENDPOINT}/auth/register`
        }).then((res) => {
            console.log(res)
            if (!res.data) {
                onShowMessage("Error!", "error", "Something went wrong.");
            } else {
                if (res.data.data.title === "Email or password missing.") {
                    onShowMessage("Warning!", "warning", res.data.data.message);
                }
                if (res.data.data.title === "Succesfully created a user.") {
                    setRegistered(res.data.data.email);
                    console.log(registered);
                    onShowMessage("Success!", "success", res.data.data.message);
                }
                if (res.data.data.title === "User already exists.") {
                    onShowMessage("Warning!", "warning", res.data.data.message);
                }
            }
        });
    };
    const login = () => {
        Axios({
            method: "POST",
            headers: {'content-type': 'application/json'},
            data: {
                email: loginUsername,
                password: loginPassword
            },
            withCredentials: true,
            url: `${ENDPOINT}/auth/login`
        }).then((res) => {
            if (res.data.data.token) {
                setCurrentUser(res.data.data.user.email);
                setToken(res.data.data.token);
                onShowMessage("Success!", "success", res.data.data.message);
            }
        });
    };

    const [message, setMessage] = useState({
        title: "Success!",
        type: 'succes',
        text: 'Your document has been saved!',
        show: false
    })
    let [data, setData] = useState({
        _id: "",
        name: "",
        html: "",
        allowed_users: ""
    });

    function onCloseMessage() {
        setMessage({
            title: '',
            type: '',
            text: '',
            show: false
        })
    }
  
    function onShowMessage(title, type, text) {
        setMessage({
            title: title,
            type: type,
            text: text,
            show: true
        })
    }

      useEffect(() => {
        Axios({
            method: "POST",
            url: `${ENDPOINT}/graphql`,
            data: {
                query: "{ users { email } }"
            }
        }).then((res) => {
            const authedUsers = [];

            res.data.data.users.forEach(user => {
                authedUsers.push(user.email);
            });
            setAuthUsers(authedUsers);
        });
    }, [token]);

    useEffect(() => {
        if (token) {
            Axios({
                method: "POST",
                url: `${ENDPOINT}/graphql`,
                data: {
                    query: "{ users { docs { _id name content allowed_users } } }"
                }
            }).then((res) => {
                let allowedDocs = [];

                if (res.data.data.users !== null) {
                    res.data.data.users.forEach(user => {
                        user.docs.forEach(doc => {
                            if (doc.allowed_users.includes(currentUser) === true) {
                                allowedDocs.push(doc);
                            }
                        })
                    });
                }
                setAllDocs(allowedDocs);
            });
        }
    }, [setAllDocs, docName, token, currentUser]);

    useEffect(() => {
        if (docID) {
            let doc = allDocs.find(d => d._id === docID);
            socket.emit("create", doc._id);
            socket.on("update", (data) => {
                if (editorRef.current.getContent() !==  data.html) {
                    editorRef.current.setContent(data.html);
                    setDocName(docName);
                }
            });
        }
    }, [docID, docName, allDocs]);

    const log = () => {
        if (docID) {
            setData({
                _id: docID,
                name: docName,
                html: editorRef.current.getContent(),
                allowed_users: allowedUsers
            });

            socket.emit("update", data);
        }
    };

    const newDoc = () => {
        setDocID(null);
        setDocName(null);
        setAllowedUsers(null);
        editorRef.current.setContent("");
    };

    const saveDoc = () => {
        const addUrl = `${ENDPOINT}/docs/add`;
        const updateUrl = `${ENDPOINT}/docs/update`
        let messageTitle = "Success!";
        let messageType = "success";
        let messageText = 'Your document has been saved!';
        // update doc
        if (docID) {
            fetch(updateUrl, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    _id: docID,
                    email: currentUser,
                    name: docName,
                    content: editorRef.current.getContent(),
                    allowed_users: allowedUsers
                }),
            })
            .catch((error) => {
                console.error('Error:', error);
                messageTitle = "Error!";
                messageType = "error"
                messageText = 'Something went wrong!';
            });
        // create new doc
        } else {
            fetch(addUrl, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: currentUser,
                    name: docName,
                    content: editorRef.current.getContent(),
                    allowed_users: allowedUsers
                }),
            })
            .catch((error) => {
                console.error('Error:', error);
                messageTitle = "Error!";
                messageType = "error";
                messageText = 'Something went wrong!';
            });
        }
        onShowMessage(messageTitle, messageType, messageText);
    }

    if(!token) {
        return (
            <>
            <Alert
            header={message.title}
            btnText={<i className="material-icons">close</i>}
            text={message.text}
            type={message.type}
            show={message.show}
            color={"none"}
            onClosePress={onCloseMessage}
            pressCloseOnOutsideClick={true}
            showBorderBottom={false}
            alertStyles={{}}
            headerStyles={{}}
            textStyles={{}}
            buttonStyles={{}}
            />
            <Login
            setRegisterUsername={setRegisterUsername}
            setRegisterPassword={setRegisterPassword}
            setLoginUsername={setLoginUsername}
            setLoginPassword={setLoginPassword}
            login={login}
            register={register}
            registered={registered}
            />
        </>
        )
    }
    return (
        <>
        <Header
            docID={docID} setDocID={setDocID}
            docName={docName} setDocName={setDocName}
            allowedUsers={allowedUsers} setAllowedUsers={setAllowedUsers}
            token={token} setToken={setToken}
            onShowMessage={onShowMessage}
        />
        <Alert
            header={'Success!'}
            btnText={<i className="material-icons">close</i>}
            text={message.text}
            type={message.type}
            show={message.show}
            color={"none"}
            onClosePress={onCloseMessage}
            pressCloseOnOutsideClick={true}
            showBorderBottom={false}
            alertStyles={{}}
            headerStyles={{}}
            textStyles={{}}
            buttonStyles={{}}
        />
        <Toolbar
            docID={docID} setDocID={setDocID}
            docName={docName} setDocName={setDocName}
            docContent={docContent} setDocContent={setDocContent}
            allowedUsers={allowedUsers} setAllowedUsers={setAllowedUsers}
            docs={allDocs}
            printContent={log}
            newDoc={newDoc}
            saveDoc={saveDoc}
            authUsers={authUsers}
        />
        <Editor
            apiKey="ghjg81e9b3or0nb7gu2jzett3idmypu5en8xwqlf948upxya"
            onInit={(evt, editor) => editorRef.current = editor}
            onKeyUp={log}
            initialValue={docContent}
            init={{
                height: 500,
                menubar: false,
                plugins: [
                    'advlist autolink lists link image charmap print preview anchor',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table paste code help wordcount'
                ],
                toolbar: 'undo redo | formatselect | ' +
                    'bold italic backcolor | alignleft aligncenter ' +
                    'alignright alignjustify | bullist numlist outdent indent | ' +
                    'removeformat | help',
                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
            }}
        />
        </>
    );
}

export default App;
