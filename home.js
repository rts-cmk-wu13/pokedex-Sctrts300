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

const imgObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if(entry.isIntersecting) {
            entry.target.src = entry.target.dataset.imagesrc
            imgObserver.unobserve(entry.target)
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
            sectionElm.innerHTML +=  data.results.map(pokemon => `
                <article>
                    <p>${getIdFromPokemon(pokemon.url)}</p>
                    <img class="poke__img" src="/img/image.png" data-imagesrc="${artworkUrl}/${getIdFromPokemon(pokemon.url)}.png" width="200" alt="${pokemon.name}">
                    <h2 class="text">${pokemon.name}</h2>
                </article>
            `).join("")
                
            let observedPokemon = sectionElm.querySelector("article:nth-last-child(5)")
            observer.observe(observedPokemon)

            let observedImgs = sectionElm.querySelectorAll(".poke__img")
                console.log(observedImgs);
                observedImgs.forEach(function(observedImg){
                    imgObserver.observe(observedImg)

                })
                
            }
    )
    document.querySelector("main").append(sectionElm)
}

fetchPokemon(currentOffset)