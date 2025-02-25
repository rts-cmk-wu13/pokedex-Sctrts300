/**
 * Extract id as string from url to pokemon
 * @param {string} pokemonUrl - a url to a pokemon from pokeApi 
 * @returns {string}
 */
function getIdFromPokemon(pokemonUrl) {
    return pokemonUrl.slice(0, -1).split("/").pop()
}

const artworkUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork"

const observer = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
        if(entry.isIntersecting) {
          currentOffset = currentOffset + 50;
          if (currentOffset < 1304){
            fetchPokemon(currentOffset)
          } else {
            console.log("NOPE");
            
          }
        }  
    })
})


// her begynder selve komponentet
let sectionElm = document.createElement("section")
sectionElm.className = "pokelist"

let currentOffset = 0

function fetchPokemon(offset){

fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=50`)
    .then(function(response) {
        return response.json()
    }).then(
        function(data) {
            sectionElm.innerHTML =  data.results.map(pokemon => `
                <article>
                    <p>${getIdFromPokemon(pokemon.url)}</p>
                    <h2>${pokemon.name}</h2>
                    <img src="${artworkUrl}/${getIdFromPokemon(pokemon.url)}.png" alt="${pokemon.name}">
                </article>
            `).join("")
                
            let observedPokemon = sectionElm.querySelector("article:nth-last-child(5)")
            observer.observe(observedPokemon)
        }
    )
    document.querySelector("main").append(sectionElm)
}

fetchPokemon(currentOffset)