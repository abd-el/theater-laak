import React, { Component }  from 'react';

export class MenuKnop extends Component {
    render() {
        return (
            <div onClick={this.props.onClick} className='btn btn-dark mt-2 d-block'>
                {this.props.text}
            </div>
        )
    }
}