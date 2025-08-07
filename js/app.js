document.addEventListener('DOMContentLoaded', main);

async function main() {
    const products = await getData();
    searchProduct(products)

}

async function getData() {
    const URL = 'https://japceibal.github.io/japflix_api/movies-data.json'
    const res = await fetch(URL);
    if (!res.ok) alert('error jeje')
    const data = await res.json()
    return data;
}

function searchProduct(products) {
    const searchInput = document.getElementById('inputBuscar');
    const searchBtn = document.getElementById('btnBuscar');
    /*
        title, tagline, score
    */
    searchBtn.addEventListener('click', () => {

        if (searchInput.value.length < 1) return;

        const filteredData = products.filter(product => {
            const { title, overview, tagline, genres } = product

            const fTitle = title.toLowerCase().includes(searchInput.value.toLowerCase())
            const fOverview = overview.toLowerCase().includes(searchInput.value.toLowerCase())
            const fTagline = tagline.toLowerCase().includes(searchInput.value.toLowerCase())

            return fTitle || fOverview || fTagline
        })

        showProducts(filteredData.slice(0, 5))
    });

}

function showProducts(data) {
    const lista = document.getElementById('lista');
    // console.log(lista)

    const template = data.map((element, indice) => {
        const { title, tagline, vote_average, id, overview, genres, release_date, runtime, revenue, budget } = element
        const vote_averageInt = Math.round(vote_average / 2);
        // console.log(element)
        const year = release_date.split("-")[0];

        return `
                <article>
                    <div class='card bg-dark cursor-active p-4' href="#collapseExample${indice}" data-bs-toggle="collapse">
                        <div class='row'>
                            <div class= 'col-6'>
                                <h2 class='text-light'>${title}</h2>
                            </div>
                            <div class= 'col-6'>
                                <p class='text-light text-end'>${commentScore(vote_averageInt)}</p>
                            </div>
                        </div>
                        <div class='row'>
                            <div class='col-12'></div>
                                <p class='text-muted'>${tagline}</p>
                            </div>
                        </div>


                    </div> 
                    
                    <div class="collapse" id="collapseExample${indice}">
                        <div class="card card-body bg-dark text-light">
                            <div class='row'>
                                <div class='col-12'>
                                    <strong>${overview}</strong>
                                </div>
                            </div>
                            <hr/>
                            <div class='row'>
                                <div class='col-6'>
                                    ${showGenres(genres)}
                                </div>
                                <div class='col-6 text-end'>
                                    <div class="dropdown">
                                    <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    More
                                    </button>
                                    <ul class="dropdown-menu">
                                    <li><a class="dropdown-item" href="#">Year: ${year}</a></li>
                                    <li><a class="dropdown-item" href="#">Runtime: ${runtime}</a></li>
                                    <li><a class="dropdown-item" href="#">Budget: $${budget}</a></li>
                                    <li><a class="dropdown-item" href="#">Revenue: $${revenue}</a></li>
                                    </ul>
                                </div>
                            </div>

                        </div>
                    </div>

                </article>
                `
    })


    lista.innerHTML = template
}

function commentScore(score) {
    let templateStars = ``;

    for (let i = 1; i <= 5; i++) {
        if (i <= score) {
            templateStars += `
                <span class="fa fa-star checked"></span>
                `
        } else {
            templateStars += `
                <span class="fa fa-star"></span>
                `
        }
    }

    return templateStars;
}

function showGenres(genreArray) {


    const genres = genreArray.map(genre => {
        return `
                ${genre.name}
        `
    })
    return genres
}
