import React, {createContext, useState, useEffect} from 'react';
import axios from 'axios'

// Crear el Context
export const ModalContext = createContext();

// Provider es donde se encuentran las funciones y state
const ModalProvider = (props) => {

    //Crear el state del Context
    const [idReceta, guardarIdReceta] = useState(null);
    const [infoReceta, guardarInfoReceta] = useState({})


    //Ejecutar el llamado a la API-UseEffect
    useEffect(() => {
        const obtenerDetalles = async () => {
            if (idReceta == null) return;
            const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idReceta}`
            const respuesta = await axios.get(url)
            guardarInfoReceta(respuesta.data.drinks[0])

        }

        obtenerDetalles()
    }, [idReceta])


    return (
        <ModalContext.Provider
            value={{guardarIdReceta, infoReceta, guardarInfoReceta}}>
            {props.children}
        </ModalContext.Provider>
    )
}

export default ModalProvider;