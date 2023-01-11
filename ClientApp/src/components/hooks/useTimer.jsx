import React, { useEffect } from "react";
import { useAuthContext } from "./useAuthContext";
import { useState } from "react";

let timerID;

export function useTimer() {
    let { authState, timer, setTimer } = useAuthContext();

    useEffect(() => {
        const storage = localStorage.getItem('timer');

        const initTimer = () => {
            if (storage != 0) {
                setTimer(storage);
            }
            if (authState != null) {
                start();
            }
        }

        initTimer();
    }, []);

    useEffect(() => {
        if(timer != null){
            localStorage.setItem('timer', timer);
        }

    }, [timer]);

    async function start() {
        //await Promise.all(setTimer(0));
        const counter = () => {
            console.log("timer is at: " + timer);
            timer = timer + 1;
            setTimer(timer);
        }
        timerID = setInterval(counter, 1000);
    }

    function stop() {
        clearInterval(timerID);

        async function t() {
          await  Promise.all( setTimer(0));
        }
        t();
        
    }

    return { start, stop }
}


