import '../styling/Programmering.css';
import React, { useState } from 'react';

export function Programmering() {

    const [enteredDate, setEnteredDate] = useState('');
    const [enteredTitle, setEnteredTitle] = useState('');

    function setEnteredDateHandler(event) {
        setEnteredDate(event.target.value);
    }

    function submitHandler(event) {
        event.preventDefault();
        setEnteredDate('');
        setEnteredTitle('');
    }

    return (
        <form onSubmit={submitHandler}>
            <div>
                <label>Week:</label>
                <input type='week' value={enteredDate} onChange={setEnteredDateHandler} />
            </div>
            <br />
            <div>
                <label>Voorstelling:</label>
                <input />
            </div>
            <br />
            <div>
                <button type='submit'>Zoeken</button>
            </div>
        </form>
    );
}

