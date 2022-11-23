import React, { useEffect, useState } from 'react'
import Header from './components/Header'
import Modal from './components/Modal'
import ListadoGastos from './components/ListadoGastos'
import { generarId } from './helpers'
import IconoNuevoGasto from "./img/nuevo-gasto.svg"     // Forma de importar imagenes
import Filtros from './components/Filtros'

const App = () => {
//---------------| Uso de estados |---------------
  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem('presupuesto'))??0          // Sino existe el dato asigna valor de 0
  )
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false)
  const [modal, setModal] = useState(false)
  const [animarModal, setAnimarModal] = useState(false)
  const [gastos, setGastos] = useState(
    localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : []
  )
  const [gastoEditar, setGastoEditar] = useState({})
  const [filtro, setFiltro] = useState('')
  const [filtrarGastos, setFiltrarGastos] = useState([])

//---------------| Para editar gasto |---------------
  useEffect(() => {
    if (Object.keys(gastoEditar).length > 0) {              // Para que se ejecute recien cargue la pagina
      setModal(true)
      setTimeout(() => {
        setAnimarModal(true)
      },500)
    }
  },[gastoEditar])

//---------------| Guardar presupuesto en LocalStorage |---------------
  //---> Guardar presupuesto
  useEffect(() => {
    localStorage.setItem('presupuesto', presupuesto ?? 0) // Sino existe el dato asigna valor de 0
  },[presupuesto])

  //---> Obtener presupuesto guardado y validarlo
  useEffect(() => {
    const presupuestoLS = Number(localStorage.getItem('presupuesto') ?? 0)
    if (presupuestoLS > 0) {
      setIsValidPresupuesto(true)
    }
  }, [])

//---------------| Guardar gastos en LocalStorage |---------------
  //---> Guardar gastos
  useEffect(() => {
    localStorage.setItem('gastos', JSON.stringify(gastos) ?? [])
  }, [gastos])

//---------------| Filtrar por categoria |---------------
  useEffect(() => { 
    if (filtro) {
      const gastosFiltrados=gastos.filter(gastoState=> gastoState.categoria===filtro)
      setFiltrarGastos(gastosFiltrados)
    }
  }, [filtro])

//---------------| Funciones |---------------
  //---> Abrir modal de nuevo gasto
  const handleNuevoGasto = () => {      
    setModal(true)
    setGastoEditar({})                          // Crea un objeto vacio
    setTimeout(() => {
      setAnimarModal(true) 
    },500)
  }

  //---> Guardara el gasto que reciba
  const guardarGasto = (gasto) => {
    if (gasto.id) {                           // Actualizar registro
      const gastosActualizados = gastos.map(
        gastoState =>  gastoState.id === gasto.id ? gasto : gastoState 
      )
      setGastos(gastosActualizados)
      setGastoEditar({})
    } else {                                  // Agregar nuevo registro
      gasto.id = generarId()
      gasto.fecha = Date.now()
      setGastos([...gastos, gasto])           // Crea un objeto con los datos creados
    }

    setAnimarModal(false)           
    setTimeout(() => {                        // Funcion de tiempo
      setModal(false)                         // Pasando el tiempo activa la funcion
    },500)
  }

  //---> Eliminar gasto
  const eliminarGasto = (id) => {
    // Todo lo que sea diferente del ID 
    const gastosActualizados = gastos.filter(gastoState => gastoState.id !== id)
    setGastos(gastosActualizados)
  }

//---------------| Valor que regresara |---------------
  return (
    <div className={modal ? 'fijar' : ''}>
      <Header
        gastos={gastos}
        setGastos={setGastos}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
      />
      {isValidPresupuesto && (
        <React.Fragment>
          <main>
            <Filtros filtro={filtro} setFiltro={setFiltro} />
            <ListadoGastos
              gastos={gastos}
              setGastoEditar={setGastoEditar}
              eliminarGasto={eliminarGasto}
              filtro={filtro}
              filtrarGastos={filtrarGastos}
            />
          </main>
          <div className='nuevo-gasto'>
            <img
              src={IconoNuevoGasto}                         // Ruta de imagen
              alt="IconoNuevoGasto"                         // Texto alternativo
              onClick={handleNuevoGasto}                    // Activara el modal
            />
            </div>
        </React.Fragment>
      )}

      {modal && (
        <Modal
          setModal={setModal}
          animarModal={animarModal}
          setAnimarModal={setAnimarModal}
          guardarGasto={guardarGasto}
          gastoEditar={gastoEditar}
          setGastoEditar={setGastoEditar}
        />
      )}
      
    </div>
  )
}

export default App