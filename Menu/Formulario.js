function mostrarformulario() {
    const appDiv = document.getElementById('app');

    appDiv.innerHTML = `
        <h2>Registro de Usuario</h2>
        <form id="registroForm">
            <div class="form-group">
                <label for="username">Nombre de Usuario:</label>
                <input type="text" id="username" name="username" required>
            </div>
            <div class="form-group">
                <label for="email">Correo Electrónico:</label>
                <input type="email" id="email" name="email" required>
            </div>
            <div class="form-group">
                <label for="password">Contraseña:</label>
                <input type="password" id="password" name="password" required>
            </div>
            <div class="form-group">
                <label for="confirmPassword">Confirmar Contraseña:</label>
                <input type="password" id="confirmPassword" name="confirmPassword" required>
            </div>
            <div class="form-group">
                <label for="name">Nombre Completo:</label>
                <input type="text" id="name" name="name" required>
            </div>
            <div class="form-group">
                <label for="birthdate">Fecha de Nacimiento:</label>
                <input type="date" id="birthdate" name="birthdate">
            </div>
            <div class="form-group">
                <label for="gender">Género:</label>
                <select id="gender" name="gender">
                    <option value="">Seleccionar</option>
                    <option value="male">Masculino</option>
                    <option value="female">Femenino</option>
                    <option value="other">Otro</option>
                </select>
            </div>
            <button type="submit">Registrarse</button>
        </form>
    `;
    setActiveButton(3); // El botón de "Formulario" ahora es el cuarto (índice 3)
}