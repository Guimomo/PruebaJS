import { cargarJSON } from "./module.js";

const mostrar = async () => {
    try {

        const users = await cargarJSON("users");

        const Datos = await Promise.all(

            users.map(async (user) => {

                const posts = await cargarJSON(`posts?userId=${user.id}`);

                const postsConComentarios = await Promise.all(
                    posts.map(async (post) => {
                        const comentarios = await cargarJSON(`comments?postId=${post.id}`);
                        return { ...post, comentarios };
                    })
                );


                const album = await cargarJSON(`albums?userId=${user.id}`);

                const albumsPhotos = await Promise.all(
                    album.map(async (album) => {
                        const fotos = await cargarJSON(`photos?albumId=${album.id}`);
                        return { ...album, fotos };
                    })
                );

                const tareas = await cargarJSON(`todos?userId=${user.id}`);

                const homeworks = tareas.map((tarea) => ({
                    ...tarea,
                    completed: tarea.completed ? "SI" : "NO",
                }));
                
                return { ...user, Posts: postsConComentarios, Album: albumsPhotos, Tareas: homeworks };

            })

        );

        //console.log("Datos completos:", Datos);
        return Datos; // Devuelve los datos si necesitas procesarlos después

    } catch (error) {

        console.error("Error en la función mostrar:", error);
    }
};

mostrar().then((a) => {
    console.log("Datos procesados:", a);
});