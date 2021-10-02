import React from 'react'

const Register = (props) => {
    return (
            <div>
                <h1>Register</h1>
                <div className="login">
                    <input
                        placeholder="email"
                        onChange={e => {
                            props.setRegisterUsername(e.target.value);
                        }}
                    />
                </div>
                <div className="login">
                    <input
                        placeholder="password"
                        onChange={e => {
                            props.setRegisterPassword(e.target.value);
                        }}
                    />
                </div>
                <button className="log" onClick={props.register}>Register</button>
            </div>
    );
}

export default Register
