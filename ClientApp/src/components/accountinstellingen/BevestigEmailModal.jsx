import React, { useEffect, useState } from "react";
import { Modal, Button, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap';
import { backendApi } from "../api";
import { useEmailConfirmation } from "../hooks/useEmailConfirmation";
import { useLogin } from "../hooks/useLogin";

export function BevestigEmailModal({ username, veranderEmailBevestigd, isEmailNieuw }) {
    const [modal, setModal] = useState(false);
    const [blockedMessage, setBlockedMessage] = useState('Bevestig');
    const [isButtonDisabled, setButtonDisabled] = useState(false);
    const { confirmToken, sendTokenToEmail } = useEmailConfirmation();
    const [error, setError] = useState(' ');
    const toggle = () => { setModal(!modal) }


    useEffect(() => {
        if (modal) {
            sendTokenToEmail(username);
        }
    }, [modal]);

    useEffect(() => {
        if (isEmailNieuw) {
            setBlockedMessage('Sla uw emailadres op');
            setButtonDisabled(true);
        }
        else {
            setBlockedMessage('Bevestig');
            setButtonDisabled(false);
        }
    }, [isEmailNieuw]);


    const ChangeHandler = async (e) => {
        const token = e.target.value;
        if (token.length == 12) {
            const result = await confirmToken(token, username, true);
            if (!result) setError('de token komt niet overeen ❌');
            else {
                veranderEmailBevestigd(true);
                setError('Uw emailadres is bevestigd. Sla uw instellingen op om de aanpassing door te voeren. 📧✔️ ');
            }
        }
    }


    const CloseHandler = () => {
        setError(' ');
        toggle();
    }

    return (
        <>
            <Button type="button" className="btn btn-primary" onClick={toggle} disabled={isButtonDisabled}>
                {blockedMessage}
            </Button>

            <div className='exampleModal' id='SchakelTweeFactorModal'>
                <Modal isOpen={modal} id='SchakelTweeFactorModalIn' >
                    <ModalHeader >Voer de token in die naar uw emailadres is verstuurd.</ModalHeader>
                    <ModalBody>
                        <Input type="text" onChange={ChangeHandler} />
                    </ModalBody>
                    <ModalFooter>
                        <p>{error}</p>
                        <Button color="primary" onClick={CloseHandler} >
                            Ok
                        </Button>{' '}
                    </ModalFooter>
                </Modal>
            </div>
        </>
    );
}