import React from 'react'

function Header(props) {

    let name = props.docName || "";

    return (
        <div className="header">
            <h1>Editor</h1>
            <div className="document-name">
                <input
                    type="text"
                    value={name}
                    placeholder="Document name"
                    onChange={e => {
                        props.setDocName(e.target.value);
                    }}
                />
            </div>
        </div>
    );
}

export default Header
