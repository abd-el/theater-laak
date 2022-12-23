import React, { useEffect, Component }  from 'react';
import ReactDOM from 'react-dom';
import { useState } from 'react';

export class KnopLayout extends Component {
    render() {
        return (
            <div className='btn btn-dark mt-2 d-block'>
                {this.props.text}
            </div>
        )
    }
}