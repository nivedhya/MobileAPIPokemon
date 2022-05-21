
document.querySelector("#search").addEventListener("click", getPokemon);


function capFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function lowCaseName(string) {
  return string.toLowerCase();
}




function getPokemon() {


  fetch(`https://pokeapi.co/api/v2/pokemon/ditto`)
    .then((response) => response.json())
    .then((data) => {
      document.querySelector(".pokemonimg").innerHTML = `
      <div>
        <img
          src="${data.sprites.other["official-artwork"].front_default}"
          alt="Pokemon name"
        />
      </div>
      <div class="PInfo">
        <h1>${capFirstLetter(data.name)}</h3>
        <p>Weight: ${data.weight}</p>
      </div>`;

    })


    fetch(`https://pokeapi.co/api/v2/pokemon/bulbasaur`)
    .then((response) => response.json())
    .then((data) => {
      document.querySelector(".pokemonimg1").innerHTML = `
      <div>
        <img
          src="${data.sprites.other["official-artwork"].front_default}"
          alt="Pokemon bulbasaur"
        />
      </div>    
      <div class="PInfo">
        <h1>${capFirstLetter(data.name)}</h3>
        <p>Weight: ${data.weight}</p>
      </div>`;

    })



    fetch(`https://pokeapi.co/api/v2/pokemon/ivysaur`)
    .then((response) => response.json())
    .then((data) => {
      document.querySelector(".pokemonimg2").innerHTML = `
      <div>
        <img
          src="${data.sprites.other["official-artwork"].front_default}"
          alt="Pokemon bulbasaur"
        />
      </div>    
      <div class="PInfo">
        <h1>${capFirstLetter(data.name)}</h3>
        <p>Weight: ${data.weight}</p>
      </div>`;

    })


    fetch(`https://pokeapi.co/api/v2/pokemon/charmander`)
    .then((response) => response.json())
    .then((data) => {
      document.querySelector(".pokemonimg3").innerHTML = `
      <div>
        <img
          src="${data.sprites.other["official-artwork"].front_default}"
          alt="Pokemon bulbasaur"
        />
      </div>    
      <div class="PInfo">
        <h1>${capFirstLetter(data.name)}</h3>
        <p>Weight: ${data.weight}</p>
      </div>`;

    })




    fetch(`https://pokeapi.co/api/v2/pokemon/charizard`)
    .then((response) => response.json())
    .then((data) => {
      document.querySelector(".pokemonimg4").innerHTML = `
      <div>
        <img
          src="${data.sprites.other["official-artwork"].front_default}"
          alt="Pokemon bulbasaur"
        />
      </div>    
      <div class="PInfo">
        <h1>${capFirstLetter(data.name)}</h3>
        <p>Weight: ${data.weight}</p>
      </div>`;

    })
    .catch((err) => {
      document.querySelector(".pokemonBox").innerHTML = `
      <h4>Pokemon not found 😞</h4>
      `;
      console.log("Pokemon not found", err);
    });

  e.preventDefault();
}