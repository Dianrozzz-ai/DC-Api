function mostrarcontacto() {
    const appDiv = document.getElementById('app');
    appDiv.innerHTML = '<h2>Contacto</h2><p>Información de contacto.</p>';
    const villainListDiv = document.getElementById('villainList');
    if (villainListDiv) {
        villainListDiv.style.display = 'none';
    }
    setActiveButton(3); // El botón de Contacto es el cuarto (índice 3)
}