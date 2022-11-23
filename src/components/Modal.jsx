import { useEffect, useState } from "react"
import Mensaje from "./Mensaje"
import CerrarBtn from "../img/cerrar.svg"

const Modal = ({ setModal, animarModal, setAnimarModal, guardarGasto, gastoEditar, setGastoEditar }) => {
//---------------| Variables para guardar campos |---------------
    const [nombre, setNombre] = useState("")
    const [cantidad, setCantidad] = useState(0)
    const [categoria, setCategoria] = useState("")
    const [mensaje, setMensaje] = useState("")
    const [id, setId] = useState('')
    const [fecha,setFecha]=useState('')

//---------------| Para editar gastos |---------------
    useEffect(() => {                                       // Llenara los campos 
        if (Object.keys(gastoEditar).length > 0) {
            setNombre(gastoEditar.nombre)
            setCantidad(gastoEditar.cantidad)
            setCategoria(gastoEditar.categoria)
            setId(gastoEditar.id)
            setFecha(gastoEditar.fecha)
        }
    }, [gastoEditar])

//---------------| Funcion ocultar modal |---------------
    const ocultarModal = () => {
        setAnimarModal(false)
        setGastoEditar({}) 
        setTimeout(() => {                                  // Funcion de tiempo
            setModal(false)                                 // Pasando el tiempo activa la funcion
        },500)                                              // Dura medio segundo
    }
//---------------| Funcion de envio |---------------
    const handleSubmit = (e) => {
        e.preventDefault()                                  // Evitar que se actualice la pagina
        if ([nombre, cantidad, categoria].includes('')) {   // Revisa campos vacios
            setMensaje("Todos los campos son obligatorios")
            setTimeout(() => {
                setMensaje('')                              // Quita el mensaje de error
            },2000)
            return;                                         // Retiene el envio de informacion
        }
        guardarGasto({ nombre, cantidad, categoria, id, fecha })
    }

//---------------| Valor que regresara |---------------
    return (
        <div className="modal">
            <div className="cerrar-modal">
                <img                                // Importar imagen en React
                    src={CerrarBtn}
                    alt="Cerrar Modal"
                    onClick={ocultarModal}
                />
            </div>
            <form className={`formulario ${animarModal?"animar":"cerrar"}`} onSubmit={handleSubmit}>
                {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
                <legend>{!gastoEditar.nombre ? 'Nuevo gasto':'Editar gasto'}</legend>
                <div className="campo">
                    <label htmlFor="nombre">Nombre gasto</label>
                    <input
                        id="nombre"
                        type="text"
                        placeholder="Añade el nombre del gasto"
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}
                    />
                </div>
                <div className="campo">
                    <label htmlFor="cantidad">Cantidad</label>
                    <input
                        id="cantidad"
                        type="number"
                        placeholder="Añade la cantidad del gasto"
                        value={cantidad}
                        onChange={e => setCantidad(e.target.value)}
                    />
                </div>
                <div className="campo">
                    <label htmlFor="categoria">Categoria</label>
                    <select
                        id="categoria"
                        value={categoria}
                        onChange={e => setCategoria(e.target.value)}
                    >
                        <option value="">--Seleccione--</option>
                        <option value="ahorro">Ahorro</option>
                        <option value="comida">Comida</option>
                        <option value="casa">Casa</option>
                        <option value="gastosVariados">Gastos variados</option>
                        <option value="ocio">Ocio</option>
                        <option value="salud">Salud</option>
                        <option value="suscripcion">Suscripcion</option>
                    </select>
                </div>
                <input
                    type="submit"
                    value={!gastoEditar.nombre ? 'Añadir gasto':'Guardar cambios'}
                />
            </form>
        </div>
    )
}

export default Modal
