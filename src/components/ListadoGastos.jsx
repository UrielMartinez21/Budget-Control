import React from 'react'
import Gasto from './Gasto'

const ListadoGastos = ({ gastos, setGastoEditar, eliminarGasto, filtro, filtrarGastos }) => {
//---------------| Valor que regresara |---------------
    return (
        <div className='listado-gastos contenedor'>
            {filtro ?
                (<React.Fragment>
                    <h2>{filtrarGastos.length ? "Gastos" : "No hay gastos aun"}</h2>
                    {filtrarGastos.map((gasto) => (
                        <Gasto
                            key={gasto.id}
                            gasto={gasto}
                            setGastoEditar={setGastoEditar}
                            eliminarGasto={eliminarGasto}
                        />
                    ))}
                </React.Fragment>
                )
                :
                (<React.Fragment>
                    <h2>{gastos.length ? "Gastos" : "No hay gastos aun"}</h2>
                    {gastos.map((gasto) => (
                        <Gasto
                            key={gasto.id}
                            gasto={gasto}
                            setGastoEditar={setGastoEditar}
                            eliminarGasto={eliminarGasto}
                        />
                    ))}
                </React.Fragment>
                )
            }
            {/* {gastos.map((gasto) => (
                <Gasto
                    key={gasto.id}
                    gasto={gasto}
                    setGastoEditar={setGastoEditar}
                    eliminarGasto={eliminarGasto}
                />
            ))} */}
        </div>
    )
}

export default ListadoGastos
