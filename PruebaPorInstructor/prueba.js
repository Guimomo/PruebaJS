//Es una funcion expresada que realiza un callback para cada vez que se ingrese una url json se conecte con el js
const cargarJSON = async (url) => {
    
    //Una funcion expresada que espera(await) la respuesta para la solicitud de un archivo o url (promise)
    const respuesta = await fetch(url);

    //parseamos y retornamos datos json a datos primitivos
    return await respuesta.json();

}

//_____________________ingresar las URL ________________________________________________________________________________________________________________________________________
//Funcione expresada que envia un argumento(URL) y recibe un parametro(RESPUESTA.JSON())
const usuario = async () => await cargarJSON("https://jsonplaceholder.typicode.com/users");

//funciones expresadas = userPost, postComments, userAlbum, albumPhoto y userWorks, que recibiran el argumento(id) y recibe un parametro filtrado por el arcgumento
const userPosts = async (userID) => await cargarJSON(`https://jsonplaceholder.typicode.com/posts?d=${userID}`);
const postComments = async (postID) => await cargarJSON(`https://jsonplaceholder.typicode.com/comments?postId=${postID}`);

const userAlbum = async (userID) => await cargarJSON(`https://jsonplaceholder.typicode.com/albums?userId=${userID}`);
const albumPhoto = async (albumID) => await cargarJSON(`https://jsonplaceholder.typicode.com/photos?albumId=${albumID}`);

const userWorks = async (userID) => await cargarJSON(`https://jsonplaceholder.typicode.com/todos?userId=${userID}`);
//______________________________________________________________________________________________________________________________________________________________________________


// Es una funcion espresada principal, con un arrow function (fincion flecha), la cual se encargara almacenar, resolver promesas y filtrar resultados.
const mostrar = async () => {
    
    //funcion expresada que solicita a todos los usuarios
    const users = await usuario();

    //Creamos una constante o funcion expresada para desarrollar los Datos de las promesas (todas las promesas se deben cumplir o si no dara error) junto a sus respectivos comentarios
    const Datos = await Promise.all(

        //Recorremos los usuarios
        users.map(async (user) => {

            //funcion expresada que solicita los posts teniendo en cuenta el id de los usuarios
            const posts = await userPosts(user.id);

            //funcion expresada que resuelve todas las promesas de post con comentarios
            const postsConComentarios = await Promise.all(

                //recorre "posts"
                posts.map(async (post) => {
                    //asociamos los comentarios a sus respectivos post.id
                    const comentarios = await postComments(post.id);
                    //Retornamos post junto a sus comentarios asociados a sus respectivos post.id
                    return { ...post, comentarios };
                })
            );

            //funcion expresada que solicita los albumes teniendo en cuenta el id de los usuarios
            const album = await userAlbum(user.id);

            //funcion expresada que resuelve todas las promesas de albumes
            const albumsPhotos = await Promise.all(

                //recorre "albumes" 
                album.map(async (album) => {
                    // asociamos las fotos a sus respectivos album.id
                    const fotos = await albumPhoto(album.id);
                    //Retornamos albumes junto a sus fotos asociadas al album.id
                    return { ...album, fotos };
                })
            );


            //Se crea una function expresada que solicita las tareas de cada user.id
            const tareas = await userWorks (user.id);
            
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

mostrar();