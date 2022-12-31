import React, { useEffect } from "react";
import axios from "axios";
import './LoginForm.css';
import { useRef, useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";



export function LoginForm() {
    const { login, response } = useLogin();
    const { state } = useAuthContext();
    if(state != null){
        console.log('the state object ' + state.user.userName);
    }

    const username = useRef();
    const password = useRef();


    async function HandleClick() {

        await login(
            username.current.value,
            password.current.value
        );

    }


    return (
        <>
            <div id="login" className="login">
                <h3 className="text-center text-white pt-5">Theater Laak</h3>
                <div className="container">
                    <div id="login-row" className="row justify-content-center align-items-center">
                        <div id="login-column" className="col-md-6">
                            <div id="login-box" className="col-md-12">
                                <form id="login-form" className="form" action="" method="post">
                                    <h3 className="text-center text-info">Login</h3>
                                    <div className="form-group">
                                        <label htmlFor="username" className="text-info">Username:</label><br />
                                        <input ref={username} type="text" name="username" id="username" className="form-control" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password" className="text-info">Password:</label><br />
                                        <input ref={password} type="password" name="password" id="password" className="form-control" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="remember-me" className="text-info"><span>Remember me</span> <span><input id="remember-me" name="remember-me" type="checkbox" /></span></label><br />
                                        <button type="button" name="button" className="btn btn-info btn-md" value="submit" onClick={HandleClick}>Submit</button>
                                    </div>
                                    <div id="register-link" className="text-right">
                                        <a href="#" className="text-info">Register here</a>
                                    </div>
                                    <div className="errorMsg text-center text-white pt-5">
                                        <h5>{response}</h5>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}