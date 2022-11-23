import React, { useEffect, useState } from 'react'
import { formatearCantidad } from '../helpers'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

const ControlPresupuesto = ({ presupuesto, setPresupuesto, gastos, setGastos, setIsValidPresupuesto }) => {
//---------------| Controlador de gastos |---------------
    const [porcentaje,setPorcentaje]=useState(0)
    const [disponible, setDisponible] = useState(0)
    const [gastado, setGastado] = useState(0)

//---------------| Se haran los calculos del presupuesto |---------------
    useEffect(() => {
        const totalGastado = gastos.reduce((total, gasto) => Number(gasto.cantidad) + total, 0)
        const totalDisponible= presupuesto - totalGastado
        setGastado(totalGastado)
        setDisponible(totalDisponible)
        //---> Calcular porcentaje gastado
        const nuevoPorcentaje=(((presupuesto-totalDisponible)/presupuesto)*100).toFixed(2)
        //---> Se actualizara el porcentaje despues de 1 seg
        setTimeout(() => {
            setPorcentaje(nuevoPorcentaje)
        }, 1000);
    },[gastos])
//---------------| Controlador de gastos |---------------
    const handleReset = () => {
        const resultado = confirm("¿Esta seguro de resetear la app?")
        if (resultado) {
            setIsValidPresupuesto(false)
            setPresupuesto(0)
            setGastos([])
        }
    }
    
//---------------| Valor que regresara |---------------
    return (
        <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
            <div>
                <CircularProgressbar
                    styles={buildStyles({
                        pathColor: porcentaje > 100 ? '#DC2626' : '#3B82F6',
                        trailColor: '#F5F5F5',
                        textColor: porcentaje > 100 ? '#DC2626' : '#3B82F6'
                    })}
                    value={porcentaje}
                    text={`${porcentaje}% Gastado`}
                />
            </div>
            <div className='contenido-presupuesto'>
                <button
                    className='reset-app'
                    onClick={handleReset}
                >
                    Resetear app
                </button>
                <p>
                    <span>Presupuesto: </span> {formatearCantidad(Number(presupuesto))}
                </p>
                <p className={`${disponible<0?'negativo':''}`}>
                    <span>Disponible: </span> {formatearCantidad(disponible )}
                </p>
                    <p>
                    <span>Gastado: </span> {formatearCantidad(gastado)}
                </p>
            </div>
        </div>
    )
}

export default ControlPresupuesto
