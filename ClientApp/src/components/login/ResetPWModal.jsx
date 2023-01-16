import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { Modal, Button, ModalHeader, ModalBody, ModalFooter, Input, InputGroup, Form } from 'reactstrap';
import { backendApi } from "../api";

export function ResetModal({ forgotPass, setPass, verify, sendMail }) {
    const [showModal, setShowModal] = useState(false);
    const [hideToken, setHideToken] = useState(true);
    const [hidePw, setHidePw] = useState(true);
    const [hideStopBtn, setHideStop] = useState(true);
    const [mailError, setMailError] = useState(' ');
    const [tokenError, setTokenError] = useState(' ');
    const [PasswordError, setPasswordErr] = useState(' ');
    const usernameRef = useRef(' ');
    const PasswordRef = useRef('');


    const toggle = () => {
        setPass(false);
        setHidePw(true);
        setHideToken(true);
        setMailError(' ');
        setPasswordErr(' ');
    }


    useEffect(() => {
        setShowModal(forgotPass);
    }, [forgotPass]);


    const ClickHandler = async (e) => {
        const username = usernameRef.current.value;
        const isMailConfirmed = await sendMail(username);
        if (!isMailConfirmed) {
            setMailError('de bijbehorende email-adres is niet geverifieerd ❌, neem contact op met onze klantenservice');
        }
        else {
            setMailError('controleer uw email-adres 📧✔️');
            setHideToken(false);
        }
    }


    const ChangeHandler = async (e) => {
        const username = usernameRef.current.value;
        const token = e.target.value;
        console.log(e.target.value);

        if (token.length >= 12) {
            const data = await verify(token, username);
            if (data != null) {
                setTokenError('✔️');
                localStorage.setItem('swt', data.token);
                setHidePw(false);
                setHideStop(false);
            }
            else setTokenError('de tokens komen niet overeen ❌');
        }
    }


    const PwClickHandler = async () => {
        const NewPass = PasswordRef.current.value;
        const SWT = localStorage.getItem('swt');
        console.log(SWT);
        const resp = await backendApi.put('/api/account/UpdateVergetenWachtwoord', {
            nieuwWachtwoord: NewPass
        }, { headers: { 'Authorization': 'Bearer ' + SWT } });

        if (resp.status == 200) {
            setPasswordErr('🔑 Uw wachtwoord is aangepast ✔️');
            localStorage.removeItem('swt');
        }
        else {
            setPasswordErr('🔑 Het opgegeven wachtwoord is niet sterk genoeg ❌');
        }
    }


    const CloseHandler = () => {
        if (hidePw) toggle();
        else PwClickHandler();
    }


    return (
        <>
            <div className='exampleModal' style={{ display: 'none' }}>

                <Modal isOpen={showModal}>
                    <ModalHeader >Reset uw wachtwoord</ModalHeader>
                    <ModalBody>

                        <InputGroup>
                            <div className="col-sm-8">
                                <input ref={usernameRef} placeholder="Gebruikersnaam" type="text" className="form-control" />
                            </div>
                            <div className="col-sm-4">
                                <input type="button" value="verstuur 📧" onClick={ClickHandler} className="form-control bg-primary" />
                            </div>
                        </InputGroup>

                        <p>{mailError}</p>
                        <Input type="text" placeholder="Token" onChange={ChangeHandler} hidden={hideToken} />
                        <p>{tokenError}</p>
                        <input ref={PasswordRef} type="Password" placeholder="Nieuwe wachtwoord" hidden={hidePw} className="form-control mt-3" />
                        <p>{PasswordError}</p>

                    </ModalBody>
                    <ModalFooter>

                        <Button color="danger" onClick={toggle} hidden={hideStopBtn}>
                            stop
                        </Button>

                        <Button color="primary" onClick={CloseHandler}>
                            klaar
                        </Button>

                    </ModalFooter>
                </Modal>
            </div>
        </>
    );
}