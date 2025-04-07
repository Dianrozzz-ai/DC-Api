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

    function agregarFavorito(characterName) {
        let favoritos = localStorage.getItem('favoritos');
        favoritos = favoritos ? JSON.parse(favoritos) : [];
    
        if (!favoritos.includes(characterName)) {
            favoritos.push(characterName);
            localStorage.setItem('favoritos', JSON.stringify(favoritos));
            alert(`${characterName} ha sido añadido a tus favoritos.`); // Opcional: mostrar un mensaje
            mostrarfavoritos(); // Actualizar la vista de favoritos si está abierta
        } else {
            alert(`${characterName} ya está en tus favoritos.`); // Opcional: mostrar un mensaje
        }
    }
    
    function eliminarFavorito(characterName) {
        let favoritos = localStorage.getItem('favoritos');
        favoritos = favoritos ? JSON.parse(favoritos) : [];
    
        const index = favoritos.indexOf(characterName);
        if (index > -1) {
            favoritos.splice(index, 1);
            localStorage.setItem('favoritos', JSON.stringify(favoritos));
            alert(`${characterName} ha sido eliminado de tus favoritos.`); // Opcional: mostrar un mensaje
            mostrarfavoritos(); // Actualizar la vista de favoritos
        }
    }
    