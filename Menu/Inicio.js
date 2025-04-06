function mostrarinicio() {
    const appDiv = document.getElementById('app');
    appDiv.innerHTML = `
        <div class="inicio-content">
            <div class="welcome-section">
                <img src="https://static1.srcdn.com/wordpress/wp-content/uploads/2024/08/dc-all-in-featured-image.jpg" alt="Imagen de Bienvenida" class="welcome-image">
                <h2>¡Bienvenido a la Enciclopedia de Personajes de DC Comics!</h2>
                <p class="intro-text">
                    Este es un proyecto dedicado a explorar el vasto y emocionante universo de los personajes de DC Comics.
                    Aquí podrás encontrar información sobre tus héroes y villanos favoritos.
                </p>
            </div>

            <div class="about-section">
                <h3>Acerca de esta página</h3>
                <p>
                    En la pestaña de "Personaje", podrás ver una lista de algunos de los personajes más icónicos de DC Comics.
                    Al hacer clic en sus nombres, se abrirá una nueva pestaña con información más detallada sobre ellos.
                    Esta página es un proyecto en desarrollo, y esperamos añadir muchas más funcionalidades en el futuro.
                </p>
            </div>

            <div class="history-section">
                <h3>Un breve vistazo a la historia de DC Comics</h3>
                <img src="https://www.cinemascomics.com/wp-content/uploads/2016/12/Joker-y-Harley-Quinn-en-The-Batman-1.jpg" alt="Imagen de la Historia de DC Comics" class="history-image">
                <p>
                    DC Comics, una de las editoriales de cómics más grandes y antiguas del mundo, tiene una rica historia que se remonta a 1934, cuando se fundó como National Allied Publications.
                    A lo largo de los años, ha introducido personajes legendarios que se han convertido en iconos de la cultura popular, como Superman, Batman, Wonder Woman, The Flash, Green Lantern y muchos más.
                </p>
                <p>
                    Desde sus inicios en la Edad de Oro de los cómics, DC ha evolucionado a través de diversas épocas, presentando historias innovadoras y personajes complejos que han cautivado a generaciones de lectores.
                    Sus cómics han sido adaptados a innumerables películas, series de televisión, videojuegos y otros medios, consolidando su lugar en el panteón del entretenimiento.
                </p>
                <p class="conclusion-text">
                    ¡Esperamos que disfrutes explorando el mundo de DC Comics con nosotros!
                </p>
            </div>
        </div>
    `;
    const villainListDiv = document.getElementById('villainList');
    if (villainListDiv) {
        villainListDiv.style.display = 'none';
    }
    setActiveButton(0); // El botón de Inicio es el primero (índice 0)
}

document.addEventListener('DOMContentLoaded', () => {
    setActiveButton(0); // Inicialmente la pestaña de Inicio estará activa
});
