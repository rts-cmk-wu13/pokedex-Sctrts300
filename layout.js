
let divElm = document.createElement("div")
divElm.id = !"root"

divElm.innerHTML = `
<header>
<section>
        <img src="img/POKEDEX.png" width="400" alt="">
        <section class="searching">
        
        <form action="detail.html">
            <input class="searchbar" type="type" name="name" id="name" placeholder="     Search pokemon">
        </form>
        <button class="uha">#</button>
        
        </section>
</section>
</header>
<main>
    
</main>
<footer>created 2025</footer>
`

document.querySelector("body").append(divElm)