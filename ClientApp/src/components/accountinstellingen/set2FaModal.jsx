import React, { useEffect, useState } from "react";
import { Modal, Button, ModalHeader, ModalBody, ModalFooter, Input, Label } from 'reactstrap';

export function TwoFactorModal({ showModal, setShowModal }) {
    const [modal, setModal] = useState(false);
    const close = () => { setShowModal(false); }


    useEffect(() => {
        setModal(showModal);
    }, [showModal]);


    return (
        <>
            <div className='exampleModal' style={{ display: 'none' }}>
                <Modal isOpen={modal} >
                    <ModalHeader >Twee factor authenticatie</ModalHeader>
                    <ModalBody>
                        <Label type="text">U heeft 2FA ingeschakeld. Sla uw instellingen op om de aanpassing door te voeren. 📥</Label>
                    </ModalBody>
                    <ModalFooter>
                        <p></p>
                        <Button color="primary" onClick={close}>
                            Ok
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
        </>
    );
}