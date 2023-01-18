import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { Modal, Button, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap';
import { backendApi } from "../api";
import { useEmailConfirmation } from "../hooks/useEmailConfirmation";

export function TwoStepModal({ isTweeFactorNodig, setTweeFactorNodig, username }) {
    const [modal, setModal] = useState(false);
    const { confirmToken } = useEmailConfirmation();
    const [error, setError] = useState(' ');
    const toggle = () => { setTweeFactorNodig(false) }


    useEffect(() => {
        setModal(isTweeFactorNodig);
    }, [isTweeFactorNodig]);


    const ChangeHandler = async (e) => {
        const token = e.target.value;
        if (token.length == 12) {
            const failed = await confirmToken(token, username.current.value);
            if (!failed) setError('de token komt niet overeen. ❌');
        }
    }


    return (
        <>
            <div className='exampleModal' style={{ display: 'none' }}>
                <Modal isOpen={modal} >
                    <ModalHeader >Voer de token in die naar uw emailadres is verstuurd.</ModalHeader>
                    <ModalBody>
                        <Input type="text" onChange={ChangeHandler} />
                    </ModalBody>
                    <ModalFooter>
                        <p>{error}</p>
                        <Button color="primary" onClick={toggle}>
                            Ok
                        </Button>{' '}
                    </ModalFooter>
                </Modal>
            </div>
        </>
    );
}