const villainNameHeading = document.getElementById('villainName');
const villainDetailsDiv = document.getElementById('villainDetails');

function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

const characterId = getQueryParam('id');
const detailsApiUrl = `https://akabab.github.io/superhero-api/api/id/${characterId}.json`;

if (characterId) {
    fetch(detailsApiUrl)
        .then(response => response.json())
        .then(characterData => {
            console.log("Detalles del personaje:", characterData);

            villainNameHeading.textContent = characterData.name;

            const imageElement = document.createElement('img');
            imageElement.src = characterData.images.md || characterData.images.sm;
            imageElement.alt = characterData.name;
            villainDetailsDiv.appendChild(imageElement);

            const realNameParagraph = document.createElement('p');
            realNameParagraph.textContent = `Nombre Real: ${characterData.biography['full-name'] || 'No disponible'}`;
            villainDetailsDiv.appendChild(realNameParagraph);

            const publisherParagraph = document.createElement('p');
            publisherParagraph.textContent = `Editorial: ${characterData.biography.publisher || 'No disponible'}`;
            villainDetailsDiv.appendChild(publisherParagraph);

            const alignmentParagraph = document.createElement('p');
            alignmentParagraph.textContent = `Alineación: ${characterData.biography.alignment || 'No disponible'}`;
            villainDetailsDiv.appendChild(alignmentParagraph);

            if (characterData.powerstats) {
                const powerstatsHeading = document.createElement('h4');
                powerstatsHeading.textContent = 'Estadísticas de Poder';
                villainDetailsDiv.appendChild(powerstatsHeading);

                const powerstatsList = document.createElement('ul');
                for (const stat in characterData.powerstats) {
                    const listItem = document.createElement('li');
                    listItem.textContent = `${stat}: ${characterData.powerstats[stat]}`;
                    powerstatsList.appendChild(listItem);
                }
                villainDetailsDiv.appendChild(powerstatsList);
            }

            const genderParagraph = document.createElement('p');
            genderParagraph.textContent = `Género: ${characterData.appearance.gender || 'No disponible'}`;
            villainDetailsDiv.appendChild(genderParagraph);

            const raceParagraph = document.createElement('p');
            raceParagraph.textContent = `Raza: ${characterData.appearance.race || 'No disponible'}`;
            villainDetailsDiv.appendChild(raceParagraph);

            const heightParagraph = document.createElement('p');
            heightParagraph.textContent = `Altura: ${characterData.appearance.height ? characterData.appearance.height.join(' / ') : 'No disponible'}`;
            villainDetailsDiv.appendChild(heightParagraph);

            const weightParagraph = document.createElement('p');
            weightParagraph.textContent = `Peso: ${characterData.appearance.weight ? characterData.appearance.weight.join(' / ') : 'No disponible'}`;
            villainDetailsDiv.appendChild(weightParagraph);

            const eyeColorParagraph = document.createElement('p');
            eyeColorParagraph.textContent = `Color de Ojos: ${characterData.appearance['eye-color'] || 'No disponible'}`;
            villainDetailsDiv.appendChild(eyeColorParagraph);

            const hairColorParagraph = document.createElement('p');
            hairColorParagraph.textContent = `Color de Pelo: ${characterData.appearance['hair-color'] || 'No disponible'}`;
            villainDetailsDiv.appendChild(hairColorParagraph);

            const occupationParagraph = document.createElement('p');
            occupationParagraph.textContent = `Ocupación: ${characterData.work.occupation || 'No disponible'}`;
            villainDetailsDiv.appendChild(occupationParagraph);

            const baseParagraph = document.createElement('p');
            baseParagraph.textContent = `Base de Operaciones: ${characterData.work.base || 'No disponible'}`;
            villainDetailsDiv.appendChild(baseParagraph);
        })
        .catch(error => {
            console.error('Error al obtener los detalles del personaje:', error);
            villainDetailsDiv.innerHTML = '<p>Error al cargar los detalles del personaje.</p>';
        });
} else {
    villainDetailsDiv.innerHTML = '<p>No se proporcionó un ID de personaje.</p>';
}