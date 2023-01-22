import React, { useEffect, useRef, useState } from "react";
import { backendApi } from "../../api";
import { StoelSelector } from "./StoelSelector";
import { RangSelector } from "./RangSelector";
import './Reservering.css'


export function Reservering({ optredenId }) {
    const [Stoelen, setStoelen] = useState();
    const [showStoelen, setShowStoelen] = useState(false);

    const [rangId, setRangId] = useState();
    const [EersteRang, setEersteRang] = useState([]);
    const [TweedeRang, setTweedeRang] = useState([]);
    const [DerdeRang, setDerdeRang] = useState([]);


    useEffect(() => {

        const getData = async () => {
            const resp = await backendApi.get(`api/optreden/GetStoelen?optredenId=${optredenId}`);
            if (resp.status == 200) {

                const stoelen = Array.from(resp.data.data);

                setEersteRang(stoelen.filter((stoel) => {
                    return stoel.rang == 1
                }));

                setTweedeRang(stoelen.filter((stoel) => {
                    return stoel.rang == 2
                }));

                setDerdeRang(stoelen.filter((stoel) => {
                    return stoel.rang == 3
                }));
            }
        }
        getData();
    }, [optredenId]);


    useEffect(() => {
        addStoelen();
    }, [rangId]);


    const addStoelen = () => {
        let rang = [];

        if (rangId == 1)
            rang = EersteRang;

        else if (rangId == 2)
            rang = TweedeRang;

        else
            rang = DerdeRang;

        setStoelen(rang);
    }


    const handleRangClick = (e) => {
        setRangId(e.target.parentNode.id);
        setShowStoelen(true);
    }

    const switchScenes = () => {
        if(!showStoelen){
            return <RangSelector handleRangClick={handleRangClick} />
        }
        else{
            return <StoelSelector Stoelen={Stoelen} optredenId={optredenId} />
        }
    }

    return (
        <div className='ReserveringContainer pb-2'>
            {switchScenes()}
        </div>
    );
}