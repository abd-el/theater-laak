import './VoorstellingLijst.css';
import { Voorstelling } from './Voorstelling';

export function VoorstellingLijst(props) {

    return (
<ul className={classes['voorstelling-lijst']}>
    {props.voorstellingen.map((voorstelling) => (
        <Voorstelling
            titel={voorstelling.titel}
            beschrijving={voorstelling.beschrijving}
            tijdsduurInMinuten={voorstelling.tijdsduurInMinuten} 
        />
    ))}
</ul>

        // <div className='item-box'>
        //     <div>
        //         <label className='title'>
        //             {props.Voorstellingen[0].Titel}
        //         </label>
        //     </div>
        //     <div>
        //         <p className='description'>
        //             {props.Voorstellingen[0].Beschrijving}
        //         </p>
        //     </div>
        //     <div>
        //         <p className='minutes'>
        //             {props.Voorstellingen[0].TijdsduurInMinuten} minuten
        //         </p>
        //     </div>
        // </div>
    );
}