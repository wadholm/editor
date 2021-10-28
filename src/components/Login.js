import React from 'react'


const Login = (props) => {
    let body = document.body;
    let flag = false;
    // props.setCodeMode(false)
    // props.setCurrentEditor("Editor")
    body.style.background = "white";
    body.style.color = "rgb(62, 62, 62)";

    const registerEmail = () => {
        if (flag === false) {
            props.setRegisterUsername(props.eviteEmail);
        }
    }


    return (
        <>
        <h1>Editor</h1>
        <div className="login-container">
            <div className="wrapper">
                <div className="login-field">
                    <h2>Login</h2>
                    <div className="login">
                    <label>Email</label>
                        <input
                            type="email"
                            placeholder="email"
                            value={props.loginUsername}
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
                            value={props.loginPassword}
                            onChange={e => {
                                props.setLoginPassword(e.target.value);
                            }}
                        />
                    </div>
                    <button className="log" onClick={props.login}>Login</button>
                </div>
                <div className="register-field">
                <p>Don't have an account yet? Register here!</p>
                    <h2>Register</h2>
                    <div className="login">
                    <label>Email</label>
                        <input
                            type="email"
                            placeholder="email"
                            value={props.eviteEmail}
                            onChange={e => {
                                flag = true;
                                props.setEviteEmail(e.target.value);
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
                            value={props.evitePassword}
                            onChange={e => {
                                props.setEvitePassword(e.target.value);
                                props.setRegisterPassword(e.target.value);
                            }}
                        />
                    </div>
                    <button className="log" onClickCapture={registerEmail} onClick={props.register}>Register</button>
                </div>
            </div>
        </div>
        </>
    );
}

export default Login
