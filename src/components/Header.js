import React from 'react'

const Header = (props) => {
    let name = props.docName || "";
    let allowedUsers = props.allowedUsers || "";

    return (
        <div className="header">
            <h1>Editor</h1>
            <button className="log" onClick={e=> {
                props.setToken("");
                props.onShowMessage("Success!", "success", "User logged out.")
                }}>Logout</button>
            <div className="document-name">
                <label>Document</label>
                <input
                    type="text"
                    value={name}
                    placeholder="Document name"
                    onChange={e => {
                        props.setDocName(e.target.value);
                    }}
                />
            </div>
            <div className="document-users">
                <label>Allowed users</label>
                <input
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
