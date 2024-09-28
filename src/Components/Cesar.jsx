import React, { useState } from 'react';
import ManejoErrores from './ManejoErrores'; // Componente para manejar y mostrar errores
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Asegúrate de instalar Font Awesome
import { faClipboard, faPaste } from '@fortawesome/free-solid-svg-icons'; // Ícono de portapapeles

function CifradoCesar() {
    const [mensaje, setMensaje] = useState('');
    const [mensajeCifrado, setMensajeCifrado] = useState('');
    const [desplazamiento, setDesplazamiento] = useState(0);
    const [error, setError] = useState('');
    const [modalInfoVisible, setModalInfoVisible] = useState(false); // Agregado para controlar la visibilidad del modal
    const [tooltip, setTooltip] = useState('');
    const [tooltipPos, setTooltipPos] = useState({ left: 0, top: 0 }); // Posición del tooltip

    // Función para cifrar el mensaje usando el desplazamiento
    const cifrarMensaje = (texto, despl) => {
        return texto
            .split('')
            .map(char => {
                if (char.match(/[A-Z]/)) {
                    return String.fromCharCode((char.charCodeAt(0) + despl - 65) % 26 + 65);
                }
                return char;
            })
            .join('');
    };

    // Función para descifrar el mensaje usando el desplazamiento
    const descifrarMensaje = (texto, despl) => {
        return texto
            .split('')
            .map(char => {
                if (char.match(/[A-Z]/)) {
                    return String.fromCharCode((char.charCodeAt(0) - despl + 26 - 65) % 26 + 65);
                }
                return char;
            })
            .join('');
    };

    // Validar que solo contenga letras mayúsculas y espacios
    const validarEntrada = (texto) => {
        const regex = /^[A-Z\s]*$/;
        return regex.test(texto);
    };

    const manejarCambioMensaje = (e) => {
        const texto = e.target.value.toUpperCase();
        setMensaje(texto);

        if (!validarEntrada(texto)) {
            setError('El mensaje solo puede contener letras mayúsculas y espacios.');
            setMensajeCifrado('');
            return;
        }
        
        if (desplazamiento > 0) {
            const cifrado = cifrarMensaje(texto, parseInt(desplazamiento));
            setMensajeCifrado(cifrado);
            setError('');
        } else {
            setError('Ingresa un número de desplazamiento mayor a 0.');
        }
    };

    const manejarCambioMensajeCifrado = (e) => {
        const texto = e.target.value.toUpperCase();
        setMensajeCifrado(texto);

        if (!validarEntrada(texto)) {
            setError('El mensaje cifrado solo puede contener letras mayúsculas y espacios.');
            setMensaje('');
            return;
        }
        
        if (desplazamiento > 0) {
            const descifrado = descifrarMensaje(texto, parseInt(desplazamiento));
            setMensaje(descifrado);
            setError('');
        } else {
            setError('Ingresa un número de desplazamiento mayor a 0.');
        }
    };

    const manejarCambioDesplazamiento = (e) => {
        const valor = parseInt(e.target.value);
        setDesplazamiento(valor);

        if (mensaje && valor > 0) {
            setMensajeCifrado(cifrarMensaje(mensaje, valor));
            setError('');
        } else if (mensajeCifrado && valor > 0) {
            setMensaje(descifrarMensaje(mensajeCifrado, valor));
            setError('');
        } else {
            setError('Ingresa un mensaje y un desplazamiento válido.');
        }
    };

    const abrirModalInfo = () => {
        setModalInfoVisible(true);
    };

    const cerrarModalInfo = () => {
        setModalInfoVisible(false);
    };

    const cerrarModalClickExterior = (e) => {
        if (e.target.classList.contains('modal')) {
            cerrarModalInfo();
        }
    };

    const copiarTexto = (texto) => {
        navigator.clipboard.writeText(texto)
            .then(() => {
                setError('Texto copiado al portapapeles.');
            })
            .catch(() => {
                setError('Error al copiar el texto.');
            });
    };

    const pegarTexto = (setTexto) => {
        navigator.clipboard.readText()
            .then((texto) => {
                setTexto(texto.toUpperCase()); // Pega el texto y convierte a mayúsculas
            })
            .catch(() => {
                setError('Error al pegar el texto.');
            });
    };

    return (
        <div className="contenedor">
            <div className="imagenes-esquinas">
                <div className="tooltip-container" onClick={abrirModalInfo}>
                    <img
                        src="../Images/info.png"
                        alt="Información"
                        className="imagen-info"
                    />
                    <label> Documentación</label>
                </div>
                <div className="imagen-dec-container">
                    <img src="/Images/cifracesar.png" className="imagen-dec" />
                </div>
            </div>
            <h2>Cifrado César</h2>
            <ManejoErrores error={error} />
            <div className="formulario">
                <div className="campo">
                    <label htmlFor="mensaje">Mensaje</label>
                    <div className="input-contenedor">
                        <input
                            id="mensaje"
                            className="mensaje"
                            type="text"
                            placeholder="Mensaje"
                            value={mensaje}
                            onChange={manejarCambioMensaje}
                        />
                        <button onClick={() => copiarTexto(mensaje)} className="boton-copiar">
                            <FontAwesomeIcon icon={faClipboard} />
                        </button>
                        <button onClick={() => pegarTexto(setMensaje)} className="boton-pegar">
                            <FontAwesomeIcon icon={faPaste} />
                        </button>
                    </div>
                </div>
                <div className="campo">
                    <label htmlFor="numeroDesplazamiento">Desplazamiento</label>
                    <input
                        id="numeroDesplazamiento"
                        className="numeroDesplazamiento"
                        type="number"
                        placeholder="Desplazamiento"
                        value={desplazamiento}
                        onChange={manejarCambioDesplazamiento}
                        min="1"
                    />
                </div>
                <div className="campo">
                    <label htmlFor="mensajeCifrado">Mensaje Cifrado</label>
                    <div className="input-contenedor">
                        <input
                            id="mensajeCifrado"
                            className="mensajeCifrado"
                            type="text"
                            placeholder="Mensaje Cifrado"
                            value={mensajeCifrado}
                            onChange={manejarCambioMensajeCifrado}
                        />
                        <button onClick={() => copiarTexto(mensajeCifrado)} className="boton-copiar">
                            <FontAwesomeIcon icon={faClipboard} />
                        </button>
                    </div>
                </div>
            </div>

            {modalInfoVisible && (
                <div className="modal" onClick={cerrarModalClickExterior}>
                    <div className="contenido-modal">
                        <span className="cerrar-modal" onClick={cerrarModalInfo}>&times;</span>
                        <div>
                            <h3>Guía de Uso: Cifrados César</h3>
                            <h4>¿Qué es?</h4>
                            <p>
                                El cifrado César es un método de cifrado simple en el que cada letra del texto se desplaza un número fijo de posiciones en el alfabeto. Por ejemplo, con un desplazamiento de 3, la letra A se convierte en D.
                            </p>
                            <h4>¿Cómo funciona?</h4>
                            <ul>
                                <li><strong>Paso 1:</strong> Ingresa el mensaje en el campo "Mensaje".</li>
                                <li><strong>Paso 2:</strong> Introduce el número de desplazamiento (por ejemplo, 3).</li>
                                <li><strong>Paso 3:</strong> El mensaje cifrado aparecerá en el campo "Mensaje Cifrado". Puedes copiarlo para usarlo.</li>
                            </ul>
                            <h4>Ejemplo:</h4>
                            <ul>
                                <li><strong>Mensaje:</strong> HELLO</li>
                                <li><strong>Desplazamiento:</strong> 3</li>
                                <li><strong>Mensaje Cifrado:</strong> KHOOR</li>
                            </ul>
                            <h4>Proceso:</h4>
                            <ol>
                                <li><strong>Selección del Desplazamiento:</strong> El emisor elige un número fijo (por ejemplo, 3) que indica cuántas posiciones se desplazarán las letras.</li>
                                <li><strong>Escritura del Mensaje:</strong> Se escribe el mensaje original, por ejemplo, "HOLA".</li>
                                <li><strong>Cifrado:</strong> Cada letra se desplaza hacia adelante en el alfabeto.
                                    <ul>
                                        <li>H → K</li>
                                        <li>O → R</li>
                                        <li>L → O</li>
                                        <li>A → D</li>
                                    </ul>
                                    <strong>Resultado:</strong> "KROD"
                                </li>
                                <li><strong>Envio del Mensaje:</strong> El mensaje cifrado se envía al receptor.</li>
                            </ol>
                            <h4>Desencriptado:</h4>
                            <p>
                                El receptor, que conoce el desplazamiento, desplaza cada letra hacia atrás para recuperar el mensaje original.
                            </p>
                            <h4>Dato</h4>
                            <p>
                                Utilizado por Julio César para enviar mensajes secretos a sus generales. La simplicidad del método permitía una comunicación rápida y eficaz sin necesidad de herramientas complejas.
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CifradoCesar;
