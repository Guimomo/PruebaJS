import { cargarJSON } from "./module.js";

// Es una funcion espresada principal, con un arrow function (fincion flecha), la cual se encargara almacenar, resolver promesas y filtrar resultados.
const mostrar = async () => {
    
    //funcion expresada que solicita a todos los usuarios
    const users = await cargarJSON("users");

    //Creamos una constante o funcion expresada para desarrollar los Datos de las promesas (todas las promesas se deben cumplir o si no dara error) junto a sus respectivos comentarios
    const Datos = await Promise.all(

        //Recorremos los usuarios
        users.map(async (user) => {

            //funcion expresada que solicita los posts teniendo en cuenta el id de los usuarios
            const posts = await cargarJSON(`posts?userId=${user.id}`);

            //funcion expresada que resuelve todas las promesas de post con comentarios
            const postsConComentarios = await Promise.all(

                //recorre "posts"
                posts.map(async (post) => {
                    //asociamos los comentarios a sus respectivos post.id
                    const comentarios = await cargarJSON(`comments?postId=${post.id}`);
                    //Retornamos post junto a sus comentarios asociados a sus respectivos post.id
                    return { ...post, comentarios };
                })
            );

            //funcion expresada que solicita los albumes teniendo en cuenta el id de los usuarios
            const album = await cargarJSON(`albums?userId=${user.id}`);

            //funcion expresada que resuelve todas las promesas de albumes
            const albumsPhotos = await Promise.all(

                //recorre "albumes" 
                album.map(async (album) => {
                    // asociamos las fotos a sus respectivos album.id
                    const fotos = await cargarJSON(`photos?albumId=${album.id}`);
                    //Retornamos albumes junto a sus fotos asociadas al album.id
                    return { ...album, fotos };
                })
            );


            //Se crea una function expresada que solicita las tareas de cada user.id
            const tareas = await cargarJSON (`todos?userId=${user.id}`);
            
            // const homeworks = await Promise.all(
            //     tareas.map(async (tarea) => {

            //         return {... tarea}
            //     })
            // )

            
            const homeworks = tareas.map(tarea => ({...tarea, completed: tarea.completed ? "SI" : "NO" }));//.filter(tarea => tarea.completed)
            //Con Opera condicional (terneario)
            
            //funcion expresada que recorre un arreglo y crea un nuevo arreglo filtrado que cumple con una condicion (objeto)
            // const completeWorks = tareas.filter(tarea => tarea.completed);
            // const incompleteWorks = tareas.filter(tarea => !tarea.completed);


            //Retornamos con un operador SPREED (concatenación) todas las funciones para su visualizacion en cada array para usuarios (user)
            return { ...user, Posts: postsConComentarios, Album: albumsPhotos, Tareas: homeworks}; //, tareasCompletas: completeWorks, tareasImcompletas: incompleteWorks 
        })
    );

    //
    console.log(Datos);
}

mostrar().then ((a)=>{
    console.log(a);
});