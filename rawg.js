document.getElementById('searchForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const query = document.getElementById('query').value;
    searchGames(query);
});

function searchGames(query) {
    const apiKey = '0eb64185c05d4af285ec980256ff28e2';
    const url = `https://api.rawg.io/api/games?key=${apiKey}&search=${query}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayResults(data.results);
        })
        .catch(error => {
            console.error('Erro ao buscar dados:', error);
        });
}

function displayResults(games) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';

    if (games.length === 0) {
        resultsContainer.innerHTML = '<p>Nenhum resultado encontrado.</p>';
        return;
    }

    games.forEach(game => {
        const gameElement = document.createElement('div');
        gameElement.classList.add('game');
        

        gameElement.innerHTML = `
            <div class="container-fluid">
            <div class="text-center">
            <h3>${game.name}</h3>
            <p>Data de lançamento: ${game.released}</p>
            <img src="${game.background_image}" alt="${game.name}" class="">
            <p>Avaliação: ${game.rating}⭐</p>
            <a href="details.html?id=${game.id}" class="details-link";>Ver Detalhes</a>
            </div>
            </div>
        `;

        resultsContainer.appendChild(gameElement);
    });
}