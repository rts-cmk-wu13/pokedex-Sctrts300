
// Skift navnet på 'search' for at undgå konflikt
let queryString = window.location.search;
let params = new URLSearchParams(queryString);
let pokeName = params.get("name");
console.log(pokeName);

 
let sectionElm = document.createElement("section");
sectionElm.className = "poke-details";
 
fetch(`https://pokeapi.co/api/v2/pokemon/${pokeName}`)
  .then(function (response) {
    return response.json();
  })
  .then(function (pokemon) {
    console.log(pokemon);
    sectionElm.innerHTML = `

            <a href="index.html">
                <button href=>back</button>
            </a>
            <p>${pokemon.name}</p>
            <p>#${pokemon.id.toString().padStart(4, "0")}</p>
            <img class="poke_img" src="${
              pokemon.sprites.other["official-artwork"].front_default
            }" alt="${pokemon.name}">
            <p>${pokemon.weight} Kg</p>
            <p>${pokemon.height} m</p>
 
            <section>
                ${pokemon.abilities
                  .slice(0, 2)
                  .map(function (singleMove) {
                    return `<p>${singleMove.ability.name}</p>`;
                  })
                  .join("")}
            </section>
           
            <section class="poke__stats">
                ${pokemon.stats
                  .map(function (singleStat) {
                    return `
                        <p>${singleStat.stat.name}</p>
                        <meter id="file" max="250" value="${singleStat.base_stat}"></meter>
                    `;
                  })
                  .join("")}
            </section>
      `;
    document.querySelector("main").append(sectionElm);
  });



