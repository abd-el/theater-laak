import './Programmering.css';
import { SearchBars } from './SearchBars';
import { VoorstellingLijst } from './VoorstellingList';
import '../../components/images/voorstellingVoorbeeld.jpg';

export function Programmering() {

    const Voorstellingen = [
        {
            VoorstellingId: 1,
            Afbeelding: '../images/voorstellingVoorbeeld.jpg',
            Titel: 'Voorbeeld 1',
            Beschrijving: 'Some text...',
            TijdsduurInMinuten: 120
        },

        {
            VoorstellingId: 2,
            Titel: 'Voorbeeld 2',
            Beschrijving: 'Some text...',
            TijdsduurInMinuten: 60
        },

        {
            VoorstellingId: 3,
            Titel: 'Voorbeeld 3',
            Beschrijving: 'Some text...',
            TijdsduurInMinuten: 240
        },
    ]
    return (
        <div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <div className='inputs'>
                <input id='searchbar' placeholder='zoek voorstelling' />
                <input id='date' placeholder='kies een datum' type='date' />
            </div>
            <br />
            <div className='buttons'>
                <button id='day'>Dag</button>
                <button id='week'>Week</button>
            </div>
            <br />
            <br />
            <br />
            <div>
                <table className="table table-bordered table-striped table-dark">
                    <thead>
                        <tr>
                            <th scope='col'>
                                Afbeelding
                            </th>
                            <th scope='col'>
                                Titel
                            </th>
                            <th scope='col'>
                                Dag/Datum
                            </th>
                            <th scope='col'>
                                Tijdstip
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    {Voorstellingen.map((Voorstellingen) =>(
                                    <tr>
                                    <td className="afbeelding"><img src='../images/voorstellingVoorbeeld.jpg' alt='voorstellingsafbeelding'/>
                                    </td>
                                    <td className="titel">
                                        {Voorstellingen.Titel}
                                    </td>
                                    <td className="dag-datum">
                                        Vandaag
                                    </td>
                                    <td className="tijdstip">
                                        15:30 - 17:15
                                    </td>
                                </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

