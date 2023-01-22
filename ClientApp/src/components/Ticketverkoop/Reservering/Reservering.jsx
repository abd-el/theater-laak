import React, { useEffect, useRef, useState } from "react";
import { backendApi } from "../../api";
import { StoelSelector } from "./StoelSelector";
import { RangSelector } from "./RangSelector";
import './Reservering.css'


export function Reservering({ optredenId }) {
    const [Stoelen, setStoelen] = useState();
    const [showStoelen, setShowStoelen] = useState(false);

    const [rangId, setRangId] = useState();
    const [EersteRangsStoelen, setEersteRang] = useState([]);
    const [TweedeRangsStoelen, setTweedeRang] = useState([]);
    const [DerdeRangsStoelen, setDerdeRang] = useState([]);

    const [selectie, setSelectie] = useState([]);


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
        let _Stoelen = [];

        if (rangId == 1)
            _Stoelen = EersteRangsStoelen;

        else if (rangId == 2)
            _Stoelen = TweedeRangsStoelen;

        else
            _Stoelen = DerdeRangsStoelen;

        setStoelen(_Stoelen);
    }

    const deleteDuplicateStoel = (stoel) => {
        const selectieZonderDuplicates = selectie.filter((currentValue) => {
            return currentValue.stoelId != stoel.stoelId;
        })
        setSelectie(selectieZonderDuplicates);
    }

    const handleStoelClick = (e) => {
        const attr = e.target.attributes;
        const obj = {
            stoelId: attr.stoelid.value,
            zaalId: 0,
            rang: rangId,
            rij: attr.rijid.value
        }

        if (!selectie) {
            setSelectie([obj]);
            return
        }

        if(selectie.find(currentValue => {
            return currentValue.stoelId == obj.stoelId
        }) != null){
            deleteDuplicateStoel(obj);
            return
        }
        
        if (selectie.length == 5) {
            console.log("max aantal stoelen bereikt");
            return
        }
        else {
            setSelectie([...selectie, obj]);
        }
    }


    const switchScenes = () => {
        if(!showStoelen){
            return <RangSelector setRangId={setRangId} setShowStoelen={setShowStoelen} />
        }
        else{
            return <StoelSelector Stoelen={Stoelen} optredenId={optredenId} handleStoelClick={handleStoelClick} selectie={selectie}/>
        }
    }

    return (
        <div className='ReserveringContainer pb-2'>
            {switchScenes()}
        </div>
    );
}