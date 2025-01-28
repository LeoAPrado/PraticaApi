let currentPage = 1; 
const pageSize = 100; 
let contenedor = document.getElementById('contenedor');

async function getApi(page = 1) {
    let url = `https://api.magicthegathering.io/v1/cards?page=${page}&pageSize=${pageSize}`;
    
    try {
        let respuesta = await fetch(url);
        let datos = await respuesta.json();
        
        contenedor.innerHTML = "";

        let mostrador = document.getElementById('pag');
        mostrador.innerHTML = "";
        let pagina = document.createElement('span');
        pagina.style.color = "white";
        pagina.textContent = `Pagina actual: ${currentPage}`;
        mostrador.appendChild(pagina);
        
        let count = 1;
        datos.cards.forEach(carta => {
            if (carta.imageUrl) {
                let cadaCarta = document.createElement('div');
                cadaCarta.id = 'carta';
                cadaCarta.style.border = '1px solid white';

                let imagen = document.createElement('img');
                imagen.src = carta.imageUrl; 
                imagen.alt = carta.name || "Carta sin nombre";
                imagen.style.width = '200px'; 
                cadaCarta.appendChild(imagen);

                let cardName = document.createElement('p');
                cardName.style.color = 'red';
                cardName.textContent = count + ". " + carta.name;

                let cardType = document.createElement('p');
                cardType.style.color = 'gold';
                carta.types.forEach(tipo => {
                    cardType.textContent = "Tipo: " + tipo;
                });

                cadaCarta.appendChild(cardName);
                cadaCarta.appendChild(cardType);
                contenedor.appendChild(cadaCarta);
                count++;
            }
        });
    } catch (error) {
        console.error("Error al obtener los datos de la API:", error);
    }


}
let mostrador = document.getElementById('func');


let paginaNext = document.getElementById('paginacion');
let paginaAnt = document.getElementById('volver');
paginaNext.addEventListener('click', siguientePagina);
paginaAnt.addEventListener('click', volverPagina);

function siguientePagina() {
    currentPage++;
    getApi(currentPage);
    
}
function volverPagina() {
    currentPage--;
    getApi(currentPage);
    
}
let controlador;
async function buscarCartas(buscar) {
    if(controlador){
        controlador.abort();
        
    }
    controlador = new AbortController();
    let signal = controlador.signal;

    try{
        const response = await fetch(`https://api.magicthegathering.io/v1/cards?name=${buscar}`,{signal});
        const datos = await response.json();

        contenedor.innerHTML = "";

        let mostrador = document.getElementById('pag');
        mostrador.innerHTML = "";
        let pagina = document.createElement('span');
        pagina.style.color = "white";
        pagina.textContent = `Pagina actual: ${currentPage}`;
        mostrador.appendChild(pagina);
        
        let count = 1;
        datos.cards.forEach(carta => {
            if (carta.imageUrl) {
                let cadaCarta = document.createElement('div');
                cadaCarta.id = 'carta';
                cadaCarta.style.border = '1px solid white';

                let imagen = document.createElement('img');
                imagen.src = carta.imageUrl; 
                imagen.alt = carta.name || "Carta sin nombre";
                imagen.style.width = '200px'; 
                cadaCarta.appendChild(imagen);

                let cardName = document.createElement('p');
                cardName.style.color = 'red';
                cardName.textContent = count + ". " + carta.name;

                let cardType = document.createElement('p');
                cardType.style.color = 'gold';
                carta.types.forEach(tipo => {
                    cardType.textContent = "Tipo: " + tipo;
                });

                cadaCarta.appendChild(cardName);
                cadaCarta.appendChild(cardType);
                contenedor.appendChild(cadaCarta);
                count++;
            }
        });
        
    }catch(error){
        if(error.name === 'AbortError'){
            console.log(`${buscar}: abortado: ${signal.aborted}`);
            console.log("Solicitud cancelada");
        }else{
            console.error("Error:",error);
        }
    }
}
document.getElementById('buscador').addEventListener("input",(event) => {
    console.log(event.target.value);
    buscarCartas(event.target.value);
})

getApi();
