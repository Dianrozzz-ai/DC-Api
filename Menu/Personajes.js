function mostrarpersonajes() {
    const appDiv = document.getElementById('app');
    const villainListDiv = document.getElementById('villainList');
    const apiUrl = 'https://akabab.github.io/superhero-api/api/all.json';

    appDiv.innerHTML = `
        <div class="search-container">
            <input type="text" id="searchInput" placeholder="Buscar personaje...">
        </div>
    `;
    villainListDiv.style.display = 'grid';
    villainListDiv.innerHTML = '';

    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', filterCharacters);

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const dcCharacters = data.filter(hero => hero.biography.publisher === 'DC Comics');
            displayCharacters(dcCharacters); // Llamar a una nueva función para mostrar los personajes
        })
        .catch(error => {
            console.error('Error al obtener los datos de la API:', error);
            villainListDiv.innerHTML = '<p>Error al cargar los personajes.</p>';
        });
    setActiveButton(1);
}

function displayCharacters(characters) {
    const villainListDiv = document.getElementById('villainList');
    villainListDiv.innerHTML = ''; // Limpiar personajes anteriores

    characters.forEach(character => {
        const characterCard = document.createElement('div');
        characterCard.classList.add('villain-card');
        characterCard.dataset.characterName = character.name.toLowerCase(); // Añadir atributo de datos para facilitar el filtrado

        const nameLink = document.createElement('a');
        nameLink.href = `../villain_details.html?id=${character.id}`;
        nameLink.textContent = character.name;
        nameLink.target = '_blank';

        const nameHeading = document.createElement('h3');
        nameHeading.appendChild(nameLink);

        const imageElement = document.createElement('img');
        imageElement.src = character.images.sm;
        imageElement.alt = character.name;

        characterCard.appendChild(nameHeading);
        characterCard.appendChild(imageElement);

        villainListDiv.appendChild(characterCard);
    });
}

function filterCharacters() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const characterCards = document.querySelectorAll('.villain-card');

    characterCards.forEach(card => {
        const characterName = card.dataset.characterName;
        if (characterName.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}
// Ocultar inicialmente la lista de villanos
document.addEventListener('DOMContentLoaded', () => {
    const villainListDiv = document.getElementById('villainList');
    if (villainListDiv) {
        villainListDiv.style.display = 'none';
    }
});