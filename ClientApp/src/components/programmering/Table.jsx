import './Table.css';

export function Table() {
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
        <div className='item-box'>
            <div>
                <label className='title'>
                    {Voorstellingen[0].Titel}
                </label>
            </div>
            <div>
                <p className='description'>
                    {Voorstellingen[0].Beschrijving}
                </p>
            </div>
            <div>
                <p className='minutes'>
                    {Voorstellingen[0].TijdsduurInMinuten} minuten
                </p>
            </div>
        </div>
    );
}