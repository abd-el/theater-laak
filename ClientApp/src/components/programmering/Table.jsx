import './Table.css';

export function Table(props) {

    return (
        <div className='item-box'>
            <div>
                <label className='title'>
                    {props.Voorstellingen[0].Titel}
                </label>
            </div>
            <div>
                <p className='description'>
                    {props.Voorstellingen[0].Beschrijving}
                </p>
            </div>
            <div>
                <p className='minutes'>
                    {props.Voorstellingen[0].TijdsduurInMinuten} minuten
                </p>
            </div>
        </div>
    );
}