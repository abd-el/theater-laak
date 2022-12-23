import React, { useEffect, Component }  from 'react';

export class HuidigeBoekingen extends Component {
    render() {
        return (
            // er is al container en row dus je hoeft alleen col-X nog te doen
            <div className='col-4 text-white d-inline'>
                <div className='d-inline kop-text'>
                    Huidige Boekingen
                </div>

                <div>
                    <table class="table table-dark">
                        <thead>
                            <tr>
                                <th scope="col">
                                    Titel
                                </th>
                                <th scope="col">
                                    Zaal
                                </th>
                                <th scope="col">
                                    Bevestigd
                                </th>
                                <th scope="col">
                                    Datum & tijdstip
                                </th>
                            </tr>
                        </thead>
                    </table>
                </div>
            </div>
        )
    }
}