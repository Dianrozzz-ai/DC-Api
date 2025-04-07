let charactersToCompare = [];

function mostrarpersonajes() {
    const appDiv = document.getElementById('app');
    const villainListDiv = document.getElementById('villainList');

    const apiUrl = 'https://akabab.github.io/superhero-api/api/all.json';

    appDiv.innerHTML = `
        <div class="search-container">
            <input type="text" id="searchInput" placeholder="Buscar personaje...">
        </div>
        <div class="filter-container">
            <label for="alignmentFilter">Alineación:</label>
            <select id="alignmentFilter">
                <option value="">Todos</option>
                <option value="good">Buenos</option>
                <option value="bad">Malos</option>
            </select>
            <label for="publisherFilter">Editorial:</label>
            <select id="publisherFilter">
                <option value="">Todos</option>
                <option value="DC Comics">DC Comics</option>
                <option value="Marvel Comics">Marvel Comics</option>
            </select>
        </div>
        <div id="comparison-section" style="display: none;">
            <h2>Comparación de Personajes</h2>
            <div id="comparison-container"></div>
        </div>
    `;
    villainListDiv.style.display = 'grid';
    villainListDiv.innerHTML = '';

    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', filterCharacters);

    const alignmentFilter = document.getElementById('alignmentFilter');
    alignmentFilter.addEventListener('change', applyFilters);

    const publisherFilter = document.getElementById('publisherFilter');
    publisherFilter.addEventListener('change', applyFilters);

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayCharacters(data);
            allCharactersData = data;
        })
        .catch(error => {
            console.error('Error al obtener los datos de la API:', error);
            villainListDiv.innerHTML = '<p>Error al cargar los personajes.</p>';
        });
    setActiveButton(1);
}

let allCharactersData = []; // Almacena todos los datos de los personajes

function displayCharacters(characters) {
    const villainListDiv = document.getElementById('villainList');
    villainListDiv.innerHTML = '';

    characters.forEach(character => {


        const characterCard = document.createElement('div');
        characterCard.classList.add('villain-card');
        characterCard.dataset.characterName = character.name.toLowerCase();

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

        const compareButton = document.createElement('button');
        compareButton.textContent = charactersToCompare.some(c => c.id === character.id) ? 'Deseleccionar' : 'Comparar';
        compareButton.classList.add('compare-button');
        compareButton.dataset.characterId = character.id;
        compareButton.addEventListener('click', toggleCompare);
        characterCard.appendChild(compareButton);

        // Añade este bloque para el botón de favoritos
        const favoriteButton = document.createElement('button');
        favoriteButton.textContent = 'Añadir a Favoritos';
        favoriteButton.classList.add('compare-button'); // Puedes usar la misma clase o crear una nueva
        favoriteButton.addEventListener('click', () => agregarFavorito(character.name));
        characterCard.appendChild(favoriteButton);

        villainListDiv.appendChild(characterCard);
    });
    filterCharacters();
}

function filterCharacters() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const characterCards = document.querySelectorAll('.villain-card');

    characterCards.forEach(card => {
        const characterName = card.dataset.characterName;
        const shouldShow = characterName.includes(searchTerm);
        card.style.display = shouldShow ? 'block' : 'none';
    });
}

function applyFilters() {
    const alignmentValue = document.getElementById('alignmentFilter').value;
    const publisherValue = document.getElementById('publisherFilter').value;
    let filteredCharacters = allCharactersData;

    if (alignmentValue) {
        filteredCharacters = filteredCharacters.filter(character => character.biography.alignment === alignmentValue);
    }

    if (publisherValue) {
        filteredCharacters = filteredCharacters.filter(character => character.biography.publisher === publisherValue);
    }

    displayCharacters(filteredCharacters);
}

function toggleCompare(event) {
    const characterId = event.target.dataset.characterId;
    const character = allCharactersData.find(c => c.id === parseInt(characterId));
    const comparisonSection = document.getElementById('comparison-section');

    if (character) {
        const isAlreadySelected = charactersToCompare.some(c => c.id === character.id);

        if (isAlreadySelected) {
            charactersToCompare = charactersToCompare.filter(c => c.id !== character.id);
            event.target.textContent = 'Comparar';
        } else if (charactersToCompare.length < 2) {
            charactersToCompare.push(character);
            event.target.textContent = 'Deseleccionar';
        } else {
            alert('Solo puedes seleccionar hasta dos personajes para comparar.');
            return;
        }

        if (charactersToCompare.length === 2) {
            displayComparison();
            comparisonSection.style.display = 'block';
        } else {
            comparisonSection.style.display = 'none';
            document.getElementById('comparison-container').innerHTML = '';
        }
    }
}

function displayComparison() {
    const comparisonContainer = document.getElementById('comparison-container');
    comparisonContainer.innerHTML = ''; // Limpiar comparaciones anteriores

    if (charactersToCompare.length === 2) {
        const char1 = charactersToCompare[0];
        const char2 = charactersToCompare[1];

        const comparisonHTML = `
            <div class="comparison-card">
                <h3>${char1.name}</h3>
                <img src="${char1.images.sm}" alt="${char1.name}">
                <p><strong>Nombre Real:</strong> ${char1.biography['full-name'] || 'No disponible'}</p>
                <p><strong>Alineación:</strong> ${char1.biography.alignment || 'No disponible'}</p>
                <p><strong>Editorial:</strong> ${char1.biography.publisher || 'No disponible'}</p>
            </div>
            <div class="comparison-card">
                <h3>${char2.name}</h3>
                <img src="${char2.images.sm}" alt="${char2.name}">
                <p><strong>Nombre Real:</strong> ${char2.biography['full-name'] || 'No disponible'}</p>
                <p><strong>Alineación:</strong> ${char2.biography.alignment || 'No disponible'}</p>
                <p><strong>Editorial:</strong> ${char2.biography.publisher || 'No disponible'}</p>
            </div>
        `;
        comparisonContainer.innerHTML = comparisonHTML;
    }
}

// Ocultar inicialmente la lista de villanos
document.addEventListener('DOMContentLoaded', () => {
    const villainListDiv = document.getElementById('villainList');
    if (villainListDiv) {
        villainListDiv.style.display = 'none';
    }
});