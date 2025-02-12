import { users } from "./module.js";

const root = document.getElementById("root");


const imprimir = async () => {
    
    try {

        //console.log(users);

        const usuarios = await users();

        await Promise.all(usuarios.map(async (persona) => {
            // console.log(persona); // Example: log each user's name

            let photoPerfil = document.createElement('div');
            photoPerfil.classList.add('photoPerfil');

            let div = document.createElement('div')

            let htmlName = document.createElement('div')
            htmlName.innerText = '𖠋 ' + persona.name;

            let htmlEmail = document.createElement('div')
            htmlEmail.innerText = '✉ ' + persona.email;

            let htmlUsername = document.createElement('div')
            htmlUsername.innerText= '@' + persona.username;

            let htmlButton = document.createElement('button')
            htmlButton.innerText = "solicitar número de usuario"
            htmlButton.addEventListener('click', ()=>{
                alert(`El usuario "${persona.name}" esta posicionado en la casilla N°${persona.id}`)
            })


            div.classList.add('card')

            let br = document.createElement('br');

            div.append(photoPerfil, br, htmlName, br, htmlUsername, br, htmlEmail, br, htmlButton)

            //div.innerText = '⟡ ' + persona.name;
            root.appendChild(div);

        }));
    }


    

    catch {

        console.error('Error:', error); 
    }
}

imprimir();


// const mostrar = async () => {
//     try {

//         const users = await cargarJSON("users");

//         const Datos = await Promise.all(

//             users.map(async (user) => {

//                 const posts = await cargarJSON(`posts?userId=${user.id}`);

//                 const postsConComentarios = await Promise.all(
//                     posts.map(async (post) => {
//                         const comentarios = await cargarJSON(`comments?postId=${post.id}`);
//                         return { ...post, comentarios };
//                     })
//                 );


//                 const album = await cargarJSON(`albums?userId=${user.id}`);

//                 const albumsPhotos = await Promise.all(
//                     album.map(async (album) => {
//                         const fotos = await cargarJSON(`photos?albumId=${album.id}`);
//                         return { ...album, fotos };
//                     })
//                 );

//                 const tareas = await cargarJSON(`todos?userId=${user.id}`);

//                 const homeworks = tareas.map((tarea) => ({
//                     ...tarea,
//                     completed: tarea.completed ? "SI" : "NO",
//                 }));
                
//                 return { ...user, Posts: postsConComentarios, Album: albumsPhotos, Tareas: homeworks };

//             })

//         );

//         //console.log("Datos completos:", Datos);
//         return Datos; // Devuelve los datos si necesitas procesarlos después

//     } catch (error) {

//         console.error("Error en la función mostrar:", error);
//     }
// };

// mostrar().then((a) => {
//     console.log("Datos procesados:", a);
// });