import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { Modal, Button, ModalHeader, ModalBody, ModalFooter, Input, InputGroup, Form } from 'reactstrap';
import { backendApi } from "../api";
import { useEmailConfirmation } from "../hooks/useEmailConfirmation";



export function ResetModal({ isPwForgotten, SetIsPwForgotten }) {
    const { confirmToken, sendTokenToEmail, } = useEmailConfirmation();
    const [showModal, setShowModal] = useState(false);
    
    const [hideToken, setHideToken] = useState(true);
    const [hidePw, setHidePw] = useState(true);
    const [hideStopBtn, setHideStop] = useState(true);
    const [hideKlaarBtn, setHideKlaar] = useState(false);

    const [mailError, setMailError] = useState(' ');
    const [tokenError, setTokenError] = useState(' ');
    const [PasswordError, setPasswordErr] = useState(' ');

    const usernameRef = useRef(' ');
    const PasswordRef = useRef('');


    const toggle = () => {
        SetIsPwForgotten(false);
        setHidePw(true);
        setHideToken(true);
        setMailError(' ');
        setTokenError(' ');
        setPasswordErr(' ');
        setHideStop(true);
        setHideKlaar(false);
    }


    const ClickHandler = async (e) => {
        const userName = usernameRef.current.value;
        const isMailConfirmed = await sendTokenToEmail(userName, true);
        if (!isMailConfirmed) {
            setMailError('De bijbehorende emailadres is niet geverifieerd ❌, neem contact op met onze klantenservice.');
        }
        else {
            setMailError('Controleer uw emailadres. 📧✔️');
            setHideToken(false);
        }
    }


    const ChangeHandler = async (e) => {
        const userName = usernameRef.current.value;
        const token = e.target.value;
        console.log(e.target.value);

        if (token.length >= 12) {
            const data = await confirmToken(token, userName, false, true);
            if (data != null) {
                setTokenError('✔️');
                localStorage.setItem('swt', data.token);
                setHidePw(false);
                setHideStop(false);
            }
            else setTokenError('De tokens komen niet overeen. ❌');
        }
    }


    const PwClickHandler = async () => {
        const NewPass = PasswordRef.current.value;
        const SWT = localStorage.getItem('swt');
        const resp = await backendApi.put('/api/account/UpdateVergetenWachtwoord', {
            nieuwWachtwoord: NewPass
        }, { headers: { 'Authorization': 'Bearer ' + SWT } });

        if (resp.status == 200) {
            setPasswordErr('🔑 Uw wachtwoord is aangepast ✔️');
            setHideKlaar(true);
            localStorage.removeItem('swt');
        }
        else {
            setPasswordErr('🔑 Het opgegeven wachtwoord is niet sterk genoeg. ❌');
        }
    }


    useEffect(() => {
        setShowModal(isPwForgotten);
    }, [isPwForgotten]);


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

                        <Button color="secondary" onClick={toggle} hidden={hideStopBtn}>
                            Sluit
                        </Button>

                        <Button color="primary" onClick={CloseHandler} hidden={hideKlaarBtn}>
                            Ok
                        </Button>

                    </ModalFooter>
                </Modal>
            </div>
        </>
    );
}