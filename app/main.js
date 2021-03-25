window.onload = function () {

    AOS.init();
    let currentPage = "oceania";

    const loadData = (page) => {
        let content = document.querySelector('.country');
        let continent = document.querySelector('.name');
        let countries = [];
        

        fetch(`https://restcountries.eu/rest/v2/region/${page}`)
            .then(res => res.json()) // the .json() method parses the JSON response into a JS object literal
            .then(data => {

                countries = data;

                renderData(data)
            });


        // Buscador
        let searchInput = document.querySelector("#search");

        searchInput.addEventListener('keyup', (event) => {
            filter(searchInput.value, countries);
        });


        // Pintado de datos de los diferentes países del continente
        const renderData = (data) => {

            // Vaciar antes de pintar
            content.innerHTML = "";
            continent.innerHTML = "";


            // Pintado del continente
            continent.innerHTML += `<div class="continent_title">${data[0].region}</div>`;

            data.forEach(function (i) {

                let item = `
                <li class="item" data-aos="fade-up">
                    <div class="top_info">
                        <div class="left_info">
                            <div class="region_name">${i.name}</div>
                            <div class="capital">Capital, ${i.capital}</div>
                            <div class="country">Subregion, ${i.subregion}</div>
                        </div>
                        <div class="right_info">
                            <img src="${i.flag}" alt="${i.name}">
                        </div>
                    </div>
                    <div class="bottom_info">
                        <div class="population"><span class="fa fa-user"></span>${i.population}</div>
                        <div class="language"><span class="fa fa-language"></span>${i.languages[0].name}</div>
                        <div class="currencies">
                            <div class="currency_symbol">${i.currencies[0].symbol}</div>
                            <div class="currency_name">${i.currencies[0].name}</div>
                        </div>
                    </div>
                </li>`;
                content.innerHTML += item;
            });
        };


        // Filtro para el search
        function filter(value, data) {

            let filteredData = data.filter(country => {
                return country.name.includes(value);
            });

            clearList();
            renderData(filteredData);
        }


        // Limpiar
        function clearList() {
            content.innerHTML = ""
        }
    };

    loadData(currentPage);


    // Pasar de página
    let next = document.querySelector("#next");
    next.addEventListener("click", nextPage, false);

    function nextPage() {
        if (currentPage == "oceania") {
            currentPage = "europe";
        } else if (currentPage == "europe") {
            currentPage = "africa"
        } else if (currentPage == "africa") {
            currentPage = "americas"
        } else if (currentPage == "americas") {
            currentPage = "asia"
        } else if (currentPage == "asia") {
            currentPage = "oceania"
        }

        loadData(currentPage);
    }


    // Volver a la página anterior
    let prev = document.querySelector("#prev");
    prev.addEventListener("click", prevPage, false);

    function prevPage() {
        if (currentPage == "oceania") {
            currentPage = "asia";
        } else if (currentPage == "europe") {
            currentPage = "oceania"
        } else if (currentPage == "africa") {
            currentPage = "europe"
        } else if (currentPage == "americas") {
            currentPage = "africa"
        } else if (currentPage == "asia") {
            currentPage = "americas"
        }
        loadData(currentPage);
    }
}