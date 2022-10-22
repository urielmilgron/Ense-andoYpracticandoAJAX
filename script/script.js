
//1ra PARTE PRÁCTICA

// //Función que inicia ajax con el method, url,y tipo de respuesta, en este caso blob
// function iniciarAjax(method= 'get', url, responseType=''){
// //Realizamos una petición HTTP(Protocolo de transferencia de hipertexto, o sea, peticion de datos, recursos como los html), 
// //pero como hago eso? Como? 
// const xhr  = new XMLHttpRequest(); //Asi se realiza la petición
// //Luego que?
// //Le decimos el tipo de respuesta que queremos. => Blob, pero este viene cuando se llama a la función, por default no tiene tipo de respuesta.
// xhr.responseType = responseType;
// //Luego la xhr le tiene que decir al servidor que method va a usar, si get, post o head, puede ir cualquier petición que el servidor acepte.
// xhr.open(method, url)
// xhr.send();
// return xhr
// };


// function cargarImagen(url,alt,target){
//     //Desde acá iniciamos AJAX
//     const xhr = iniciarAjax('get', url, 'json') //Binary large oBject 
//     xhr.addEventListener('load', e => {
//         //Si el readyStatus del target es igual a 200 (que la solicitud tuvo exito) 
//         if(e.target.status == 200){
//             //TEstear
//             console.log(e.target.response)
//             imagen = e.target.response; 
//             //Se crea 
//             let img = URL.createObjectURL(imagen) //Creas una cadena que contiene una URL, que basicamente representa al objeto que está en el parametro
//             //en este caso => imagen
//             console.log(img)
//             //Creamos una constante que va a ser un elemento imagen
//             const nuevoNodo = document.createElement('img');
//             //La objeto URL va a ser igual al source del elemento imagen.
//             nuevoNodo.src= img;
//             //Y el alt, es el texto alternativo que vino como parámetro
//             nuevoNodo.alt = alt;
//             //Que haces seba
//             nuevoNodo.style.height = '600px';

//             //Le añado un elemento despues del ultimo hijo al nodo que pase a traves de una clase por querySelector
//             document.querySelector(target).append(nuevoNodo)

//         }
//     })
// }


// //CAMBIO DE URL DEPENDIENDO DE QUE ANCLA ELIJAS

// // <!-- https://jsonplaceholder.typicode.com/photos/ -->

// cargarImagen('img/tom-jerry.jpg', 'Tom y Jerry', '.container')
// cargarImagen('img/homer.jpg', 'Homero', '.container')


// //Declarar los id, para interacción
const home = document.querySelector('#home');
const photos = document.querySelector('#photos');
const contacto = document.querySelector('#contacto');
const container = document.querySelector('.container');



//2da PARTE AJAX + JSON

///Pide datos, esta función recibe el metodo, y la url de la api o archivo/recurso/doc
function pedirDato(method = 'get', url) {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url)
    xhr.send();
    return xhr
}
function mostrarDatos(xhr, etiqueta) {
    //Cambiamos el nombre a JhonsonAndJhonson porque seba lo queria asi.
    //clave JhonsonAndJhonson
    function JhonsonAndJhonson(target) {
        return JSON.parse(target)
    }

    xhr.addEventListener('load', e => {
        if (e.target.status == 200) {
            const respuesta = JhonsonAndJhonson(e.target.response)
            try {
                if (etiqueta == 'p') {
                    //Bucle que itera 20 veces
                    for (let i = 0; i < 20; i++) {
                        //Creamos un elemento con el parámetro etiqueta
                        const parrafo = document.createElement(etiqueta)
                        //Le añado el contenido de cada post, con el atributo que quiero mostrar
                        parrafo.innerHTML = respuesta[i].body;
                        //Añado hijos por cada iteración al container
                        document.querySelector('.container').append(parrafo)
                    }
                } else if (etiqueta == 'img') {
                    for (let i = 0; i < 20; i++) {
                        const img = document.createElement(etiqueta)
                        img.src = respuesta[i].url;
                        document.querySelector('.container').append(img);
                    }
                } else {
                    for (let i = 0; i < 10; i++) {
                        const img = document.createElement('li')
                        img.innerHTML = respuesta[i].name;
                        img.classList.add('lista')
                        document.querySelector('.container').append(img)
                    }
                }
            } catch (error) {
                //Ok
                console.log('Le erraste wachin :c')
                console.log(error)
            }
        }
    })
}
function inicio() {
    const xhr = pedirDato('get', 'https://jsonplaceholder.typicode.com/posts')
    mostrarDatos(xhr, 'p')
}
inicio()
//Agrego un evento de escucha al home, para que cuando haga click, envie datos a las funciones
//asi se muestra el contenido.
home.addEventListener('click', () => {
    container.innerHTML = ''
    const xhr = pedirDato('get', 'https://jsonplaceholder.typicode.com/posts')
    mostrarDatos(xhr, 'p')
})
//Idem home
photos.addEventListener('click', () => {
    container.innerHTML = ''
    const xhr = pedirDato('get', 'https://jsonplaceholder.typicode.com/photos')
    mostrarDatos(xhr, 'img')
})
//Idem home
contacto.addEventListener('click', () => {
    container.innerHTML = ''
    const xhr = pedirDato('get', 'https://jsonplaceholder.typicode.com/users')
    mostrarDatos(xhr, 'li')
})



