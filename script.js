
const myPokedexDiv$$ = document.querySelector("#pokedex");

//Sonido botones 
let clickSound = new Audio();
clickSound.src = "assets/click.mp3";

////////////////////////////////////// FETCH -> Devuelve un array con los 151 pokemon

const getPokemon = async () => {
  const allPokemon = [];
  for (let i = 1; i <= 151; i++) {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
      if (response.ok) {
        const res = await response.json();
        allPokemon.push(res);
      } else {
        console.log(`Failed to fetch data for Pokemon ${i}`);
      }
    } catch (error) {
      console.error(`Error fetching data for Pokemon ${i}: ${error}`);
    }
  }
  
  return allPokemon;
};


////////////////////////////////////// MAP

const mapPokemon = (pokemons) => {
  return pokemons.map((pokemon) => ({
    name: pokemon.name,
    type: pokemon.types[0].type.name,
    image: pokemon.sprites.other.home.front_default, 
    base_experience: pokemon.base_experience,
    id: pokemon.id, 
    abilities: pokemon.abilities.map((ability) => ability.ability.name).join('</br>'),
  }));
};

////////////////////////////////////// DRAW

const drawPokemon = (pokemons) => {
  myPokedexDiv$$.innerHTML = "";
  for (const pokemon of pokemons) {
    const pokemonCard = document.createElement('div');
    pokemonCard.className = 'poke-card-div';

    let pokemonImage = document.createElement("img");
    pokemonImage.setAttribute("src", pokemon.image);
    pokemonImage.setAttribute("alt", pokemon.name);
    pokemonImage.setAttribute("class", 'pokemon-img');

    const pokemonId = document.createElement('p');
    pokemonId.textContent = `#${pokemon.id}`;
    pokemonId.setAttribute("class", 'pokemon-id');

    const pokemonName = document.createElement('h2');
    pokemonName.textContent = pokemon.name;
    pokemonName.setAttribute("class", 'pokemon-name');

    const pokemonType = document.createElement('p');
    pokemonType.textContent = pokemon.type;
    pokemonType.setAttribute("class", 'pokemon-type');

    const pokemonAbility = document.createElement('p');
    pokemonAbility.setAttribute('class', 'pokemon-abs hide');
    pokemonAbility.innerHTML = `<p class="pokemon-abs-title">· abilities ·</p><p class="pokemon-abs-sentence">${pokemon.abilities}</p>`;
    

    switch (pokemonType.textContent) {
      case 'grass':
        pokemonType.style.backgroundColor = '#3da02b';
        pokemonAbility.style.color = '#3da02b';
        break;
      case 'fire':
        pokemonType.style.backgroundColor = '#d63031';
        pokemonAbility.style.color = '#d63031';
        break;
      case 'water':
        pokemonType.style.backgroundColor = '#0984e3';
        pokemonAbility.style.color = '#0984e3';
        break;
      case 'normal':
        pokemonType.style.backgroundColor = '#e49f8f';
        pokemonAbility.style.color = '#e49f8f';
        break;
      case 'bug':
        pokemonType.style.backgroundColor = '#00b894';
        pokemonAbility.style.color = '#00b894';
        break;
      case 'poison':
        pokemonType.style.backgroundColor = '#6c5ce7';
        pokemonAbility.style.color = '#6c5ce7';
        break;
      case 'ground':
        pokemonType.style.backgroundColor = '#a17351';
        pokemonAbility.style.color = '#a17351';
        break;
      case 'fighting':
        pokemonType.style.backgroundColor = '#e84393';
        pokemonAbility.style.color = '#e84393';
        break; 
      case 'psychic':
        pokemonType.style.backgroundColor = '#a29bfe';
        pokemonAbility.style.color = '#a29bfe';
        break; 
      case 'rock':
        pokemonType.style.backgroundColor = '#636e72';
        pokemonAbility.style.color = '#636e72';
        break; 
      case 'electric':
        pokemonType.style.backgroundColor = '#e7af49';
        pokemonAbility.style.color = '#e7af49';
        break;
      case 'ghost':
        pokemonType.style.backgroundColor = '#608c9f';
        pokemonAbility.style.color = '#608c9f';
        break;
      case 'ice':
        pokemonType.style.backgroundColor = '#81ecec';
        pokemonAbility.style.color = '#57b9b9';
        break;
      case 'dragon':
        pokemonType.style.backgroundColor = '#ff7675';
        pokemonAbility.style.color = '#ff7675';
        break;
      case 'fairy':
        pokemonType.style.backgroundColor = '#fd79a8';
        pokemonAbility.style.color = '#fd79a8';
        break;
      default:
        pokemonType.setAttribute("class", 'pokemon-type');
    }

    //muestro y oculto las habilidades con mouseover

    pokemonCard.addEventListener('mouseover', hoverOn);
    function hoverOn () {
      pokemonAbility.classList.remove('hide');
      pokemonImage.classList.add('hide-img');
    }

    pokemonCard.addEventListener('mouseout', hoverOff);
    function hoverOff () {
      pokemonAbility.classList.add('hide');
      pokemonImage.classList.remove('hide-img');
    }
    
    pokemonCard.append(pokemonAbility);
    pokemonCard.append(pokemonImage);
    pokemonCard.append(pokemonId);
    pokemonCard.append(pokemonName);
    pokemonCard.append(pokemonType);
    myPokedexDiv$$.append(pokemonCard);
  }
}

////////////////////////////////////// SEARCH BY NAME

const searchDiv = document.querySelector('.search-div');
const searchInput = document.createElement('input');
const searchButton = document.createElement('button');
searchButton.setAttribute("id", "search-name-button");
searchInput.placeholder = 'Search Pokemon by name'
searchButton.innerText = 'Search';
searchButton.addEventListener('click', () => clickSound.play());

const searcher = (pokemons) => {   
    searchButton.addEventListener('click', () =>
    searchPokemon(searchInput.value, pokemons));
}

searchPokemon = (filter, array) => {
  let filteredPokemon = array.filter((pokemon) =>
  pokemon.name.toLowerCase().includes(filter.toLowerCase()));
  drawPokemon(filteredPokemon);
  if (filteredPokemon == 0) {
    noPokemonFound();
  } 
};

//reset button
const resetButton = document.createElement('button');
resetButton.setAttribute("id", "reset-button");
resetButton.innerText = 'Reset';
resetButton.addEventListener('click', _ => {
  location.reload(); //inner html vacío
})

// Pantalla nothing found
const noPokemonFound = () => {
  myPokedexDiv$$.innerHTML = "";
  const nothingFoundDiv$$ = document.querySelector('.nothing-found');
  `<p>Nothing found :(</p>
  <img src="assets/pokemon-crying.png" alt="pokemon-crying" class="img-notfound">`
  }


searchDiv.append(searchInput);
searchDiv.append(searchButton);
searchDiv.append(resetButton);


////////////////////////////////////// SEARCH BY TYPE

//Creo botones para buscar por filtro. 

//1. Creo una función que recorre los pokemon y añade a un array vacío los tipos.
//con los bucles y la condición pusheo solo un tipo de cada elemento (para no tener 151 botones).
const searchTypeDiv = document.querySelector('.search-div-type');
const typeSearcher = (pokemons) => {
  let pokemonTypes = [];
  for (const pokemon of pokemons) {
    for (let i = 0; i < pokemons.length; i++) {
      if (pokemonTypes.includes(pokemon.type)) {
      } else {
        pokemonTypes.push(pokemon.type);}};
  }

//2. Dentro de la función, recorro el array con los tipos de pokemon y por cada uno, creo un botón.
  for (let i = 0; i < pokemonTypes.length; i++) {
    const searchTypeButton = document.createElement("button");
    searchTypeButton.innerHTML = `<span>${pokemonTypes[i]}</span>`;
    searchTypeButton.setAttribute('class', 'type-button');
    searchTypeButton.setAttribute('id', `${pokemonTypes[i]}`);
    searchTypeDiv.append(searchTypeButton);
    searchTypeButton.addEventListener('click', () => clickSound.play());

//3. Añado un evento click a cada botón que acabo de crear con la función que filtra los pokemon por tipo.
    searchTypeButton.addEventListener('click', () =>
    searchPokemonByType(searchTypeButton.innerText, pokemons));

//4. Creo la función que filtra por tipo.
    searchPokemonByType = (filter, array) => {
    let filteredPokemonByType = array.filter((pokemon) =>
    pokemon.type.includes(filter));
    drawPokemon(filteredPokemonByType);}
    }  
}

////////////////////////////////////// INIT

const init = async () => {
  const pokemons = await getPokemon();
  const mappedPokemons = mapPokemon(pokemons);
  drawPokemon(mappedPokemons);
  searcher(mappedPokemons);
  typeSearcher(mappedPokemons);
};

init();
