import React from 'react'
import NuevoPresupuesto from './NuevoPresupuesto'
import ControlPresupuesto from './ControlPresupuesto'

const Header = ({
    presupuesto,
    setPresupuesto,
    isValidPresupuesto,
    setIsValidPresupuesto,
    gastos,
    setGastos }) => {
//---------------| Valor que regresara |---------------
    return (
        <header>
            <h1>Planificador de gastos</h1>
            {isValidPresupuesto ?                                       // Si es valido el presupuesto
                (<ControlPresupuesto                                    // Pasa a la siguiente etapa
                    gastos={gastos}
                    setGastos={setGastos}
                    presupuesto={presupuesto}
                    setPresupuesto={setPresupuesto}
                    setIsValidPresupuesto={setIsValidPresupuesto}
                />) :
                (<NuevoPresupuesto                                      // Se queda en la pantalla inicio
                    presupuesto={presupuesto}
                    setPresupuesto={setPresupuesto}
                    setIsValidPresupuesto={setIsValidPresupuesto}
                />)
            }
        </header>
    )
}

export default Header
