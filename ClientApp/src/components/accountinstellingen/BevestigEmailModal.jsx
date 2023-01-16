import React, { useEffect, useState } from "react";
import { Modal, Button, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap';
import { backendApi } from "../api";
import { useLogin } from "../hooks/useLogin";

export function BevestigEmailModal({ username, isConfirmed }) {
    const [modal, setModal] = useState(false);
    const { verifyEmailToken, sendEmailToken } = useLogin();
    const [error, setError] = useState(' ');
    const toggle = () => { setModal(!modal) }
    

    useEffect(() => {
        if (modal && isConfirmed) {
            sendEmailToken(username);
        }
    }, [modal]);

    const ChangeHandler = async (e) => {
        const token = e.target.value;
        console.log(e.target.value);

        if (token.length == 12) {
            const failed = await verifyEmailToken(token, username, true);
            if (failed) setError('de token komt niet overeen ❌');
            else setError('Uw Emailadres is bevestigd 📧✔️');
        }
    }

    const CloseHandler = () => {
        toggle();
    }

    return (
        <>
            <Button type="button" className="btn btn-primary" onClick={toggle}>
                Bevestigen
            </Button>

            <div className='exampleModal' id='SchakelTweeFactorModal' style={{ display: 'none' }}>
                <Button className='exampleModa' color="danger">
                    Click Me
                </Button>
                <Modal isOpen={modal} id='SchakelTweeFactorModalIn' >
                    <ModalHeader >Voer de token in die naar uw email-adres is verstuurd.</ModalHeader>
                    <ModalBody>
                        <Input type="text" onChange={ChangeHandler} />
                    </ModalBody>
                    <ModalFooter>
                        <p>{error}</p>
                        <Button color="primary" onClick={CloseHandler} >
                            klaar
                        </Button>{' '}
                    </ModalFooter>
                </Modal>
            </div>
        </>
    );
}