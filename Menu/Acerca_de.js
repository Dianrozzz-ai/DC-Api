function mostraracerca_de() {
    const appDiv = document.getElementById('app');
    appDiv.innerHTML = '<h2>Acerca de</h2><p>Información sobre la página o el proyecto.</p>';
    const villainListDiv = document.getElementById('villainList');
    if (villainListDiv) {
        villainListDiv.style.display = 'none';
    }
    setActiveButton(2); // El botón de Acerca de es el tercero (índice 2)
}