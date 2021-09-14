import React, { useEffect, useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import Alert from 'react-popup-alert'
import Header from './components/Header';
import Toolbar from './components/Toolbar';

function App() {
    const editorRef = useRef(null);
    const [allDocs, setAllDocs] = useState({docs: null});
    const [docID, setDocID] = useState(null);
    const [docName, setDocName] = useState(null);
    const [docContent, setDocContent] = useState(null);
    const [message, setMessage] = useState({
        type: 'succes',
        text: 'Your document has been saved!',
        show: false
    })

    function onCloseMessage() {
        setMessage({
            type: '',
            text: '',
            show: false
        })
    refreshPage();
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
            setAllDocs({ docs: docs.data });
        });
    }, [setAllDocs]);

    const log = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent().replace(/<[^>]*(>|$)|&nbsp;|&zwnj;|&raquo;|&laquo;|&gt;/g, ' '));
        }
    };

    function refreshPage() {
        window.location.reload(true);
    }

    const newDoc = () => {
        setDocID(null);
        setDocName(null);
        editorRef.current.setContent("");
    };

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
            docs={allDocs.docs}
            printContent={log}
            newDoc={newDoc}
            saveDoc={saveDoc}
        />
        <Editor
            apiKey="ghjg81e9b3or0nb7gu2jzett3idmypu5en8xwqlf948upxya"
            onInit={(evt, editor) => editorRef.current = editor}
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
