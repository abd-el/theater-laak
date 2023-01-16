import React, { useEffect, useState } from "react";
import './LoginForm.css';
import ReCAPTCHA from "react-google-recaptcha";
import { useRef } from "react";
import { useLogin } from "../hooks/useLogin";
import { keys } from "./reCaptcha_Keys";
import { backendApi } from "../api";
import { Route, Navigate, useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { TwoStepModal } from "./2StepModal";
import { ResetModal } from "./ResetPWModal";




export function LoginForm() {
    const
        {   login,
            message,
            setMessage,
            _2fa,
            set2FA,
            verifyEmailToken,
            verifyPwResetToken,
            sendEmailToken
        } = useLogin();

    const [forgotPass, SetPass] = useState(false);
    const { authState } = useAuthContext();
    const navigate = useNavigate();

    const username = useRef();
    const password = useRef();
    const captcha = useRef();

    useEffect(() => {
        if (authState != null) {
            navigate('/');
        }
    }, [authState]);

    async function HandleClick(e) {
        e.preventDefault();
        const token = captcha.current.getValue();
        const resp = await backendApi.post("api/login/ReCaptcha", {
            responseToken: token
        });

        if (resp.data == true) {
            await login(
                username.current.value,
                password.current.value
            );
        }
        else {
            setMessage('login mislukt, probeer het opnieuw');
        }

        captcha.current.reset();
    }

    const ClickHandler = (e) => {
        SetPass(true);
    }

    return (
        <>
            <div id="login" className="login">
                <h3 className="text-center text-white pt-5">Theater Laak</h3>
                <div className="container">
                    <div id="login-row" className="row justify-content-center align-items-center">
                        <div id="login-column" className="col-md-6">
                            <div id="login-box" className="col-md-12">
                                <form id="login-form" className="form" onSubmit={HandleClick} action="" method="post">
                                    <h3 className="text-center text-white">Login</h3>
                                    <div className="form-group">
                                        <label htmlFor="username" className="text-white">Username:</label><br />
                                        <input ref={username} type="text" name="username" id="username" className="form-control" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password" className="text-white">Password:</label><br />
                                        <input ref={password} type="password" name="password" id="password" className="form-control" />
                                    </div>

                                    <ReCAPTCHA className="mt-3" sitekey={keys.REACT_APP_SITE_KEY} ref={captcha} theme="dark" />

                                    <div className="form-group">
                                        <label htmlFor="remember-me" className="text-white"><span>Blijf ingelogd </span> <span><input id="remember-me" name="remember-me" type="checkbox" /></span></label><br />
                                        <button type="submit" name="button" className="btn btn-primary btn-md" value="submit">Submit</button>
                                    </div>
                                </form>

                                <div id="passwordReset-button" className="">
                                    <button onClick={ClickHandler} style={{ border: 'none' }} className="text-info bg-black position-absolute">Wachtwoord vergeten?</button>
                                </div>
                                <div className="errorMsg text-center text-white pt-5">
                                    <h5>{message}</h5>
                                </div>

                                <ResetModal
                                    forgotPass={forgotPass}
                                    setPass={SetPass}
                                    verify={verifyPwResetToken}
                                    sendMail={sendEmailToken}
                                />

                                <TwoStepModal
                                    _2fa={_2fa}
                                    set2FA={set2FA}
                                    verify={verifyEmailToken}
                                    username={username}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}