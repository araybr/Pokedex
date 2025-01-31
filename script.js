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
let team = []; 

const typeColors = {
    normal: "#A8A77A",
    fire: "#EE8130",
    water: "#6390F0",
    electric: "#F7D02C",
    grass: "#7AC74C",
    ice: "#96D9D6",
    fighting: "#C22E28",
    poison: "#A33EA1",
    ground: "#E2BF65",
    flying: "#A98FF3",
    psychic: "#F95587",
    bug: "#A6B91A",
    rock: "#B6A136",
    ghost: "#735797",
    dragon: "#6F35FC",
    dark: "#705746",
    steel: "#B7B7CE",
    fairy: "#D685AD",
};


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

        const typeElements = pokeData.types.map(typeInfo => {
            const typeName = typeInfo.type.name;
            return `<span class="pokemon-type" style="background-color: ${typeColors[typeName]};">${typeName}</span>`;
        }).join(" ");

        const pokeCard = document.createElement("div");
        pokeCard.classList.add("pokemon-card");
        pokeCard.innerHTML = `
            <p class="pokemon-id">#${pokeData.id}</p>
            <img src="${pokeData.sprites.front_default}" alt="${pokemon.name}">
            <p><strong>${pokemon.name}</strong></p>
            <div class="types">${typeElements}</div>
            <button class="add-to-team">➕ Añadir</button>
        `;
        const addButton = pokeCard.querySelector(".add-to-team");
        pokeCard.addEventListener("mouseenter", () => addButton.style.display = "block");
        pokeCard.addEventListener("mouseleave", () => addButton.style.display = "none");

        addButton.addEventListener("click", () => addToTeam(pokeData));

        pokemonContainer.appendChild(pokeCard);
    }
};

const addToTeam = (pokemon) => {
    if (team.length >= 6) {
        alert("¡Tu equipo ya está completo (máx. 6 Pokémon)!");
        return;
    }
    team.push(pokemon);
    updateTeamUI();
};

const updateTeamUI = () => {
    equipo_pagina.innerHTML = "<h2>Equipo Pokémon</h2>";

    team.forEach(pokemon => {
        const teamCard = document.createElement("div");
        teamCard.classList.add("team-card");
        teamCard.innerHTML = `
            <p class="pokemon-id">#${pokemon.id}</p>
            <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
            <p><strong>${pokemon.name}</strong></p>
            <button class="remove-from-team">❌ Quitar</button>
        `;
        teamCard.querySelector(".remove-from-team").addEventListener("click", () => {
            team = team.filter(poke => poke.id !== pokemon.id);
            updateTeamUI();
        });

        equipo_pagina.appendChild(teamCard);
    });
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

async function buscar() {
    const pokemonNombre = buscador.value.toLowerCase();
    if (!pokemonNombre) return;

    try {
        const resul = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonNombre}`);
        if (!resul.ok) throw new Error("Pokémon no encontrado");

        const data = await resul.json();

        const tarjeta = document.createElement("div");
        tarjeta.classList.add("pokemon-card");

        tarjeta.innerHTML = `
            <p class="pokemon-id">#${data.id}</p>
            <img src="${data.sprites.front_default}" alt="${data.name}">
            <h3>${data.name.toUpperCase()}</h3>
            <div class="types">
                ${data.types.map(t => `<span class="pokemon-type" style="background:${typeColors[t.type.name] || "#777"}">${t.type.name}</span>`).join("")}
            </div>
            <button class="add-to-team">Añadir al equipo</button>
        `;

        buscar_pagina.appendChild(tarjeta);
    } catch (error) {
        console.error(error);
    }
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
