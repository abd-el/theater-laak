import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { Modal, Button, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap';
import { backendApi } from "../api";
import { useEmailConfirmation } from "../hooks/useEmailConfirmation";

export function TwoStepModal({ _2fa, set2FA, username }) {
    const [modal, setModal] = useState(false);
    const { confirmToken } = useEmailConfirmation();
    const [error, setError] = useState(' ');
    const toggle = () => { set2FA(false) }


    useEffect(() => {
        setModal(_2fa);
    }, [_2fa]);

    const ChangeHandler = async (e) => {
        const token = e.target.value;
        console.log(e.target.value);

        if (token.length == 12) {
            const failed = await confirmToken(token, username.current.value, false, false);
            if (failed) setError('de token komt niet overeen ❌');
        }
    }

    return (
        <>
            <div className='exampleModal' style={{ display: 'none' }}>
                <Button className='exampleModa' color="danger">
                    Click Me
                </Button>
                <Modal isOpen={modal} >
                    <ModalHeader >Voer de token in die naar uw email-adres is verstuurd.</ModalHeader>
                    <ModalBody>
                        <Input type="text" onChange={ChangeHandler} />
                    </ModalBody>
                    <ModalFooter>
                        <p>{error}</p>
                        <Button color="primary" onClick={toggle}>
                            klaar
                        </Button>{' '}
                    </ModalFooter>
                </Modal>
            </div>
        </>
    );
}