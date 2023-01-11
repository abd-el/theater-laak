import React, { Component }  from 'react';
import { Groepslidrij } from './Groepslidrij';


export class GroepsledenTabel extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount = () => {

    }

    render() {

        return (
            <div>
            <table className="table table-bordered table-dark">
                <thead>
                    <tr>
                        <th scope="col">
                            Groepsleden                        
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.leden.map((lid, index) => (
                        <Groepslidrij key={index} naam={lid} />
                    ))}
                </tbody>
            </table>
        </div>
        )
    }
}