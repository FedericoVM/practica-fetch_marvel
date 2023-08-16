        //  ------------------ Informacion de la API  ----------------------------

        let api_key = "66989ac99f6dcf6c598dc3b1085fe7be"
        let private_key = "8f82dd141d0f388611d979f8eb190a3178968f98"
        let ts = 1
        let hash = "9e444f1841595a54e76f5b615d3e6411"

        let url = `https://gateway.marvel.com:443/v1/public/comics?ts=${ts}&apikey=${api_key}&hash=${hash}`

        //------------------------------------------------------------------------

        //  ------------------------- DOM -----------------------------------------


        let main = document.getElementById("main")



        function crearTarjetas(listaSeries) {
            let contenedor_cards = document.getElementById("contenedor-cards")
            listaSeries.forEach(serie => {
                let url_img = serie.thumbnail.path + "/portrait_xlarge.jpg"


                let div_card = document.createElement("div")
                div_card.className = "col-4"

                let card = `            
                <div class="card my-4">
                    <img src=${url_img} class="card-img-top width-fluid" style:"heigth:6rem" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${serie.title}</h5>
                        <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                    </div>
                </div>
            `

                div_card.innerHTML += card
                contenedor_cards.appendChild(div_card)
            });
        }




        function filtrarComics(nombre) {
            let contenedor_cards = document.getElementById("contenedor-cards")
     
            let lista = []
            fetch(url)
                .then((resp) => resp.json())
                .then((datos) => {
                    lista = datos.data.results
                    if (nombre !== "all") { 
                        contenedor_cards.innerHTML = ""
                        let listaFiltrada = lista.filter((serie) => serie.title.includes(nombre));
                        crearTarjetas(listaFiltrada)
                    } 
                    else {
                        contenedor_cards.innerHTML = ""
                        crearTarjetas(lista)
                        console.log(lista);
                    }

                })



        }


        
        // ------------------------------------------------------------------------


        window.addEventListener("load", () => {
            fetch(url)
                .then((resp) => resp.json())
                .then((datos) => {
                    crearTarjetas(datos.data.results)
                })



            let btn = document.getElementsByClassName("h")

            for (let i = 0; i < btn.length; i++) {
                btn[i].addEventListener("click", (e) => {
                    filtrarComics(e.target.name)
                })
            }
        })
