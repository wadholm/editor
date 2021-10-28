import React from 'react';

const Alert = (props) => {

    const close = () => {
        // console.log("close alert");
        // props.runCode()
        props.setAlertStyle({display: "none"});

    }

    // play
    if (props.codeMode) return (
        <>
            <div className="alert-div" style={props.alertStyle}>
                <h3>{props.message.title}</h3>
                <p>{props.message.text}</p>
                <i title="Close" onClick={close} className="material-icons">close</i>
            </div>
        </>
    );

    // pdf
    return (
        <div className="alert-div" style={props.alertStyle}>
        <h3>{props.message.title}</h3>
        <p>{props.message.text}</p>
        <i title="Close" onClick={close} className="material-icons">close</i>
        </div>
    );
};

export default Alert;
