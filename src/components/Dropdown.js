import React from 'react';

const Dropdown = (props) => {

    const { docs } = props;
    if (!docs || docs.length === 0) return <p>No docs, sorry</p>;

    return (
        <div className="dropdown">
            <button className="dropbtn">
                <i title="Open document" className="material-icons">folder_open</i>
            </button>
            <div className="dropdown-content">
                {docs.map((doc) => {
                    return (
                        <button key={doc._id} onClick={e => {
                            props.setDocID(doc._id);
                            props.setDocName(doc.name)
                            props.setDocContent(doc.content)
                        }} id={doc._id} className="btn" value={doc._id}>{doc.name}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default Dropdown;
