

async function getApi(){

    let contenedor = document.getElementById('contenedor');
    let url = "https://api.magicthegathering.io/v1/cards";
    try{
        let respuesta = await fetch(url);
        console.log(respuesta);
        let datos = await respuesta.json();
        console.log(datos);
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
                    cardType.textContent = tipo;
                })
                
                cadaCarta.appendChild(cardName);
                cadaCarta.appendChild(cardType);
                contenedor.appendChild(cadaCarta);
                count++;
            }

        });
        
    }
    catch(error){
        console.log(error);
    }
}

getApi();