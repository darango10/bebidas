import React, {createContext, useState, useEffect} from 'react';
import axios from 'axios'

// Crear el Context
export const RecetasContext = createContext();

// Provider es donde se encuentran las funciones y state
const RecetasProvider = (props) => {

    //Crear el state del Context
    const [recetas, guardarRecetas] = useState([]);
    const [busqueda, buscarRecetas] = useState({
        nombre: '',
        categoria: ''
    });
    const [consultar, guardarConsultar] = useState(false);

    //Ejecutar el llamado a la API
    useEffect(() => {
        if (consultar) {
            const obtenerRecetas = async () => {
                const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${busqueda.nombre}&c=${busqueda.categoria}`
                const respuesta = await axios.get(url);
                guardarRecetas(respuesta.data.drinks)
            }

            obtenerRecetas()
        }
    }, [busqueda])


    return (
        <RecetasContext.Provider value={{
            recetas,
            buscarRecetas,
            guardarConsultar
        }}>
            {props.children}
        </RecetasContext.Provider>
    )
}

export default RecetasProvider;