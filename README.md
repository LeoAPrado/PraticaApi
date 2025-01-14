# PraticaApi
Test de consumo de API


### Descripción
Este proyecto es una prueba de consumo de API, utilizando la api de cartas "Magic: The Gathering".


### Url de la api
https://docs.magicthegathering.io/


### Ejemplos
Utilizando "fetch", puedes consumir la api, sin necesidad de un token/key, simplesmente agregando la url a tu proyecto de la siguiente manera y mostrando algunos parametros de la api: 



    try{
        let url = "https://api.magicthegathering.io/v1/cards";

        let respuesta = await fetch(url);
        
        let datos = await respuesta.json();

        datos.cards.forEach(carta => {
            let cardName = carta.name; // Nombre de la carta
            let cardType = carta.type; // Tipo de la carta
        }); 
    }
    catch(error){
        console.log(error);
    }

### Problemas encontrados
