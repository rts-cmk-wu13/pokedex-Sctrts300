
let divElm = document.createElement("div")
divElm.id = !"root"

divElm.innerHTML = `
<header>
    <img src="" alt="">
    <input type="text">
    <button></button>
</header>
<main>
    <div></div>
</main>
<footer>created 2025</footer>
`

document.querySelector("body").append(divElm)