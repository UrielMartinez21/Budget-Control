import React from 'react'
import { formatearFecha } from '../helpers'
import IconoAhorro from '../img/icono_ahorro.svg'
import IconoCasa from '../img/icono_casa.svg'
import IconoComida from '../img/icono_comida.svg'
import IconoGastos from '../img/icono_gastos.svg'
import IconoOcio from '../img/icono_ocio.svg'
import IconoSalud from '../img/icono_salud.svg'
import IconoSuscripciones from '../img/icono_suscripciones.svg'

// Nota: instar prop-types  --> "npm i prop-types"
import {
    LeadingActions,
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions,
} from 'react-swipeable-list';
import 'react-swipeable-list/dist/styles.css';


//---------------| Diccionario de iconos |---------------
    //---> Sustituye los 'if'
    const diccionarioIconos = {
        ahorro: IconoAhorro,
        comida: IconoComida,
        casa: IconoCasa,
        gastosVariados: IconoGastos,
        ocio: IconoOcio,
        salud: IconoSalud,
        suscripcion: IconoSuscripciones
    }

const Gasto = ({ gasto, setGastoEditar, eliminarGasto }) => {
//---------------| Funciones |---------------
    //---> Funcion editar
    const leadingActions = () => (
    <LeadingActions>
        <SwipeAction onClick={() => setGastoEditar(gasto) }>
            Editar
        </SwipeAction>
    </LeadingActions>
    )

    //---> Funcion eliminar
    const trailingActions = () => (
    <TrailingActions>
        <SwipeAction
            onClick={() => eliminarGasto(gasto.id)}
            destructive={true}
        >
            Eliminar
        </SwipeAction>
    </TrailingActions>
    )

//---------------| Valor que regresara |---------------
    return (
        <SwipeableList>
            <SwipeableListItem
                leadingActions={leadingActions()}     // Efecto izquierda-derecha
                trailingActions={trailingActions()}   // Efecto derecha-izquierda
            >
                <div className='gasto sombra'>
                    <div className='contenido-gasto'>
                        <img src={diccionarioIconos[gasto.categoria]}/>
                        <div className='descripcion-gasto'>
                            <p className='categoria'>{gasto.categoria}</p>
                            <p className='nombre-gasto'>{gasto.nombre}</p>
                            <p className='fecha-gasto  '>
                                Agregado el: {''}
                                <span>{formatearFecha(gasto.fecha)}</span>
                            </p>
                        </div>
                    </div>
                    <p className='cantidad-gasto'>${gasto.cantidad}</p>
                </div>
                </SwipeableListItem>
        </SwipeableList>
    )
}

export default Gasto
