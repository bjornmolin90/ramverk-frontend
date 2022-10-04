import React from 'react';

import authModel from '../models/auth';
import "../styles/Auth.css";

export default function Login(props) {
    function changeHandler(event) {
        let newObject = {};

        newObject[event.target.name] = event.target.value;

        props.setUser({...props.user, ...newObject});
    }

    async function register() {
        const registerResult = await authModel.register(props.user);

        if ("errors" in registerResult) {
            alert(registerResult.errors.message);
        } else {
            alert(registerResult.data.message);
        }
    }

    async function login() {
        const loginResult = await authModel.login(props.user);

        if ("errors" in loginResult) {
            alert(loginResult.errors.message);
        }

        if ("data" in loginResult) {
            props.setToken(loginResult.data.token);
        }
    }

    return (
        <>
            <div className="authForm">
                <h1>Dokumenthanteraren</h1>
                <div>
                    <div>
                        <input type="email" name="email"
                            className="inputField" placeholder='email' onChange={changeHandler}/>
                    </div>
                    <div>
                        <input type="password" name="password"
                            className="inputField" placeholder="password" onChange={changeHandler}/>
                    </div>
                </div>
                <div className="buttonDiv">
                    <button className="button" onClick={register}>Registrera</button>
                    <button className="button" onClick={login}>Logga in</button>
                </div>
            </div>
        </>
    );
}


