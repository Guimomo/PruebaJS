const cargarJSON = async (url) => {
    
    const respuesta = await fetch(url);

    return await respuesta.json();

}

//_____________________ingresar las URL

const usuario = async () => await cargarJSON("https://jsonplaceholder.typicode.com/users");

const userPosts = async (userID) => await cargarJSON (`https://jsonplaceholder.typicode.com/posts=${userID}`);
const postComments = async (postID) => await cargarJSON(`https://jsonplaceholder.typicode.com/comments${postID}`);


const mostrar = async () => {
    
    const users = await usuario();

    //Creamos una constante para desarrollar las publicaiones junto a sus respectivos comentarios
    const publicaciones = await Promise.all(
        users.map(async (user) => { // 'user' instead of 'users'
            const posts = await userPosts(user.id);

            const postsConComentarios = await Promise.all(
                posts.map(async (post) => {
                    const comentarios = await postComments(post.id);
                    return { ...post, comentarios };
                })
            );

            return { ...user, posts: postsConComentarios };
        })
    );

    console.log(publicaciones);
}

mostrar();