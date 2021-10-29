import React, { useEffect, useState } from 'react';

const Comments = (props) => {
    const [currentComment, setCurrentComment] = useState("");

    const setUpdateComment = (comment) => {
        var update = document.getElementById("update");
        if (update) {
            // close update field
            props.setUpdateMode(false);
        } else {
            // make update
            props.setUpdateMode(true);
            props.setComment(comment);
            setCurrentComment(comment);
        }
    }

    let comments;

    useEffect(() => {
        // console.log(comments);
    }, [comments]);

    if (props.displayComments) {
        let editorArea = document.getElementsByClassName("tox-edit-area");
        let editorDocument;
        if (process.env.NODE_ENV === 'test') {
            editorDocument = document.body;
        } else {
            editorDocument = editorArea[0].childNodes[0].contentDocument;
        }
        comments = editorDocument.getElementsByClassName("user-comments");

        if (props.updateMode && comments.length > 0) {
            return (
                <div id="comments" className="comments-div" style={props.commentsStyle}>
                    <div className="comments-title">
                    <h4>Comments</h4>
                    </div>
                {Array.prototype.map.call(comments, comment => {
                    if (props.updateMode && comment.dataset.comment === currentComment)
                    return (
                        <div className="comments-wrapper" key={comment.id}>
                        <label className="label">Text:</label>
                        <textarea readOnly={true} className="text-p" id={comment.id} value={comment.textContent}></textarea>
                        <label className="label">Comment:</label>
                        <input
                            id="update"
                            className="text-input"
                            type="text"
                            placeholder="Update comment"
                            value={props.comment}
                            onChange={e => {
                                props.setComment(e.target.value);
                            }}
                            />
                        <label className="label">By:</label>
                        <p id={comment.id}>{comment.dataset.user}</p>
                        <div className="btn-wrapper">
                            <button onClick={e => {
                                setUpdateComment(e.target.value);
                            }} id={comment.id} className="comment-btn" value={comment.dataset.comment}>Update comment
                            </button>
                            <button onClick={e => {
                            props.updateComment(e.target.value);
                            // props.setUpdateMode(false);
                            props.setComment("");
                            }} id={comment.id} className="comment-btn" value={comment.id}>Save changes
                            </button>
                            <button onClick={e => {
                            props.removeComment(e.target.value);
                            }} id={comment.id} className="comment-btn reverse" value={comment.id}>Delete comment
                            </button>
                        </div>
                        </div>
                    )
                    return (
                    <div className="comments-wrapper" key={comment.id}>
                    <label className="label">Text:</label>
                    <textarea readOnly={true} className="text-p" id={comment.id} value={comment.textContent}></textarea>
                    <label className="label">Comment:</label>
                    <p id={comment.id}>{comment.dataset.comment}</p>
                    <label className="label">By:</label>
                    <p id={comment.id}>{comment.dataset.user}</p>
                    <div className="btn-wrapper">
                        <button onClick={e => {
                            setUpdateComment(e.target.value);
                        }} id={comment.id} className="comment-btn" value={comment.dataset.comment}>Update comment
                        </button>
                        <button onClick={e => {
                        props.removeComment(e.target.value);
                        }} id={comment.id} className="comment-btn reverse" value={comment.id}>Delete comment
                        </button>
                    </div>
                    </div>
                    );
                })}
                </div>
            );
        }

        if (comments.length > 0) {
            return (
                <div id="comments" className="comments-div" style={props.commentsStyle}>
                    <div className="comments-title">
                    <h4>Comments</h4>
                    </div>
                {Array.prototype.map.call(comments, comment => {
                    return (
                    <div className="comments-wrapper" key={comment.id}>
                    <label className="label">Text:</label>
                    <textarea readOnly={true} className="text-p" id={comment.id} value={comment.textContent}></textarea>
                    <label className="label">Comment:</label>
                    <p id={comment.id}>{comment.dataset.comment}</p>
                    <label className="label">By:</label>
                    <p id={comment.id}>{comment.dataset.user}</p>
                    <div className="btn-wrapper">
                        <button onClick={e => {
                            setUpdateComment(e.target.value);
                        }} id={comment.id} className="comment-btn" value={comment.dataset.comment}>Update comment
                        </button>
                        <button onClick={e => {
                        props.removeComment(e.target.value);
                        }} id={comment.id} className="comment-btn reverse" value={comment.id}>Delete comment
                        </button>
                    </div>
                    </div>
                    );
                })}
                </div>
            );
        }
    }



    return (
        <div id="comments" className="comments-div" style={props.commentsStyle}>
        <div className="comments-title">
        <h4>Comments</h4>
        </div>
        <div className="comments-wrapper">
            <p>No comments to display.</p>
        </div>
        </div>
    );
};

export default Comments;
