import React from 'react'
import Dropdown from './Dropdown';

function Toolbar(props) {

    return (
        <div className="toolbar">
            <i title="New document" onClick={props.newDoc} className="material-icons">note_add</i>
            <Dropdown
                docID={props.docID} setDocID={props.setDocID}
                docName={props.docName} setDocName={props.setDocName}
                docContent={props.docContent} setDocContent={props.setDocContent}
                docs={props.docs}
            />
            <i title="Save changes" onClick={props.saveDoc} className="material-icons">save</i>
        </div>
    );
}

export default Toolbar
