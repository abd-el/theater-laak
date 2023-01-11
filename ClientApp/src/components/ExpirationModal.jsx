import React, { useEffect } from 'react';
import '../custom.css';
import { useRef } from 'react';
import { useState } from 'react';
import { useAuthContext } from './hooks/useAuthContext';
import { useLogin } from './hooks/useLogin';
import { Modal, Button, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import jwtDecode from 'jwt-decode';
//import "bootstrap/dist/css/bootstrap.css";



export function ExpirationModal() {
    const [modal, setModal] = useState(false);
    // const [isLoading, setLoading] = useState(true);
    const { authState, } = useAuthContext();
    const { logout } = useLogin();

    let [counter, setCounter] = useState();

    const toggle = () => setModal(!modal);

    useEffect(() => {
        if (authState != null) {
            const json = localStorage.getItem('counter');
            if(json != null){
                const parsedcounter = JSON.parse(json);
                setCounter(parsedcounter);
            }

            const interval = setInterval(() => {
                setCounter((prevCounter) => prevCounter + 1);
            }, 1000);

            return () => clearInterval(interval);
        }
        else { //haal huidige date op
            setCounter(new Date()/1000);
        }

    }, [authState]);

    useEffect(() => {
        //console.log(counter);
        if(counter != null){
            localStorage.setItem('counter', counter);
        }
    }, [counter]);

    useEffect(() => {
        if (authState != null) {

           const decodedJwt = jwtDecode(authState.token);
           const expDate = decodedJwt.exp;
           //console.log('expiration date: ' + expDate);

            if (counter > expDate) {
                setCounter(0);
                logout();
                setModal(!modal);
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