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

Implementación de un buscador utilizando AbortController(), que es un objeto que se utiliza para gestionar y cancelar solicitudes que ya no sirve. Una de las mejoras que ofrece AbortController es:  Evitar respuestas obsoletas, Optizar el rendimiento al realizar menos carga en el servidor y menos uso de red, por ultimo mejora la experiencia del usuario.


Ejemplo de utilizanción del AbortController:


    let controller;
    async function buscarCarta(nombre) {
        if(controller){
            controller.abort();
        }

        controller = new AbortController();
        const signal = controller.signal;

        try{
            const response = await fetch(`https://api.magicthegathering.io/v1/cards?name=${nombre}`,{signal});
            const data = await response.json();
            console.log(data);
        }catch(error){
            if(error.name === 'AbortError'){
                console.log("Error de solicitud");
            }else{
                console.error("Error en la solicitud: ", error);
            }
        }
    }

    document.getElementById("buscador").addEventListener("input", (event) => {
        buscarCarta(event.target.value);
    });



### Problemas encontrados
