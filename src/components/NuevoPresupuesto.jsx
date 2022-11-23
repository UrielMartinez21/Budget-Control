import React, { useState } from 'react'
import Mensaje from './Mensaje'

const NuevoPresupuesto = ({ presupuesto, setPresupuesto, setIsValidPresupuesto }) => {
    const [mensaje,setMensaje]=useState('')

//---------------| Funcion de envio |---------------
    const handleSubmit = (e) => {
        e.preventDefault()
        if (!presupuesto || presupuesto < 1) {      // No es numero o es menor de 1
            setMensaje("Numero no valido")
            return                                  // No ejecutara nada mas
        }
        setMensaje('')                              // Cadena vacia
        setIsValidPresupuesto(true)
    }

//---------------| Valor que regresara |---------------
    return (
        <div className='contenedor-presupuesto contenedor sombra'>
            <form onSubmit={handleSubmit} className='formulario'>
                <div className='campo'>
                    <label>Definir presupuesto</label>
                    <input
                        className='nuevo-presupuesto'
                        type='number'
                        placeholder='Añade tu presupuesto'
                        value={presupuesto}
                        onChange={e => setPresupuesto(e.target.value)}
                        min={0}
                    />
                </div>
                <input type='submit' value='Añadir' />
                {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
            </form>
        </div>
    )
}

export default NuevoPresupuesto
