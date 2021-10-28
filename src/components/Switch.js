import React from 'react';

const Switch = (props) => {

    const run = () => {
        props.runCode()
        props.setCodeStyle({display: "block"});

    }

    const handleComment = () => {
        props.showComment();
    }

    const handleComments = () => {
        props.showComments();
        props.setDisplayComments(true);
    }

    // play
    if (props.codeMode) return (
        <>
            <i title="Run code" onClick={run} className="material-icons">play_circle_outline</i>
        </>
    );

    // pdf
    return (
        <>
        <i title="Download PDF" onClick={props.downloadPdfDocument} className="material-icons">picture_as_pdf</i>
        <i title="Add comment" onClick={handleComment} style={{transform: "scaleX(-1)"}} className="material-icons">add_comment</i>
        <i title="Show comments" onClick={handleComments} style={{transform: "scaleX(-1)"}} className="material-icons">comment</i>
        </>
    );
};

export default Switch;
