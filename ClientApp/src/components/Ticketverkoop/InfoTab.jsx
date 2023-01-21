import React, { useState, useEffect, useCallback, useRef } from 'react';
export function InfoTab(props) {

    const [optreden, setOptreden] = useState([]);
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [opgeslagenRef, setRef] = useState(0);
    const [totalePrijs, setTotalePrijs] = useState('');
    const [ticketId, setId] = useState('onbekend');
    const BetalingKnopRef = useRef(null);

    const weekdays = ['Zo', 'Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za'];
    const months = ['jan.', 'feb.', 'maart', 'april', 'mei', 'juni', 'juli', 'aug.', 'sep.', 'okt.', 'nov.', 'dec.'];

    let today = new Date();
    let min = today.getMinutes();
    let hours = today.getHours();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    let yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }

    if (mm < 10) {
        mm = '0' + mm;
    }

    if (hours < 10) {
        hours = '0' + hours;
    }

    if (min < 10) {
        min = '0' + min;
    }

    today = yyyy + '-' + mm + '-' + dd + 'T' + hours + ':' + min;

    function einde(tijdStip, minuten) {
        let date = new Date(tijdStip);
        let temp = date.getTime() + minuten * 60000;
        date = new Date(temp);
        let min = date.getMinutes();
        let hours = date.getHours();
        let dd = date.getDate();
        let mm = date.getMonth() + 1;
        let yyyy = date.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }

        if (mm < 10) {
            mm = '0' + mm;
        }

        if (min < 10) {
            min = '0' + min;
        }

        date = yyyy + '-' + mm + '-' + dd + 'T' + hours + ':' + min;
        return date;
    }

    function prijsBerekenen() {
        let getal = 0;
        for (let i = 0; i < props.gekozenStoelen.length; i++) {
            if (props.gekozenStoelen[i].rang == 1) {
                getal += 10;
            }

            if (props.gekozenStoelen[i].rang == 2) {
                getal += 5;
            }

            if (props.gekozenStoelen[i].rang == 3) {
                getal += 1.50;
            }
        }
        setTotalePrijs((optreden.prijs * props.gekozenStoelen.length) + getal);
    }

    useEffect(() => {
        setIsLoading(true);
        fetch(`/api/optreden/GetOptreden?optredenId=${props.optredenId}`)
            .then(response => response.json())
            .then(data => {
                setData(data);
                setIsLoading(false);
                console.log(data);
                setOptreden(data);
                prijsBerekenen();
            });
    }, [props.optredenId, props.gekozenStoelen]);

    async function MaakTicketAan() {
        let id = 'onbekend';
        await fetch('/api/TicketVerkoop/MaakTicket', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('authState'))?.token
            },
            body: JSON.stringify({
                optredenId: props.optredenId,
                stoelId: props.gekozenStoelen[0].stoelId,
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data.success)
                    setRef(data.id);
                    setId(data.id);
                    id = data.id;
            })
    }

    useEffect(() => {
        if (opgeslagenRef == ticketId) {
            BetalingKnopRef.current.submit();
        }
    }, [opgeslagenRef, ticketId]);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (optreden.voorstelling == undefined) {
        return <p>Geen data ontvangen.</p>;
    }

    if(optreden.datumTijdstip < today){
        return(
            <div className="square bg-dark rounded position-relative start-50 translate-middle w-50 p-3">
                <label> Helaas is de ticketverkoop voor de gekozen optreden gesloten. </label>
                <br />
                <br/>
                <a className=' btn btn-secondary' href='/programmering'>Terug naar de Programmering</a>
            </div>
        );
    }

    if (props.gekozenStoelen.length == 0) {

        return (
            <div>
                <div className="square bg-dark rounded position-relative start-50 translate-middle w-25 p-3">
                    <img className='rounded shadow-4 float-sm-start' src={optreden.voorstelling.afbeelding} height='135' />
                    &nbsp;&nbsp;&nbsp;<label className='fs-4 fw-bold'>{optreden.voorstelling.titel}</label>
                    <div>
                        <br />
                        &nbsp;&nbsp;<strong className='text-danger'>•</strong><strong>&nbsp;Zaal: </strong><text>{optreden.zaalId}</text>
                        <br />
                        &nbsp;&nbsp;<strong className='text-danger'>•</strong><strong>&nbsp;Datum: </strong><text>{weekdays[new Date(optreden.datumTijdstip.split('T')[0]).getDay()] + ' ' + new Date(optreden.datumTijdstip.split('T')[0]).getDate() + ' ' + months[new Date(optreden.datumTijdstip.split('T')[0]).getMonth()]}</text>
                        <br />
                        &nbsp;&nbsp;<strong className='text-danger'>•</strong><strong>&nbsp;Tijdstip: </strong><text>{optreden.datumTijdstip.split('T')[1].substring(0, 5) + ' tot ' + einde(optreden.datumTijdstip, optreden.voorstelling.tijdsduurInMinuten).split('T')[1].substring(0, 5)}</text>
                        <br />
                    </div>
                </div>
            </div>
        );
    }

    else {
        return (
            <div>
                <div className="square bg-dark rounded position-relative start-50 translate-middle w-50 p-3">
                    <label className='fs-4'>{props.gekozenStoelen.length == 1 && '1 Stoel'}{props.gekozenStoelen.length > 1 && props.gekozenStoelen.length + ' Stoelen'}</label>
                    <br />
                    <br />
                    {props.gekozenStoelen.map((stoel) => (
                        <text className='text-secondary'>{'Rij ' + stoel.rij + ' stoel ' + stoel.stoelId}&nbsp;&nbsp;<text className='badge bg-secondary text-wrap' style={{ width: "3rem", fontSize: "9px" }}>{' Rang ' + stoel.rang}&nbsp;</text>&nbsp;&nbsp;<text className='badge bg-danger text-wrap' style={{ width: "3rem", fontSize: "9px" }}>{stoel.rang == 1 ? `€ ${optreden.prijs + 10}` : stoel.rang == 2 ? `€ ${optreden.prijs + 5}` : `€ ${optreden.prijs + 1.50}`}&nbsp;</text><br /></text>
                    ))}
                    <hr className="hr hr-blurry" style={{ backgroundColor: "red" }} />
                    <img className='rounded shadow-4 float-sm-start' src={optreden.voorstelling.afbeelding} height='135' />
                    &nbsp;&nbsp;&nbsp;<label className='fs-4 fw-bold'>{optreden.voorstelling.titel}</label>
                    <div>
                        <br />
                        &nbsp;&nbsp;<strong className='text-danger'>•</strong><strong>&nbsp;Zaal: </strong><text>{optreden.zaalId}</text>
                        <br />
                        &nbsp;&nbsp;<strong className='text-danger'>•</strong><strong>&nbsp;Datum: </strong><text>{weekdays[new Date(optreden.datumTijdstip.split('T')[0]).getDay()] + ' ' + new Date(optreden.datumTijdstip.split('T')[0]).getDate() + ' ' + months[new Date(optreden.datumTijdstip.split('T')[0]).getMonth()]}</text>
                        <br />
                        &nbsp;&nbsp;<strong className='text-danger'>•</strong><strong>&nbsp;Tijdstip: </strong><text>{optreden.datumTijdstip.split('T')[1].substring(0, 5) + ' tot ' + einde(optreden.datumTijdstip, optreden.voorstelling.tijdsduurInMinuten).split('T')[1].substring(0, 5)}</text>
                        <br />
                    </div>
                </div>
                <div className="square bg-dark rounded position-relative start-50 translate-middle w-50 p-3">
                    <div className='square rounded p-2' >
                        <label className='fs-5 fw-bold p-2' style={{ blockSize: "3rem", width: "300px" }}>TOTAAL </label>
                        <label className='fs-5 fw-bold p-2' style={{ blockSize: "3rem", width: "145px", textAlign: "right" }}>{'€ ' + totalePrijs}</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <button className='square rounded p-2 btn-danger' onClick={MaakTicketAan}>Betalen</button>
                        <form ref={BetalingKnopRef} className='d-none' action="https://fakepay.azurewebsites.net" method="post" encType="application/x-www-form-urlencoded">
                            <input name="amount" value={totalePrijs} className="d-none" />
                            <input name="reference" value={opgeslagenRef} className="d-none" />
                            <input name="url" value="https://localhost:44461/api/TicketVerkoop/RondBestellingAf" className="d-none" />
                            <input id="naarBetaling" type="submit" value="Betaling" />
                        </form>
                        <hr className="hr hr-blurry" style={{ backgroundColor: "red", width: "445px", margin: "0rem" }} />
                    </div>
                </div>
            </div>
        );
    }
}