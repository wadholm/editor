import React, { useEffect } from 'react';

const DropdownUsers = (props) => {
    useEffect(() => {
        console.info("allowed users updated");
    }, [props.allowedUsers]);

    const { authUsers } = props;
    let userArray = [];


    if (props.allowedUsers) {
        userArray = props.allowedUsers.split(", ");
    }

    if (!authUsers || authUsers.length === 0 || userArray.length === authUsers.length) {
        return (
            <button className="dropbtn">
            <i style={{cursor: "not-allowed"}} title="No users available" className="material-icons">group_add</i>
            </button>
            );
    }

    if (props.codeMode) {
        return (
            <div className="dropdown">
                <button className="dropbtn">
                    <i style={{cursor: "default"}} title="Add allowed users" className="material-icons">group_add</i>
                </button>
                <div className="dropdown-content">
                {authUsers.map((user) => {
                    if (!userArray || userArray.includes(user) === false) {
                        return (
                            <button key={user} onClick={e => {
                                let users = props.allowedUsers;
                                if (users == null) {
                                    users = user
                                } else {
                                    users +=  ", " + user;
                                }
                                props.setAllowedUsers(users)
                            }} id={user} className="dark-btn" value={user}>{user}
                            </button>
                        );
                    }
                    return null;
                    })}
                </div>
            </div>
        );
    }

    return (
        <div className="dropdown">
            <button className="dropbtn">
                <i style={{cursor: "default"}} title="Add allowed users" className="material-icons">group_add</i>
            </button>
            <div className="dropdown-content">
            {authUsers.map((user) => {
                if (!userArray || userArray.includes(user) === false) {
                    return (
                        <button key={user} onClick={e => {
                            let users = props.allowedUsers;
                            if (users == null) {
                                users = user
                            } else {
                                users +=  ", " + user;
                            }
                            props.setAllowedUsers(users)
                        }} id={user} className="btn" value={user}>{user}
                        </button>
                    );
                }
                return null;
                })}
            </div>
        </div>
    );
};

export default DropdownUsers;
