var selectedPokemon;
var pokemons = [];

async function getPokemonList() {
  var response = await fetch(`https://pokeapi.co/api/v2/pokemon`);
  if (response.ok) {
    let json = await response.json();
    if (json.results.length >= 5) {
      pokemons = json.results.splice(0, 5)
      await populatePokemonDetails();
      showPokemons();
    }

  } else {
    alert("HTTP Error");
  }
}


async function populatePokemonDetails() {
  for (var i = 0; i < pokemons.length; i++) {
    var pokemon = pokemons[i];
    pokemon.details = await getPokemonDetail(pokemon.name);
  }
}


async function getPokemonDetail(name) {
  var response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  if (response.ok) {
    return await response.json();
  } else {
    console.log("Http error in getPokemonDetail");
  }
  return null;
}


async function showPokemons() {
  var items = '';
  pokemons.forEach((pokemon, index) => {
    items = items + `
    <div class="pokemon-item"  onClick="onPokemonClick(this, ${index})">
      <img class="pokemon-img"
        src="${pokemon.details.sprites.other["official-artwork"].front_default}"
        alt="Pokemon name"
      />
    <div class="pokemon-name">
      ${capFirstLetter(pokemon.details.name)}
    </div>
    </div>
    `

  });
  document.querySelector("#pokemon-list").innerHTML = items;

}
function onPokemonClick(element, index) {
  var activeClasses = document.querySelector(".pokemon-active");
  if (activeClasses != null) {
    activeClasses.classList.remove('pokemon-active');
  }
  element.classList.add('pokemon-active')
  var pokemon = pokemons[index];
  selectedPokemon = pokemon;
  document.querySelector("#pokemon-specs").innerHTML = `
  <h2>Specs</h2>
  <div><b>Name: </b></span><span  class="answer">${pokemon.details.name}</div>
  <div><b>Abilities: </b></span><span  class="answer">${getAbilityHtmlText(pokemon.details.abilities)}</div>
  <div><b>Height: </b></span><spanclass="answer">${pokemon.details.height}</div>
  <div><b>Base Experience: </b></span><span class="answer">${pokemon.details.base_experience}</div>`;
  document.querySelector("#pokemon-specs").classList.remove('visually-hidden')
  document.querySelector("#pokemon-abilities").classList.add('visually-hidden');
}


function getAbilityHtmlText(abilities) {
  var text = '';
  abilities.forEach((ability, index) => {
    if (text != '') {
      text += ", ";
    }
    text = text + `<span class="ability-tag pointer" onClick="getPokemonAbilityDetail('${ability.ability.url}')">${ability.ability.name}</span>`
  });
  return text;
}


async function getPokemonAbilityDetail(url) {
  var response = await fetch(url);
  if (response.ok) {
    var json = await response.json();
    console.log(json)
    var abilityEffect = "";
    var shortEffect = "";
    var flavorText = "";
    var effectEntry = getEnglishLanguageItem(json.effect_entries)
    if(effectEntry != null){
      abilityEffect = effectEntry.effect
      shortEffect = effectEntry.short_effect
    }

    var flavorEntry = getEnglishLanguageItem(json.flavor_text_entries)
    if (flavorEntry != null) {
      flavorText = flavorEntry.flavor_text;
    }

    document.querySelector("#pokemon-abilities").innerHTML = `
      <h2>Abilities</h2>
      <div><b>Ability Name: </b></span><span class="answer">${json.name}</div>
      <div><b>Ability Effect: </b></span><span class="answer">${abilityEffect}</div>
      <div><b>Short Effect: </b></span><span class="answer">${shortEffect}</div>
      <div><b>Flavour Text: </b></span><span class="answer">${flavorText}</div>`
  document.querySelector("#pokemon-abilities").classList.remove('visually-hidden')
  }
}

function getEnglishLanguageItem(list){
  if (list.length > 0) {
    for(var i =0;i<list.length; i++){
      var item = list[i]
      if(item.language != null && item.language.name == "en"){
        return item;
      }
    }
  }
}




function capFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

window.onload = getPokemonList;