const buscador = document.querySelector(".buscador");
const boton = document.querySelector(".buscar");
const imagen = document.querySelector(".imagen");
const encabezado = document.querySelector(".encabezado");
const buscar_pagina = document.querySelector(".buscar-pagina");
const pokedex_pagina = document.querySelector(".pokedex-pagina");
const equipo_pagina = document.querySelector(".equipo-pagina");
const pokemonContainer = document.querySelector("#pokemon-container");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
let currentPage = 0;


const fetchPokemons = async (page) => {
    const limit = 20;
    const offset = page * limit;
    const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        showPokemons(data.results);
    } catch (error) {
        console.error("Error al obtener los Pokémon", error);
    }
};

const showPokemons = async (pokemons) => {
    pokemonContainer.innerHTML = "";

    for (const pokemon of pokemons) {
        const response = await fetch(pokemon.url);
        const pokeData = await response.json();

        const pokeCard = document.createElement("div");
        pokeCard.classList.add("pokemon-card");
        pokeCard.innerHTML = `
            <img src="${pokeData.sprites.front_default}" alt="${pokemon.name}">
            <p>${pokemon.name}</p>
        `;
        pokemonContainer.appendChild(pokeCard);
    }
};

nextButton.addEventListener("click", () => {
    currentPage++;
    fetchPokemons(currentPage);
});

prevButton.addEventListener("click", () => {
    if (currentPage > 0) {
        currentPage--;
        fetchPokemons(currentPage);
    }
});

fetchPokemons(currentPage);


boton.addEventListener("click", buscar);

async function buscar(){
    const resul = await fetch("https://pokeapi.co/api/v2/pokemon/" + buscador.value);
    const data = await resul.json();
    imagen.style.backgroundImage =`url(${data.sprites.front_default})`;
    imagen.style.backgroundSize = "cover";
    imagen.style.backgroundRepeat = "no-repeat";
    imagen.style.width = "400px";
    imagen.style.height = "400px";
    console.log(data);
}

encabezado.children[0].addEventListener("click", () => {
    encabezado.children[0].style.backgroundColor = "red";
    encabezado.children[1].style.backgroundColor = "grey";
    encabezado.children[2].style.backgroundColor = "grey";
    pokedex_pagina.style.display = "block";
    buscar_pagina.style.display = "none";
    equipo_pagina.style.display = "none";
})
encabezado.children[1].addEventListener("click", () => {
    encabezado.children[1].style.backgroundColor = "red";
    encabezado.children[0].style.backgroundColor = "grey";
    encabezado.children[2].style.backgroundColor = "grey";
    pokedex_pagina.style.display = "none";
    buscar_pagina.style.display = "block";
    equipo_pagina.style.display = "none";
})
encabezado.children[2].addEventListener("click", () => {
    encabezado.children[2].style.backgroundColor = "red";
    encabezado.children[0].style.backgroundColor = "grey";
    encabezado.children[1].style.backgroundColor = "grey";
    pokedex_pagina.style.display = "none";
    buscar_pagina.style.display = "none";
    equipo_pagina.style.display = "block";
})
