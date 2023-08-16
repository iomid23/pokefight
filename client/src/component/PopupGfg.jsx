
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

export default function PopupGfg({ selectedPokemon }) {

    return (
        <div>
            <Popup trigger=
                {<button> Info </button>}
                modal nested>
                {close => (
                    <div className='modal'>
                        <div className='content'>
                            <h1>{selectedPokemon.name}</h1>
                            <img src={selectedPokemon.image} alt={selectedPokemon.name} />
                            {/* Mostrar más información del Pokémon aquí */}
                        </div>
                        <div>
                            <button onClick={() => close()}>Cerrar modal</button>
                        </div>
                    </div>
                )}
            </Popup>
        </div>
    )
}