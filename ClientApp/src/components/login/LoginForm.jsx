import React, { useEffect } from "react";
import axios from "axios";
import './LoginForm.css';
import { useRef, useState } from "react";
import { useAuth } from "../Auth";
import { useNavigate } from "react-router-dom";



export function LoginForm() {

    const [errorMsg, setErrorMsg] = useState();

    const username = useRef();
    const password = useRef();

    const auth = useAuth();

    function HandleClick (){
    auth.login(username.current.value, password.current.value, 
        (msg) => {
        setErrorMsg(msg);
     });
     
     //setErrorMsg(auth.message);
     
    }  

    // async function login() {
        
    //     const payload = {
    //         username: username.current.value,
    //         password: password.current.value
    //     }

    //     const url = window.location.origin + '/api/login';

    //     try {
    //         await axios.post(url, payload);
    //         setErrorMsg("login gelukt");
    //     } catch (error) {
    //         setErrorMsg("login mislukt, controleer uw gegevens");
    //     }

    // }


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
                                        <h5>{errorMsg}</h5>
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