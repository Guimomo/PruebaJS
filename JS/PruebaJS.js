const cargaJSON = async function(url) {
    try {
        const respuesta = await fetch(url);

        if (!respuesta.ok) {
            throw new Error("Error al cargar el archivo: " + url);
        }

        const data = await respuesta.json();
        return data;

    } catch (error) {
        console.error("Error al cargar los datos:", error);
        alert("No se pudo cargar el archivo: " + url);
        throw error;
    }
}

const users = async function(IDU) {
    try {
        IDU = Number(IDU);
        
        const users = await cargaJSON("https://jsonplaceholder.typicode.com/users");
        const posts = await cargaJSON("https://jsonplaceholder.typicode.com/posts");
        const comments = await cargaJSON("https://jsonplaceholder.typicode.com/comments");
        const albums = await cargaJSON("https://jsonplaceholder.typicode.com/albums");
        const photos = await cargaJSON("https://jsonplaceholder.typicode.com/photos");

        const user = users.find(function(user) {
            return user.id === IDU;
        });

        if (!user) {
            alert("/// ERROR: No se encontró el usuario con el ID: " + IDU + " ///");
            return;
        }

        const userPost = posts.filter(function(post) {
            return post.userId === IDU;
        });

        const useralb = albums.filter(function(album) {
            return album.userId === IDU;
        });

        // Filtrar las fotos relacionadas con los álbumes del usuario
        const userphot = photos.filter(function(photo) {
            return useralb.some(function(album) {
                return album.id === photo.albumId;
            });
        });

        // Filtrar los comentarios relacionados con los posts del usuario
        const usercom = comments.filter(function(comment) {
            return userPost.some(function(post) {
                return post.id === comment.postId;
            });
        });

        console.log("Información del usuario:");
        console.log(user);
        console.log("Publicaciones del usuario:");
        console.log(userPost);
        console.log("Comentarios de los post:");
        console.log(usercom);
        console.log("Álbumes:");
        console.log(useralb);
        console.log("Fotos del album:");
        console.log(userphot);

        let Op;
        do {
            Op = parseInt(prompt(`
            Nombre: ${user.name}
            Email: ${user.email}
            Número de publicaciones: ${userPost.length}
            Número de álbumes: ${useralb.length}
            
            - Ver los post y comentarios = 1
            - Ver los albums y fotos = 2

            0 = volver...
            `));

            switch (Op) {
                case 1:
                    console.log("Posts y comentarios:");
                    console.log(userPost);
                    console.log(usercom);
                    break;
                case 2:
                    console.log("Álbumes y fotos:");
                    console.log(useralb);
                    console.log(userphot);
                    break;
                case 0:
                    alert("Saliendo...");
                    break;
                default:
                    alert("/// ERROR: selecciona una opción válida ///");
            }
        } while (Op !== 0);

    } catch (error) {
        console.error("Error en la función users:", error);
        alert("Ocurrió un error al procesar los datos del usuario");
    }
}

const app = async function() {
    let option;
    do {
        option = parseInt(prompt(`
            - GESTOR DE USUARIOS -
              ~ Bienvenido al gestor de usuarios ~
            - En el siguiente comando podrás visualizar a 10 de nuestros usuarios junto a posts y álbumes que han hecho
            - Ahora ingrese un número del 1 al 10 para visualizar a:
    
            | user 1 | | user 2 | | user 3 | | user 4 | | user  5 |
            | user 6 | | user 7 | | user 8 | | user 9 | | user 10 |

            0 = salir...
        `));
    
        if (option >= 1 && option <= 10) {
            await users(option);
        } else if (option !== 0) {
            alert("Por favor ingresa un número válido entre 1 y 10.");
        }
        
    } while (option !== 0);
}

app();