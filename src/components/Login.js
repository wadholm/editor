import React from 'react'


const Login = (props) => {

    return (
        <>
        <h1>Editor</h1>
        <div className="login-container">
            <div className="wrapper">
                <div className="login-field">
                    <h1>Login</h1>
                    <div className="login">
                    <label>Email</label>
                        <input
                            type="email"
                            placeholder="email"
                            onChange={e => {
                                props.setLoginUsername(e.target.value);
                            }}
                        />
                    </div>
                    <div className="login">
                    <label>Password</label>
                        <input
                            type="password"
                            placeholder="password"
                            minLength="4"
                            onChange={e => {
                                props.setLoginPassword(e.target.value);
                            }}
                        />
                    </div>
                    <button className="log" onClick={props.login}>Login</button>
                </div>
                <div className="register-field">
                <p>Don't have an account yet? Register here!</p>
                    <h1>Register</h1>
                    <div className="login">
                    <label>Email</label>
                        <input
                            type="email"
                            placeholder="email"
                            onChange={e => {
                                props.setRegisterUsername(e.target.value);
                            }}
                        />
                    </div>
                    <div className="login">
                    <label>Password</label>
                        <input
                            type="text"
                            placeholder="password"
                            minLength="4"
                            onChange={e => {
                                props.setRegisterPassword(e.target.value);
                            }}
                        />
                    </div>
                    <button className="log" onClick={props.register}>Register</button>
                </div>
            </div>
        </div>
        </>
    );
}

export default Login
