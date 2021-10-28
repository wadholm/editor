import React from 'react'
import Toggle from './Toggle';

const Header = (props) => {
    let name = props.docName || "";
    let allowedUsers = props.allowedUsers || "";
    let body = document.body;
    let dropbtns = document.getElementsByClassName("dropbtn");
    let labels = document.getElementsByClassName("label");
    let txtInputs = document.getElementsByClassName("txt-input");
    let emailInputs = document.getElementsByClassName("email-input");
    let materialIcons = document.getElementsByClassName("material-icons");
    let fields = document.getElementsByClassName("field");
    let logout = document.getElementsByClassName("log");
    let btns = document.getElementsByClassName("btn");
    let ddContent = document.getElementsByClassName("dropdown-content");
    let alert = document.getElementsByClassName("alert-div");

    // const resetAllValues = () => {
    //     console.log("reset");
    //     // props.setDocID("");
    //     // props.setDocName("");
    //     // props.setDocContent("");
    //     // props.setAllowedUsers("");
    //     // props.setCodeID("");
    //     // props.setCodeContent("");

    // }

    const logOut = () => {
        props.setToken("");
        props.setAllDocs("");
        props.setDocID("");
        props.setDocName("");
        props.setDocContent("");
        props.setAllowedUsers("");
        props.setCurrentUser("");
        props.setDisplayComments(false);
        props.setCommentStyle({display: "none"});
        props.setCommentsStyle({display: "none"});
        props.setComment("");
        resetDarkMode();

        props.showMessage("Success!", "User logged out.")
    }

    const darkMode = () => {
        props.setCodeMode(true)
        props.setCurrentEditor("Code-Editor")
        props.setDocContent("");
        props.setDisplayComments(false);
        props.setCommentStyle({display: "none"});
        props.setCommentsStyle({display: "none"});
        props.setComment("");
        // resetAllValues();

        props.setDocID(null);
        props.setDocName(null);
        props.setAllowedUsers(null);

        body.style.background = "#111111";
        body.style.color = "#d6d6d6";
        for (let i = 0; i < dropbtns.length; i++) {
            // dropbtns[i].classList.toggle("dark-dropbtn");
            dropbtns[i].className += " dark-dropbtn";
        }

        for (let i = 0; i < ddContent.length; i++) {
            ddContent[i].className += " dark-dropdown-content";
        }

        for (let i = 0; i < labels.length; i++) {
            labels[i].style.backgroundColor = "rgb(30 30 30 / 18%)"
        }

        for (let i = 0; i < materialIcons.length; i++) {
            // materialIcons[i].classList.toggle("dark-material-icons");
            materialIcons[i].className += " dark-material-icons";
        }
        for (let i = 0; i < fields.length; i++) {
            // fields[i].classList.toggle("dark-field");
            fields[i].className += " dark-field";
        }
        for (let i = 0; i < txtInputs.length; i++) {
            txtInputs[i].style.color = "#fefefe"
        }
        for (let i = 0; i < btns.length; i++) {
            // btns[i].classList.toggle("dark-btn");
            btns[i].className += " dark-btn";
        }
        // logout[0].classList.toggle("dark-log");
        logout[0].className += " dark-log";
        emailInputs[0].style.color = "#fefefe"
        emailInputs[0].style.borderColor = "#757575"
        alert[0].style.backgroundColor = "#111111";

    }

    const resetDarkMode = () => {
        props.setCodeMode(false)
        props.setCurrentEditor("Editor")
        props.setCodeContent("");
        // resetAllValues();

        props.setCodeID(null);
        props.setDocName(null);
        props.setAllowedUsers(null);

        body.style.background = "white";
        body.style.color = "rgb(62, 62, 62)";
        for (let i = 0; i < dropbtns.length; i++) {
            // dropbtns[i].classList.toggle("dark-dropbtn");
            dropbtns[i].className = "dropbtn";
        }

        for (let i = 0; i < ddContent.length; i++) {
            ddContent[i].className = "dropdown-content";
        }

        for (let i = 0; i < labels.length; i++) {
            labels[i].style.backgroundColor = "white"
        }

        for (let i = 0; i < materialIcons.length; i++) {
            // materialIcons[i].classList.toggle("dark-material-icons");
            materialIcons[i].className = "material-icons";
        }
        for (let i = 0; i < fields.length; i++) {
            fields[i].classList.toggle("dark-field");
            // fields[i].className = "field";
        }
        for (let i = 0; i < txtInputs.length; i++) {
            txtInputs[i].style.color = "black"
        }
        for (let i = 0; i < btns.length; i++) {
            // btns[i].classList.toggle("dark-btn");
            btns[i].className = "btn";
        }
        // logout[0].classList.toggle("dark-log");
        logout[0].className = "log";
        emailInputs[0].style.color = "black"
        emailInputs[0].style.borderColor = "#cfcfcf"
        alert[0].style.backgroundColor = "#fbfbfb";
    }



    return (
        <div className="header">
            <div className="top">
            <h1 id="head">{props.currentEditor}</h1>
            <button className="log" onClick={e=> {
                logOut();
                }}>Logout</button>
            <Toggle
                darkMode={darkMode} resetDarkMode={resetDarkMode}
            />
            </div>
            <div className="document-name field">
                <label className="label">Document</label>
                <input
                    className="txt-input"
                    type="text"
                    value={name}
                    placeholder="Document name"
                    onChange={e => {
                        props.setDocName(e.target.value);
                    }}
                />
            </div>
            <div className="document-users field">
                <label className="label">Allowed users</label>
                <input
                    className="txt-input"
                    type="text"
                    value={allowedUsers}
                    placeholder="Allowed users"
                    onChange={e => {
                        props.setAllowedUsers(e.target.value);
                    }}
                />
            </div>
        </div>
    );
}

export default Header
