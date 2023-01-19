import React from "react";
import Theater from '../../images/bioscoop.jpg';


export function Figure() {

    return (
        <figure className="position-relative mb-5">
            <img alt="Plaatje van een " src={Theater} className="img-fluid">
            </img>
            <figcaption className='text-inside-image'>
                <div className="display-3">
                    Reserveer
                </div>
                <div className="mt-3">
                    Reserveer uw gewenste stoel.
                    <br />
                    Selecteer uw rang om het bijbehorende stoelnummer te reserveren.
                    <br />
                    Het is uiteraard ook mogelijk om meerdere stoelnummers te reserveren.
                </div>
            </figcaption>
        </figure>
    );

}