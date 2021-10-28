import React, { useEffect, useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import CodeEditor from "@monaco-editor/react";
import socketIOClient from "socket.io-client";
import Alert from "./components/Alert";
import Header from './components/Header';
import Login from './components/Login';
import Toolbar from './components/Toolbar';
import Comments from './components/Comments';
import Footer from './components/Footer';
import Axios from "axios";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

// eslint-disable-next-line no-unused-vars
import { devENDPOINT, prodENDPOINT } from './variables';

const ENDPOINT = devENDPOINT;

const socket = socketIOClient(ENDPOINT);

function App() {
    const editorRef = useRef(null);
    const codeEditorRef = useRef(null);
    const [allDocs, setAllDocs] = useState(null);
    const [allCodes, setAllCodes] = useState(null);
    const [docID, setDocID] = useState(null);
    const [codeID, setCodeID] = useState(null);
    const [docName, setDocName] = useState(null);
    const [codeName, setCodeName] = useState(null);
    const [docContent, setDocContent] = useState(null);
    const [codeContent, setCodeContent] = useState(null);
    const [registerUsername, setRegisterUsername] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    // const [autofillUsername, setAutofillUsername] = useState("");
    // const [autofillPassword, setAutofillPassword] = useState("");
    const [loginUsername, setLoginUsername] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [token, setToken] = useState("");
    const [currentUser, setCurrentUser] = useState("");
    // const [registered, setRegistered] = useState("");
    const [authUsers, setAuthUsers] = useState("");
    const [allowedUsers, setAllowedUsers] = useState(null);
    const [sendEmail, setSendEmail] = useState("");
    const [codeMode, setCodeMode] = useState(false);
    const [updateMode, setUpdateMode] = useState(false);
    const [deleteMode, setDeleteMode] = useState(false);
    const [currentEditor, setCurrentEditor] = useState("Editor")
    const [execCode, setExecCode] = useState("Running code...");
    const [comment, setComment] = useState("");
    const [alertStyle, setAlertStyle] = useState({
        display: "none",
    })
    const [commentStyle, setCommentStyle] = useState({
        display: "none",
    })
    const [commentsStyle, setCommentsStyle] = useState({
        display: "none",
    })
    const [displayComments, setDisplayComments] = useState(false);

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

    const paramsString = window.location.pathname.substring(1);
    let searchParams = new URLSearchParams(paramsString);
    let start = "";

    if (searchParams.has('register') === true) {
        start = searchParams.get('register')
    }

    const [eviteEmail, setEviteEmail] = useState(start);
    const [evitePassword, setEvitePassword] = useState("");

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
            if (!res.data) {
                showMessage("Error!", "Something went wrong.");
                // setMessage({
                //     title: "Error!",
                //     text: "Something went wrong."
                // });
                // setAlertStyle({display: "block"});
            } else {
                if (res.data.data.title === "Email or password missing.") {
                    // showMessage("Warning!", "warning", res.data.data.message);
                    // setMessage({
                    //     title: "Warning!",
                    //     text: res.data.data.message
                    // });
                    // setAlertStyle({display: "block"});
                    showMessage("Warning", res.data.data.message)
                    // setAutofillUsername("");
                    // setAutofillPassword("");
                }
                if (res.data.data.title === "Succesfully created a user.") {
                    // setRegistered(res.data.data.email);
                    setLoginUsername(registerUsername);
                    setLoginPassword(registerPassword);
                    showMessage("Success!", res.data.data.message);
                    // setMessage({
                    //     title: "Success!",
                    //     text: res.data.data.message
                    // });
                    // setAlertStyle({display: "block"});
                }
                if (res.data.data.title === "User already exists.") {
                    showMessage("Warning!", res.data.data.message);
                    // setMessage({
                    //     title: "Warning!",
                    //     text: res.data.data.message
                    // });
                    // setAlertStyle({display: "block"});
                }
            }
        }) 
        .catch((error) => {
            console.error(error);
            // setMessage({
            //     title: "Warning!",
            //     text: "Something went wrong."
            // });
            // setAlertStyle({display: "block"});
            showMessage("Warning!", "Something went wrong.");
        });
        setEviteEmail("");
        setEvitePassword("");
    };

    const login = () => {
        // setAutofillUsername("");
        // setAutofillPassword("");
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
                // showMessage("Success!", res.data.data.message);
                setMessage({
                    title: "Success!",
                    text: res.data.data.message
                });
                setAlertStyle({display: "block"});
            }
        })
        .catch((error) => {
            console.error(error);
            // setMessage({
            //     title: "Warning!",
            //     text: "Something went wrong."
            // });
            // setAlertStyle({display: "block"});
            showMessage("Warning!", "Something went wrong.");
        })
        ;
    };

    const invite = () => {
        // console.log(docID, codeID);
        let type = "docs";
        let id = docID;
        // let name = "document";
        // let content = editorRef.current.getContent()

        if (codeMode) {
            type = "codes";
            id = codeID;
            // name = "code";
            // content = codeEditorRef.current.getValue();
        }
        const addAllowedUserUrl = `${ENDPOINT}/${type}/add/allowed_user`
        const sendEvite = `${ENDPOINT}/sendmail`
        let messageTitle = "Success!";
        // let messageType = "success";
        let messageText = 'Invite has been sent!';

        fetch(addAllowedUserUrl, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                _id: id,
                new_user: sendEmail,
            }),
        })
        .catch((error) => {
            console.error('Error:', error);
            messageTitle = "Error!";
            // messageType = "error"
            messageText = 'Something went wrong!';
        });

        fetch(sendEvite, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                recipient: sendEmail,
                sender: currentUser,
            }),
        })
        .catch((error) => {
            console.error('Error:', error);
            messageTitle = "Error!";
            // messageType = "error"
            messageText = 'Something went wrong!';
        });
        showMessage(messageTitle, messageText);
        // showMessage(messageTitle, messageType, messageText);
        setSendEmail("");
    };

    function showMessage(messageTitle, messageText) {
        setMessage({
            title: messageTitle,
            text: messageText
        });
        setAlertStyle({display: "block"});
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
        })
        .catch((error) => {
            console.error(error);
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
            })
            .catch((error) => {
                console.error(error);
            });
        }
    }, [setAllDocs, docName, token, currentUser]);

    useEffect(() => {
        if (codeMode) {
            Axios({
                method: "POST",
                url: `${ENDPOINT}/graphql`,
                data: {
                    query: "{ users { codes { _id name content allowed_users } } }"
                }
            }).then((res) => {
                let allowedCodes = [];
                if (res.data.data.users !== null) {
                    res.data.data.users.forEach(user => {
                        user.codes.forEach(code => {
                            if (code.allowed_users.includes(currentUser) === true) {
                                allowedCodes.push(code);
                            }
                        })
                    });
                }
                setAllCodes(allowedCodes);
            })
            .catch((error) => {
                console.error(error);
            });
        }
    }, [setAllCodes, docName, codeMode, currentUser]);

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
    }, [docID, docName, allDocs, data]);

    const log = () => {
        // console.log(editorRef.current.getContent());
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

    const addComment = () => {
        // let editorArea = document.getElementsByClassName("tox-edit-area");
        // let editorDocument = editorArea[0].childNodes[0].contentDocument;
        // console.log(editorDocument);

        // let span = document.createElement("span");
        // span.classList.add("user-comments");
        // span.id = "span id";
        // span.dataset.comment = comment;

        if (document.getSelection) {
            let editorArea = document.getElementsByClassName("tox-edit-area");
            let editorDocument = editorArea[0].childNodes[0].contentDocument;
            // console.log(editorDocument);
    
            // let span = document.createElement("span");
            // span.classList.add("user-comments");
            // span.id = "span id";
            // span.dataset.comment = comment;

            let selectedText = editorDocument.getSelection();
            if (selectedText.anchorOffset !== selectedText.focusOffset) {
                // something selected
                let span = document.createElement("span");

                span.classList.add("user-comments");
                span.id = Date.now();
                span.dataset.comment = comment;
                span.dataset.user = currentUser;

                if (selectedText.rangeCount) {
                    let range = selectedText.getRangeAt(0).cloneRange();

                    range.surroundContents(span);
                    selectedText.removeAllRanges();
                    selectedText.addRange(range);
                }
                setMessage({
                    title: "Success!",
                    text: "Your comment has been added."
                });
                setAlertStyle({display: "block"});
                setCommentStyle({display: "none"});
                setComment("");

            } else if (selectedText.anchorOffset === selectedText.focusOffset) {
                // nothing selected
                setMessage({
                    title: "Warning!",
                    text: "No text selected."
                });
                setAlertStyle({display: "block"});
            }
        }
    }

    const removeComment = (id) => {
        // select element to unwrap
        let editorArea = document.getElementsByClassName("tox-edit-area");
        let editorDocument = editorArea[0].childNodes[0].contentDocument;
        let el = editorDocument.getElementById(id);
        // var el = document.getElementById('span id');

        // get the element's parent node
        var parent = el.parentNode;

        // move all children out of the element
        while (el.firstChild) parent.insertBefore(el.firstChild, el);
        // console.log(el.firstChild);

        // remove the empty element
        parent.removeChild(el);
        setCommentsStyle({display: "none"});
    //   comments.style.display = "none";
        setCommentsStyle({display: "block"});
        setDeleteMode(true);
        saveDoc();
        // setDisplayComments(false);
    }

    const updateComment = (id) => {
        // select element to unwrap
        let editorArea = document.getElementsByClassName("tox-edit-area");
        let editorDocument = editorArea[0].childNodes[0].contentDocument;
        let el = editorDocument.getElementById(id);
        el.dataset.comment = comment;
        saveDoc();
        // var el = document.getElementById('span id');

        // get the element's parent node
        // var parent = el.parentNode;

        // // move all children out of the element
        // while (el.firstChild) parent.insertBefore(el.firstChild, el);
        // // console.log(el.firstChild);

        // // remove the empty element
        // parent.removeChild(el);
    }

    const newDoc = () => {
        setDocID(null);
        setDocName(null);
        setAllowedUsers(null);
        editorRef.current.setContent("");
    };

    const newCode = () => {
        setCodeID(null);
        setDocName(null);
        setAllowedUsers(null);
        codeEditorRef.current.setValue("");
    };

    const saveDoc = async() => {
        // console.log(docID, codeID);
        let type = "docs";
        let id = docID;
        let name = "document";
        let content = editorRef.current.getContent()

        if (codeMode) {
            type = "codes";
            id = codeID;
            name = "code";
            content = codeEditorRef.current.getValue();
        }

        const addUrl = `${ENDPOINT}/${type}/add`;
        const updateUrl = `${ENDPOINT}/${type}/update`
        let messageTitle = "Success!";
        // let messageType = "success";
        let messageText = `Your ${name} has been saved!`;
        // update doc
        if (id) {
            fetch(updateUrl, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    _id: id,
                    email: currentUser,
                    name: docName,
                    content: content,
                    allowed_users: allowedUsers
                }),
            })
            .catch((error) => {
                console.error('Error:', error);
                messageTitle = "Error!";
                // messageType = "error"
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
                    content: content,
                    allowed_users: allowedUsers
                }),
            })
            .catch((error) => {
                console.error('Error:', error);
                messageTitle = "Error!";
                // messageType = "error";
                messageText = 'Something went wrong!';
            });
        }

        if (updateMode) {
            messageText = 'Your comment has been updated!';
            setUpdateMode(false);
        } else if (deleteMode) {
            messageText = 'Your comment has been deleted!';
            setDeleteMode(false);
        }
        showMessage(messageTitle, messageText);
        // showMessage(messageTitle, messageType, messageText);
    }


        const downloadPdfDocument = () => {
        const root = document.documentElement;
        const input = document.createElement('div');

        input.setAttribute("id", "input");

        input.innerHTML = editorRef.current.getContent();
        // input.style.fontFamily = "Helvetica, sans-serif";
        input.style.margin = "20%";
        // console.log(input);

        root.appendChild(input);

        html2canvas(input)
            .then((canvas) => {
                var wid;
                var hgt;
                const imgData = canvas.toDataURL('image/png', wid = canvas.width, hgt = canvas.height);
                let hratio = hgt/wid;
                const pdf = new jsPDF("p", "pt", "a4");
                var width = pdf.internal.pageSize.width - 80;
                var height = width * hratio
                pdf.addImage(imgData, 'JPEG', 40, 40, width, height);
                pdf.save(`${docName}.pdf`);
            })
        input.remove();
    }

    function showValue() {
        // console.log(docID);
        // console.log(docName);
        // console.log(codeEditorRef.current.getValue());
        // console.log(btoa(codeEditorRef.current.getValue()));
    }

    const runCode = () => {
        var data = {
            code: btoa(codeEditorRef.current.getValue())
        };
        
        fetch("https://execjs.emilfolino.se/code", {
            body: JSON.stringify(data),
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST'
        })
        .then(function (response) {
            return response.json();
        })
        .then(function(result) {
            let decodedOutput = atob(result.data);
            setExecCode(decodedOutput);
            // console.log(decodedOutput); // outputs: decoded response
        });
    };

    if(!token) {
        return (
            <>
            <Alert
            message={message}
            alertStyle={alertStyle} setAlertStyle={setAlertStyle}
            />
            <Login
            setRegisterUsername={setRegisterUsername} registerUsername={registerUsername}
            setRegisterPassword={setRegisterPassword} registerPassword={registerPassword}
            loginUsername={loginUsername} setLoginUsername={setLoginUsername}
            loginPassword={loginPassword} setLoginPassword={setLoginPassword}
            login={login}
            register={register}
            // registered={registered}
            eviteEmail={eviteEmail} setEviteEmail={setEviteEmail}
            evitePassword={evitePassword} setEvitePassword={setEvitePassword}
            // autofillUsername={autofillUsername} autofillPassword={autofillPassword}
            />
            <Footer />
        </>
        )
    }
    if(codeMode) {
        return (
            <>
            <Header
                docID={docID} setDocID={setDocID}
                docName={docName} setDocName={setDocName}
                setDocContent={setDocContent}
                codeID={codeID} setCodeID={setCodeID}
                setCodeContent={setCodeContent}
                allowedUsers={allowedUsers} setAllowedUsers={setAllowedUsers}
                token={token} setToken={setToken}
                showMessage={showMessage}
                setAllDocs={setAllDocs}
                setCurrentUser={setCurrentUser}
                codeMode={codeMode} setCodeMode={setCodeMode}
                currentEditor={currentEditor} setCurrentEditor={setCurrentEditor}
                newDoc={newDoc} newCode={newCode}
                displayComments={displayComments} setDisplayComments={setDisplayComments}
                setCommentStyle={setCommentStyle}
                setCommentsStyle={setCommentsStyle}
                setComment={setComment}
            />
            <Alert
            message={message}
            alertStyle={alertStyle} setAlertStyle={setAlertStyle}
            />
            <Toolbar
                docID={docID} setDocID={setDocID}
                docName={docName} setDocName={setDocName}
                docContent={docContent} setDocContent={setDocContent}
                codeID={codeID} setCodeID={setCodeID}
                codeName={codeName} setCodeName={setCodeName}
                codeContent={codeContent} setCodeContent={setCodeContent}
                allowedUsers={allowedUsers} setAllowedUsers={setAllowedUsers}
                docs={allDocs}
                codes={allCodes}
                printContent={log}
                newDoc={newDoc}
                newCode={newCode}
                saveDoc={saveDoc}
                authUsers={authUsers}
                downloadPdfDocument={downloadPdfDocument}
                sendEmail={sendEmail} setSendEmail={setSendEmail}
                invite={invite}
                codeMode={codeMode} setCodeMode={setCodeMode}
                runCode={runCode}
                execCode={execCode} setExecCode={setExecCode}
                codeEditorRef={codeEditorRef}
                comment={comment} setComment={setComment}
                addComment={addComment} removeComment={removeComment}
                commentStyle={commentStyle} setCommentStyle={setCommentStyle}
                commentsStyle={commentsStyle} setCommentsStyle={setCommentsStyle}
                // getComments={getComments}
                displayComments={displayComments} setDisplayComments={setDisplayComments}
            />
            <CodeEditor
                height="60vh"
                theme="vs-dark"
                defaultLanguage="javascript"
                defaultValue="// code"
                value={codeContent}
                onMount={(editor, monaco) => codeEditorRef.current = editor}
                onChange={showValue}
            />
            <Footer />
        </>
        )
    }
    return (
        <>
        <Header
            docID={docID} setDocID={setDocID}
            docName={docName} setDocName={setDocName}
            setDocContent={setDocContent}
            codeID={codeID} setCodeID={setCodeID}
            setCodeContent={setCodeContent}
            allowedUsers={allowedUsers} setAllowedUsers={setAllowedUsers}
            token={token} setToken={setToken}
            showMessage={showMessage}
            setAllDocs={setAllDocs}
            setCurrentUser={setCurrentUser}
            codeMode={codeMode} setCodeMode={setCodeMode}
            currentEditor={currentEditor} setCurrentEditor={setCurrentEditor}
            newDoc={newDoc} newCode={newCode}
            displayComments={displayComments} setDisplayComments={setDisplayComments}
            setCommentStyle={setCommentStyle}
            setCommentsStyle={setCommentsStyle}
            setComment={setComment}
        />
        <Alert
            message={message}
            alertStyle={alertStyle} setAlertStyle={setAlertStyle}
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
            downloadPdfDocument={downloadPdfDocument}
            sendEmail={sendEmail} setSendEmail={setSendEmail}
            invite={invite}
            codeMode={codeMode} setCodeMode={setCodeMode}
            comment={comment} setComment={setComment}
            addComment={addComment} removeComment={removeComment}
            commentStyle={commentStyle} setCommentStyle={setCommentStyle}
            commentsStyle={commentsStyle} setCommentsStyle={setCommentsStyle}
            // getComments={getComments}
            displayComments={displayComments} setDisplayComments={setDisplayComments}
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
                    'fontselect ' +
                    'bold italic backcolor | alignleft aligncenter ' +
                    'alignright alignjustify | bullist numlist outdent indent | ' +
                    'removeformat | help',
                content_style: 'body { font-family:Times New Roman, serif; font-size:14px; margin: 7.5%;}'
            }}
        />
        <Comments
        commentsStyle={commentsStyle}
        displayComments={displayComments} setDisplayComments={setDisplayComments}
        removeComment={removeComment}
        updateComment={updateComment}
        comment={comment} setComment={setComment}
        updateMode={updateMode} setUpdateMode={setUpdateMode}
        />
        <Footer />
        </>
    );
}

export default App;
