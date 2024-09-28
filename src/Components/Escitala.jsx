import React, { useState } from 'react';
import ManejoErrores from './ManejoErrores'; // Componente para manejar y mostrar errores
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Asegúrate de instalar Font Awesome
import { faClipboard, faPaste } from '@fortawesome/free-solid-svg-icons'; // Íconos

function Escitala() {
    const [mensaje, setMensaje] = useState('');
    const [columnas, setColumnas] = useState(0);
    const [mensajeCifrado, setMensajeCifrado] = useState('');
    const [error, setError] = useState('');
    const [tooltip, setTooltip] = useState('');
    const [tooltipPos, setTooltipPos] = useState({ left: 0, top: 0 });
    const [modalInfoVisible, setModalInfoVisible] = useState(false);

    const manejarCifrar = (texto, cols) => {
        if (!texto || cols <= 0) {
            setError('Ingresar un mensaje y el número correcto de columnas.');
            return '';
        }
        setError('');
        let cifrado = '';
        const mensajeLimpio = texto.replace(/\s+/g, '');

        for (let i = 0; i < cols; i++) {
            for (let j = i; j < mensajeLimpio.length; j += cols) {
                cifrado += mensajeLimpio[j];
            }
        }

        return cifrado;
    };

    const manejarDescifrar = (texto, cols) => {
        if (!texto || cols <= 0) {
            setError('Ingresar un mensaje cifrado y el número correcto de columnas.');
            return '';
        }
        setError('');

        let descifrado = new Array(texto.length).fill('');
        let posicion = 0;

        for (let i = 0; i < cols; i++) {
            for (let j = i; j < texto.length && posicion < texto.length; j += cols) {
                descifrado[j] = texto[posicion];
                posicion++;
            }
        }

        return descifrado.join('');
    };

    const manejarCambioMensaje = (e) => {
        const texto = e.target.value;
        setMensaje(texto);
        const cifrado = manejarCifrar(texto, columnas);
        setMensajeCifrado(cifrado);
    };

    const manejarCambioColumnas = (e) => {
        const valor = Number(e.target.value);
        setColumnas(valor);
        if (mensaje) {
            const cifrado = manejarCifrar(mensaje, valor);
            setMensajeCifrado(cifrado);
        } else {
            const descifrado = manejarDescifrar(mensajeCifrado, valor);
            setMensaje(descifrado);
        }
    };

    const manejarCambioMensajeCifrado = (e) => {
        const textoCifrado = e.target.value;
        setMensajeCifrado(textoCifrado);
        const descifrado = manejarDescifrar(textoCifrado, columnas);
        setMensaje(descifrado);
    };

    const mostrarTooltip = (e, texto) => {
        const { clientX, clientY } = e;
        setTooltip(texto);
        setTooltipPos({ left: clientX, top: clientY });
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
        if (texto) {
            navigator.clipboard.writeText(texto)
                .then(() => {
                    setError('Texto copiado al portapapeles.');
                })
                .catch(() => {
                    setError('Error al copiar el texto.');
                });
        }
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
                <div
                    className="tooltip-container"
                    onClick={abrirModalInfo}
                >
                    <img src="/Images/info.png" alt="Información" className="imagen-info" />
                    <label> Documentación</label>
                </div>
            </div>
            <div className="imagen-dec-container">
                 <img src="/Images/scitala.png" className="imagen-dec" />
            </div>
            
            <h2>Cifrado Escítala</h2>
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
                        <button onClick={() => copiarTexto(mensaje || mensajeCifrado)} className="boton-copiar">
                            <FontAwesomeIcon icon={faClipboard} />
                        </button>
                        <button onClick={() => pegarTexto(setMensaje)} className="boton-pegar">
                            <FontAwesomeIcon icon={faPaste} />
                        </button>
                    </div>
                </div>
                <div className="campo">
                    <label htmlFor="numeroColumnas">Número de Columnas</label>
                    <div className="input-contenedor">
                        <input
                            id="numeroColumnas"
                            className="numeroDesplazamiento"
                            type="number"
                            placeholder="Número de columnas"
                            value={columnas}
                            onChange={manejarCambioColumnas}
                            min="1"
                        />
                    </div>
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
                        <button onClick={() => copiarTexto(mensaje || mensajeCifrado)} className="boton-copiar">
                            <FontAwesomeIcon icon={faClipboard} />
                        </button>
                    </div>
                </div>
            </div>

            {tooltip && (
                <span className="tooltip" style={{ left: tooltipPos.left, top: tooltipPos.top }}>
                    {tooltip}
                </span>
            )}

            {/* Modales */}
            {modalInfoVisible && (
                <div className="modal" onClick={cerrarModalClickExterior}>
                    <div className="contenido-modal">
                        <span className="cerrar-modal" onClick={cerrarModalInfo}>&times;</span>
                        <div>
                        <h3>Guía de Uso: Cifrados Escítala</h3>
                        <h4>¿Qué es?</h4>
                        <p>
                            El cifrado Escítala es un método de cifrado que utiliza una cinta enrollada (o bastón) para cifrar y descifrar mensajes. El mensaje se escribe en la cinta y se enrolla; solo quien tenga la cinta puede leerlo.
                        </p>
                        <h4>¿Cómo funciona?</h4>
                        <ul>
                            <li><strong>Paso 1:</strong> Escribe el mensaje en el campo "Mensaje".</li>
                            <li><strong>Paso 2:</strong> Introduce el número de filas que utilizarás en el cifrado.</li>
                            <li><strong>Paso 3:</strong> Haz clic en "Cifrar" para obtener el mensaje cifrado.</li>
                            <li><strong>Paso 4:</strong> El mensaje cifrado aparecerá en el campo "Mensaje Cifrado". Puedes copiarlo para usarlo.</li>
                        </ul>
                        <h4>Ejemplo:</h4>
                        <ul>
                            <li><strong>Mensaje:</strong> ATTACKATDAWN</li>
                            <li><strong>Filas:</strong> 3</li>
                            <li><strong>Mensaje Cifrado:</strong> ATKDAWTCA</li>
                        </ul>
                        <h4>Pasos:</h4>
                        <ol>
                            <li><strong>Selección del Cilindro:</strong> Se elige un cilindro de un tamaño específico.</li>
                            <li><strong>Escritura:</strong> La tira se enrolla alrededor del cilindro, y el mensaje se escribe a lo largo de la tira.</li>
                            <li><strong>Desenrollado:</strong> Al desenrollar la tira, las letras aparecen en una secuencia diferente, volviéndose ininteligibles.</li>
                            <li><strong>Cifrado:</strong> Solo si el receptor tiene un cilindro de tamaño idéntico puede leer el mensaje correctamente.</li>
                            </ol>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Escitala;
