import React from 'react'
import Dropdown from './Dropdown';
import DropdownUsers from './DropdownUsers';
import Switch from './Switch';
import { useState } from 'react';

function Toolbar(props) {
    const [inputStyle, setInputStyle] = useState({
        display: "none",
    })
    const [codeStyle, setCodeStyle] = useState({
        display: "none",
    })

    const showInvite = () => {
        var email = document.getElementById("send");
        if (email.style.display === "none") {
        //   email.style.display = "block";
          setInputStyle({display: "block"});
        } else {
        //   email.style.display = "none";
          setInputStyle({display: "none"});
        }
    }

    const sendInvite = () => {
        setInputStyle({display: "none"});
        props.invite();
        
    }

    const hideCode = () => {
        setCodeStyle({display: "none"});
        props.setExecCode("Running code...");
    }

    const showComment = () => {
        var comment = document.getElementById("comment");
        if (comment.style.display === "none") {
        //   comment.style.display = "block";
          props.setCommentStyle({display: "block"});
        } else {
        //   comment.style.display = "none";
          props.setCommentStyle({display: "none"});
          props.setComment("");
        }
        // props.setCommentStyle({display: "block"});
    }

    const hideComment = () => {
        props.setCommentStyle({display: "none"});
        props.setComment("");
    }

    const showComments = () => {
        var comments = document.getElementById("comments");
        if (comments.style.display === "none") {
        //   comments.style.display = "block";
          props.setCommentsStyle({display: "block"});
        } else {
        //   comments.style.display = "none";
          props.setCommentsStyle({display: "none"});
          props.setDisplayComments(false);
        }

    }

    const createNew = () => {
        if (props.codeMode) {
            props.newCode();
        } else {
            props.newDoc();
        }

    }

    return (
        <>
        <div role="toolbar" className="toolbar field">
            <i title="New document" onClick={createNew} className="material-icons">note_add</i>
            <Dropdown
                newDoc={props.newDoc}
                docID={props.docID} setDocID={props.setDocID}
                docName={props.docName} setDocName={props.setDocName}
                docContent={props.docContent} setDocContent={props.setDocContent}
                docs={props.docs}
                allowedUsers={props.allowedUsers} setAllowedUsers={props.setAllowedUsers}
                codeMode={props.codeMode}
                newCode={props.newCode}
                codeID={props.codeID} setCodeID={props.setCodeID}
                codeName={props.codeName} setCodeName={props.setCodeName}
                codeContent={props.codeContent} setCodeContent={props.setCodeContent}
                codes={props.codes}
                codeEditorRef={props.codeEditorRef}
            />
            <DropdownUsers
            codeMode={props.codeMode}
            authUsers={props.authUsers}
            allowedUsers={props.allowedUsers} setAllowedUsers={props.setAllowedUsers}
            />
            <i title="Save changes" onClick={props.saveDoc} className="material-icons">save</i>
            <i title="Send invite" onClick={showInvite} className="material-icons">email</i>
            <Switch
            codeMode={props.codeMode}
            downloadPdfDocument={props.downloadPdfDocument}
            runCode={props.runCode}
            execCode={props.execCode}
            setCodeStyle={setCodeStyle}
            showComment={showComment}
            showComments={showComments}
            setDisplayComments={props.setDisplayComments}
            />
        </div>
        <div className="code-container field" style={codeStyle}>
            <i title="Close window" onClick={hideCode} className="material-icons">close</i>
            <p>{props.execCode}</p>
        </div>
        <div id="comment" className="comment-container field" style={props.commentStyle}>
            <label className="label">Select text in editor and add comment. </label>
            <input
                className="text-input comment-style"
                type="text"
                placeholder="Add your comment here"
                value={props.comment}
                onChange={e => {
                    props.setComment(e.target.value);
                }}
            />
            <button className="comment-btn" title="Add comment" onClick={props.addComment}>Comment</button>
            <button className="comment-btn reverse" title="Cancel" onClick={hideComment}>Cancel</button>
        </div>
        <div id="send" className="email-container field" style={inputStyle}>
            <label className="label">Invite to edit document</label>
                <div className="email">
                        <input
                            className="email-input"
                            type="email"
                            placeholder="email"
                            value={props.sendEmail}
                            onChange={e => {
                                props.setSendEmail(e.target.value);
                            }}
                        />
            <i title="Send invite" onClick={sendInvite} className="material-icons">send</i>
            </div>
            </div>
        </>
    );
}

export default Toolbar
