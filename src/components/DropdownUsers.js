import React from 'react';

const DropdownUsers = (props) => {

    const { authUsers } = props;
    let userArray;
    if (props.allowedUsers) {
        userArray = props.allowedUsers.split(", ");
    }

    if (!authUsers || authUsers.length === 0) return <p>No Users, sorry</p>;

    return (
        <div className="dropdown">
            <button className="dropbtn">
                <i title="Add allowed user" className="material-icons">group_add</i>
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
