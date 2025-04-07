function mostrarfavoritos() {
    const appDiv = document.getElementById('app');
    let favoritos = localStorage.getItem('favoritos');
    favoritos = favoritos ? JSON.parse(favoritos) : [];

    let favoritosHTML = `<h2>Personajes Favoritos</h2>`;
    if (favoritos.length > 0) {
        favoritosHTML += `<div class="villain-list favorites-grid">`;
        favoritos.forEach(characterName => {
            favoritosHTML += `
                <div class="villain-card">
                    <h3>${characterName}</h3>
                    <button class="compare-button" onclick="eliminarFavorito('${characterName}')">Eliminar de Favoritos</button>
                </div>
            `;
        });
        favoritosHTML += `</div>`;
    } else {
        favoritosHTML += `<p>No has añadido ningún personaje a tus favoritos.</p>`;
    }

    appDiv.innerHTML = favoritosHTML;
    setActiveButton(2);
}