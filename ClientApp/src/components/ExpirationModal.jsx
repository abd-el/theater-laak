import React, { useEffect } from 'react';
import '../custom.css';
import { useRef } from 'react';
import { useState } from 'react';
import { useAuthContext } from './hooks/useAuthContext';
import { useLogin } from './hooks/useLogin';
import { Modal, Button, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import jwtDecode from 'jwt-decode';



export function ExpirationModal() {
    const [modal, setModal] = useState(false);
    const { authState, } = useAuthContext();
    const { logout } = useLogin();
    const toggle = () => setModal(!modal);
    let [counter, setCounter] = useState(new Date() / 1000);
    let [counterID, setCounterID] = useState();


    useEffect(() => {
        if (authState != null) {
            counterID = setInterval(() => {
                setCounter((prevCounter) => prevCounter + 1);
            }, 1000);

            setCounterID(counterID);
        }
        return () => clearInterval(counterID);
    }, [authState]);



    useEffect(() => {
        if (counter != null) {
            localStorage.setItem('counter', counter);
        }
    }, [counter]);



    useEffect(() => {
        if (authState != null) {
            const decodedJwt = jwtDecode(authState.token);
            const expDate = decodedJwt.exp;

            if (counter < expDate && counter + 1 > expDate) {
                setModal(!modal);
            }
            if (counter > expDate + 5) {
                logout();
            }
        }
    }, [counter]);



    return (
        <>
            <div className='exampleModal' style={{ display: 'none' }}>
                <Button className='exampleModa' color="danger" onClick={toggle}>
                    Click Me
                </Button>
                <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle}>Sessie verlopen</ModalHeader>
                    <ModalBody>
                        Uw sessie is verlopen. Meld u opnieuw aan.
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={toggle}>
                            Sluit het venster
                        </Button>{' '}
                    </ModalFooter>
                </Modal>
            </div>
        </>
    );
}