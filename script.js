const consoleError = error => {
    console.error("message : "+error);
    newsWrapper.innerHTML = "Something went wrong!";
}

const getData = async query => {

    try {
        const data = await fetch(`https://free-news.p.rapidapi.com/v1/search?q=${ query }&lang=en`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "free-news.p.rapidapi.com",
                "x-rapidapi-key": "bc748e1936msh74a3c32ddb50895p13a612jsn26f4fb273519"
            }
        });

        return data.json();
    }
    catch (error) {
        consoleError(error);
    }
}

const renderNews = query => {
    newsWrapper.innerHTML = "";
    loader.style.display = "block";

    getData(query)
    .then(data => {
        loader.style.display = "none";

        if (!data.articles) {
            throw "404 not found.";
        }

        for (article of data.articles) {
            let newsElem = `<a href="${ article.link }"><div class="news"><img src="${ article.media }" /><p>${ article.title+"." }</p></div></a>`;
            newsWrapper.innerHTML += newsElem;
        }
    })
    .catch(error => {
        consoleError(error);
    });
}

const searchTag = tag => {
    renderNews(tag);
    searchDiv.innerText = tag === undefined ? "search tag" : tag;
    inputSearch.value = tag === undefined ? "" : tag;
}