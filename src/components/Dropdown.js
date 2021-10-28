import React from 'react';

const Dropdown = (props) => {
    const { docs } = props;
    const { codes } = props;

    if (!props.codeMode && (!docs || docs.length === 0)) return (
    <button className="dropbtn">
    <i style={{cursor: "not-allowed"}} title="No docs available" className="material-icons">folder_open</i>
    </button>
    );

    if (props.codeMode && (!codes || codes.length === 0)) return (
        <button className="dropbtn">
        <i style={{cursor: "not-allowed"}} title="No codes available" className="material-icons">folder_open</i>
        </button>
        );

    if (props.codeMode) {
        return (
            <div className="dropdown">
                <button className="dark-dropbtn">
                    <i title="Open code-document" className="material-icons dark-material-icons">folder_open</i>
                </button>
                <div className="dropdown-content dark-dropdown-content">
                    {codes.map((code) => {
                        return (
                            <button key={code._id} onClick={e => {
                                props.newCode();
                                props.setCodeID(code._id);
                                props.setDocName(code.name)
                                props.setCodeContent(code.content)
                                props.setAllowedUsers(code.allowed_users.join(", "));
                            }} id={code._id} className="dark-btn" value={code._id}>{code.name}
                            </button>
                        );
                    })}
                </div>
            </div>
        );
    }

    return (
        <div className="dropdown">
            <button className="dropbtn">
                <i title="Open document" className="material-icons">folder_open</i>
            </button>
            <div className="dropdown-content">
                {docs.map((doc) => {
                    return (
                        <button key={doc._id} onClick={e => {
                            props.newDoc();
                            props.setDocID(doc._id);
                            props.setDocName(doc.name)
                            props.setDocContent(doc.content)
                            props.setAllowedUsers(doc.allowed_users.join(", "));
                        }} id={doc._id} className="btn" value={doc._id}>{doc.name}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default Dropdown;
