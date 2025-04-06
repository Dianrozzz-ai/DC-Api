const villainListDiv = document.getElementById('villainList');
const apiUrl = 'https://akabab.github.io/superhero-api/api/all.json';

fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        const dcCharacters = data.filter(hero => hero.biography.publisher === 'DC Comics');

        dcCharacters.forEach(character => {
            const characterCard = document.createElement('div');
            characterCard.classList.add('villain-card');

            const nameLink = document.createElement('a');
            nameLink.href = `villain_details.html?id=${character.id}`;
            nameLink.textContent = character.name;
            nameLink.target = '_blank';

            const nameHeading = document.createElement('h3');
            nameHeading.appendChild(nameLink);

            const descriptionParagraph = document.createElement('p');
            // descriptionParagraph.textContent = `Nombre Real: ${character.biography['full-name'] || 'No disponible'}`; // Esta línea se ha comentado o eliminado

            const imageElement = document.createElement('img');
            imageElement.src = character.images.sm;
            imageElement.alt = character.name;

            characterCard.appendChild(nameHeading);
            characterCard.appendChild(imageElement);
            characterCard.appendChild(descriptionParagraph);

            villainListDiv.appendChild(characterCard);
        });
    })
    .catch(error => {
        console.error('Error al obtener los datos de la API:', error);
        villainListDiv.innerHTML = '<p>Error al cargar los personajes.</p>';
    });

    const navButtons = document.querySelectorAll('.c-nav button');

    // Función para remover la clase 'active' de todos los botones
    function removeActiveClass() {
        navButtons.forEach(button => {
            button.classList.remove('active');
        });
    }
    
    // Función para añadir la clase 'active' al botón actual
    function setActiveButton(index) {
        removeActiveClass();
        if (navButtons[index]) {
            navButtons[index].classList.add('active');
        }
    }