const buscador = document.querySelector(".buscador");
const boton = document.querySelector(".buscar");
const imagen = document.querySelector(".imagen");

boton.addEventListener("click", buscar);

async function buscar(){
    const resul = await fetch("https://pokeapi.co/api/v2/pokemon/" + buscador.value);
    const data = await resul.json();
    imagen.style.backgroundImage =`url(${data.sprites.front_default})`;
    imagen.style.backgroundSize = "cover";
    imagen.style.backgroundRepeat = "no-repeat";
    imagen.style.width = "400px";
    imagen.style.heigth = "400px";
    console.log(data);
}