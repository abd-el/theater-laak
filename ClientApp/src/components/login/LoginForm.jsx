import React from "react";
import './LoginForm.css';
import { useRef } from "react";
import { useLogin } from "../hooks/useLogin";




export function LoginForm() {
    const { login, response } = useLogin();

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
                                    <h3 className="text-center text-white">Login</h3>
                                    <div className="form-group">
                                        <label htmlFor="username" className="text-white">Username:</label><br />
                                        <input ref={username} type="text" name="username" id="username" className="form-control" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password" className="text-white">Password:</label><br />
                                        <input ref={password} type="password" name="password" id="password" className="form-control" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="remember-me" className="text-white"><span>Remember me</span> <span><input id="remember-me" name="remember-me" type="checkbox" /></span></label><br />
                                        <button type="button" name="button" className="btn btn-primary btn-md" value="submit" onClick={HandleClick}>Submit</button>
                                    </div>
                                    <div id="register-link" className="text-right">
                                        <a href="/registreer" className="text-info">Heb je nog geen account?</a>
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