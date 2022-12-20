import './Programmering.css';
import { SearchBars } from './SearchBars';
import { Table } from './Table';

export function Programmering() {

    const Voorstellingen = [
        {
            VoorstellingId: 1,
            Titel: 'Kabouter en zijn vrienden',
            Beschrijving: 'Kabouter piet gaat met zijn vrienden op tocht en er gebeuren een heleboel leuke dingen...',
            TijdsduurInMinuten: 120
        },

        {
            VoorstellingId: 2,
            Titel: 'De oude mans magie',
            Beschrijving: 'Piet is een oude tovenaar...',
            TijdsduurInMinuten: 60
        },

        {
            VoorstellingId: 3,
            Titel: 'De 3 slangen en de rode boom',
            Beschrijving: '3 slangen die binnen de heilige rode boom proberen in te breken...',
            TijdsduurInMinuten: 240
        },
    ]
    return (
        <div>
            <br />
            <br />
            <br />
            <SearchBars />
            <Table
                Voorstellingen={Voorstellingen}
            />
        </div>
    );
}

