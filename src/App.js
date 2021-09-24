import React, { useEffect, useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import socketIOClient from "socket.io-client";
import Alert from 'react-popup-alert'
import Header from './components/Header';
import Toolbar from './components/Toolbar';

// const ENDPOINT = "http://127.0.0.1:1337";
const ENDPOINT = "https://jsramverk-editor-mack20.azurewebsites.net";
const socket = socketIOClient(ENDPOINT);

function App() {
    const editorRef = useRef(null);
    const [allDocs, setAllDocs] = useState(null);
    const [docID, setDocID] = useState(null);
    const [docName, setDocName] = useState(null);
    const [docContent, setDocContent] = useState(null);
    const [message, setMessage] = useState({
        type: 'succes',
        text: 'Your document has been saved!',
        show: false
    })
    let [data, setData] = useState({
        _id: "",
        name: "",
        html: ""
    });

    function onCloseMessage() {
        setMessage({
            type: '',
            text: '',
            show: false
        })
    }
  
    function onShowMessage(type, text) {
        setMessage({
            type: type,
            text: text,
            show: true
        })
    }

    useEffect(() => {
        const apiUrl = `https://jsramverk-editor-mack20.azurewebsites.net/docs`;
        fetch(apiUrl, {
            method: 'GET',
        })
        .then((res) => res.json())
        .then((docs) => {
            setAllDocs(docs.data);
        });
    }, [setAllDocs, data, message, docName]);

    const log = () => {
        if (docID) {
            setData({
                _id: docID,
                name: docName,
                html: editorRef.current.getContent()
            });

            socket.emit("update", data);
        }
    };

    const newDoc = () => {
        setDocID(null);
        setDocName(null);
        editorRef.current.setContent("");
    };

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

    const saveDoc = () => {
        const apiUrl = `https://jsramverk-editor-mack20.azurewebsites.net/docs`;
        let messageType = "success";
        let messageText = 'Your document has been saved!';
        // update doc
        if (docID) {
            fetch(apiUrl, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    _id: docID,
                    name: docName,
                    content: editorRef.current.getContent()
                }),
            })
            .catch((error) => {
                console.error('Error:', error);
                messageType = "error"
                messageText = 'Something went wrong!';
            });
        // create new doc
        } else {
            fetch(apiUrl, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: docName,
                    content: editorRef.current.getContent()
                }),
            })
            .catch((error) => {
                console.error('Error:', error);
                messageType = "error"
                messageText = 'Something went wrong!';
            });
        }
        onShowMessage(messageType, messageText);
    }

    return (
        <>
        <Header
            docID={docID} setDocID={setDocID}
            docName={docName} setDocName={setDocName}
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
            docs={allDocs}
            printContent={log}
            newDoc={newDoc}
            saveDoc={saveDoc}
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
