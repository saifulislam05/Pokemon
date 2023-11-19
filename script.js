const nameInput = document.getElementById("name_input");
const selectType = document.getElementById("select_type");
const pokemonsWrapper = document.getElementById("pokemons_wrapper");

// fetch Types for select box
const fetchTypes = async () => {
  const response = await fetch("https://pokeapi.co/api/v2/type");
  const data = await response.json();
  const types = data.results;

  types.forEach((type) => {
    const option = document.createElement("option");
    option.value = type.name;
    option.textContent = type.name.charAt(0).toUpperCase() + type.name.slice(1);
    selectType.append(option);
  });
};

fetchTypes();

let allPokemons = [];
let filteredPokemons = [];

const fetchPokemon = () => {
  const promises = [];
  for (let i = 1; i <= 151; i++) {
    const pokemonURL = `https://pokeapi.co/api/v2/pokemon/${i}`;
    promises.push(fetch(pokemonURL).then((response) => response.json()));
  }

  Promise.all(promises).then((allPokemon) => {
    allPokemons = allPokemon; // storing all the pokemon to the allPokemons array
    displayPokemon(); // invoke the displayPokemon fn
  });
};

fetchPokemon();

function displayPokemon(pokemons = allPokemons) {
  pokemonsWrapper.innerHTML = "";
  const fragment = document.createDocumentFragment();

  pokemons.forEach((item) => {
    const abilities = getAbilities(item);
    const bgColor = getbgColor(item.types[0].type.name);

    const div = document.createElement("div");
    div.classList.add("flex", "justify-center", "items-center");

    div.innerHTML = `<label class="swap swap-flip text-white w-64" id=${item.id}>
                            <input type="checkbox">
                            <div class="card ${bgColor} text-slate-800 text-center border-4 py-2  swap-off">
                                <h3 class="card-id w-full  py-1 ">${item.id}</h3>
                                <img src="https://static.wikia.nocookie.net/fantendo/images/7/75/495Snivy.png/revision/latest?cb=20141213025315"
                                    alt=${item.name} class="h-28 max-w-[91%] mx-auto my-4">
                                <h3 class="text-2xl font-semibold capitalize">${item.name}</h3>
                                <div class="flex gap-x-2 ">
                                    <p class="type mx-auto">${item.types[0].type.name}</p>
                                </div>
                            </div>
                            <div class="card  ${bgColor} text-slate-800 text-center border-4 py-2 swap-on">
                                <h3 class="card-id w-full py-1 ">${item.id}</h3>
                                <img src="https://static.wikia.nocookie.net/fantendo/images/7/75/495Snivy.png/revision/latest?cb=20141213025315"
                                    alt=${item.name} class="h-28 max-w-[91%] mx-auto my-4">
                                <h3 class="text-2xl font-semibold capitalize">${item.name}</h3>
                                <div class="flex gap-x-2">
                                    <p class="mx-auto text-sm font-medium w-10/12 text-center">Abilities: ${abilities}
                                    </p>
                                </div>
                            </div>
                        </label>`;

    fragment.appendChild(div);
  });
  pokemonsWrapper.appendChild(fragment);
}

// Getting abilities of every pokemon
function getAbilities(item) {
  let abilities = "";
  item.abilities.forEach((ability) => {
    abilities +=
      ability.ability.name.charAt(0).toUpperCase() +
      ability.ability.name.slice(1) +
      ", ";
  });
  abilities = abilities.slice(0, -2);
  return abilities;
}

// Getting Background color for every pokemon
const getbgColor = (type) => {
  switch (type) {
    case "grass":
      return "bg-green-400";

    case "fire":
      return "bg-red-400";

    case "water":
      return "bg-blue-400";

    case "bug":
      return "bg-yellow-400";

    case "normal":
      return "bg-gray-400";

    case "poison":
      return "bg-purple-400";

    case "electric":
      return "bg-yellow-300";

    case "ground":
      return "bg-yellow-700";

    case "fairy":
      return "bg-pink-400";

    case "fighting":
      return "bg-red-600";

    case "psychic":
      return "bg-pink-600";

    case "rock":
      return "bg-gray-600";

    case "ghost":
      return "bg-purple-600";

    case "ice":
      return "bg-cyan-400";

    case "dragon":
      return "bg-yellow-50";

    case "dark":
      return "bg-gray-800";

    case "steel":
      return "bg-gray-700";

    case "flying":
      return "bg-blue-300";

    case "unknown":
      return "bg-zinc-800";

    case "shadow":
      return "bg-zinc-900";
  }
};

selectType.addEventListener("change", handleSelection);

function handleSelection() {
  const selectedValue = selectType.value;
  if (selectedValue === "all") {
    displayPokemon(allPokemons);
    filteredPokemons = allPokemons;
  } else {
    filteredPokemons = allPokemons.filter(
      (pok) => pok.types[0].type.name === selectedValue
    );
    if (filteredPokemons.length > 0) {
      displayPokemon(filteredPokemons);
    } else {
      // Handle case when there are no matching pokemons
    }
  }
}
