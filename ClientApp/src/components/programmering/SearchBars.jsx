import './Programmering.css';
import React, { useState } from 'react';

export function SearchBars(){
    const [enteredDate, setEnteredDate] = useState('');
    const [enteredTitle, setEnteredTitle] = useState('');

    function setEnteredDateHandler(event) {
        setEnteredDate(event.target.value);
    }

    function setEnteredTitleHandler(event) {
        setEnteredTitle(event.target.value);
    }

    function submitHandler(event) {
        event.preventDefault();
        setEnteredDate('');
        setEnteredTitle('');
    }

    return (
        <form onSubmit={submitHandler}>
            <div className='date-box'>
                <label>Week:</label>
                <input type='week' value={enteredDate} onChange={setEnteredDateHandler} />
            </div>
            <br />
            <div className='text-box'>
                <label>Voorstelling:</label>
                <input value={enteredTitle} onChange={setEnteredTitleHandler} />
            </div>
            <br />
            <div className='box'>
                <button type='submit'>Zoeken</button>
            </div>
        </form>
    );
}