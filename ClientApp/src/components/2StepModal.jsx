import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { Modal, Button, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap';
import { backendApi } from "./api";

export function TwoStepModal({ _2fa, set2FA, verify, username }) {
    const [modal, setModal] = useState(false);
    const [error, setError] = useState(' ');
    const toggle = () => { setModal(set2FA(false)) }
    const inputRef = useRef();

    useEffect(() => {
        setModal(_2fa);
    }, [_2fa]);

    const ChangeHandler = async (e) => {
        const token = e.target.value;
        console.log(e.target.value);

        if (token.length == 12) {
            const failed = await verify(token, username.current.value);
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