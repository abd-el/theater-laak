import React, { useState, useEffect, useCallback } from 'react';
export function InfoTab(props) {

    const [error, setError] = useState(null);
    const [optreden, setOptreden] = useState([]);
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    //const [voorstelling, setVoorstellingen] = useState([]);

    const weekdays = ['Zo', 'Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za'];
    const months = ['jan.', 'feb.', 'maart', 'april', 'mei', 'juni', 'juli', 'aug.', 'sep.', 'okt.', 'nov.', 'dec.'];
    const stoelen = [
        {
            stoelId: 1,
            zaalId: optreden.zaalId,
            rang: 1,
            rij: 1
        },
        {
            stoelId: 2,
            zaalId: optreden.zaalId,
            rang: 2,
            rij: 2
        },
        {
            stoelId: 3,
            zaalId: optreden.zaalId,
            rang: 3,
            rij: 3
        }
    ];

    let reference = optreden.datumTijdstip + '-' + optreden.optredenId + '-' + optreden.zaalId + '-' + optreden.voorstellingId;

    let totaalPrijs = optreden.prijs * props.gekozenStoelen.length;

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

    let content = 'test';

    useEffect(() => {
        setIsLoading(true);
        fetch(`/api/optreden/GetOptreden?optredenId=${props.optredenId}`)
            .then(response => response.json())
            .then(data => {
                setData(data);
                setIsLoading(false);
                console.log(data);
                setOptreden(data);

            });
    }, [props.optredenId]);

    const body = new URLSearchParams();
    body.append('amount', totaalPrijs);
    body.append('reference', reference);
    body.append('url', 'https://localhost:44461/programmering');

    async function naarBetalen() {
        let bestelling = {
            amount: totaalPrijs,
            reference: reference,
            url: "https://localhost:44461/programmering"
        };
        // https://fakepay.azurewebsites.net/?amount=10&reference=reference&url=https://localhost:44461/programmering
        await fetch('https://fakepay.azurewebsites.net/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                //'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('authState')).token
            },
            body: body
        })
            .then(r => r.json())
            .then(d => {
                console.log(d);
            })
        // console.log(bestelling)
    }

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (optreden.voorstelling == undefined) {
        return <p>Geen data ontvangen.</p>;
    }



    if (props.gekozenStoelen.length == 0) {

        return (
            <div>
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
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
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <div className="square bg-dark rounded position-relative start-50 translate-middle w-50 p-3">
                    <label className='fs-4'>{props.gekozenStoelen.length == 1 && '1 Stoel'}{props.gekozenStoelen.length > 1 && props.gekozenStoelen.length + ' Stoelen'}</label>
                    <br />
                    <br />
                    {props.gekozenStoelen.map((stoel) => (
                        <text className='text-secondary'>{'Rij ' + stoel.rij + ' stoel ' + stoel.stoelId}&nbsp;&nbsp;<text className='badge bg-secondary text-wrap' style={{ width: "3rem", fontSize: "9px" }}>{' Rang ' + stoel.rang}&nbsp;</text>&nbsp;&nbsp;<text className='badge bg-danger text-wrap' style={{ width: "3rem", fontSize: "9px" }}>{'€ ' + optreden.prijs}&nbsp;</text><br /></text>
                    ))}
                    <hr class="hr hr-blurry" style={{ backgroundColor: "red" }} />
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
                        <label className='fs-5 fw-bold p-2' style={{ blockSize: "3rem", width: "145px", textAlign: "right" }}>{'€ ' + totaalPrijs}</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <button className='square rounded p-2 btn-danger' onClick={naarBetalen}>NAAR BETALEN</button>
                        <form action="https://fakepay.azurewebsites.net/?amount=10&reference=abc123&url=https://localhost:44461/programmering" method="POST" encType="application/x-www-form-urlencoded">
                            <button>Betaling</button>
                        </form>
                        <hr class="hr hr-blurry" style={{ backgroundColor: "red", width: "445px", margin: "0rem" }} />
                    </div>
                </div>
            </div>
        );
    }
}