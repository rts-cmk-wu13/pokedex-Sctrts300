
// Skift navnet på 'search' for at undgå konflikt
let queryString = window.location.search;
let params = new URLSearchParams(queryString);
let pokeName = params.get("name");
console.log(pokeName);

 
let sectionElm = document.createElement("section");
sectionElm.className = "poke-details";
 
fetch(`https://pokeapi.co/api/v2/pokemon/${pokeName}`)
  .then(response => {
    console.log(response.ok);
    if(!response.ok){
      throw new Error("No pokemon named this, dingus")
    }
    return response.json()
  })
  .then(pokemon => {
    console.log(pokemon);

    sectionElm.innerHTML = `

            <section class="head">
            <a href="index.html">
              <button href=>back</button>
            </a>
            <p>${pokemon.name}</p>
            <p>#${pokemon.id.toString().padStart(4, "0")}</p>
            </section>

            <img class="poke_img" src="${
              pokemon.sprites.other["official-artwork"].front_default
            }" alt="${pokemon.name}">

            <section class="mid">
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
            </section>
 
           
      `;
  }).catch(function(error) {
    console.log(error)

    sectionElm.innerHTML = `
    <h2>${error.message}</h2>
    <p>Go back to the <a href="index.html">details view</a></p>`; 
  })

  document.querySelector("main").append(sectionElm)




