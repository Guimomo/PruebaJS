const URL=("https://jsonplaceholder.typicode.com/")

//Es una funcion expresada que realiza un callback para cada vez que se ingrese una url json se conecte con el js
export const cargarJSON = async (endpoint) => {
    
    //Una funcion expresada que espera(await) la respuesta para la solicitud de un archivo o url (promise)
    const respuesta = await fetch(`${URL}${endpoint}`);

    //parseamos y retornamos datos json a datos primitivos
    return await respuesta.json();

}