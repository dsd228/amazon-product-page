const app = document.getElementById("app");

const screens = {
  splash: `
    <section class="screen splash">
      <div class="card splash-card">
        <div class="splash-logo">
          <span class="paw-icon">🐾</span>
        </div>
        <p class="splash-text">Cargando tu experiencia</p>
        <p class="splash-subtext">Esto puede tardar unos segundos</p>
      </div>
    </section>
  `,

  login: `
    <div class="login">
      <div class="login-header">
        <h1 class="login-title">Bienvenido</h1>
        <p class="login-subtitle">Ingresá a tu cuenta</p>
      </div>

      <div class="login-form">
        <label>Email</label>
        <input type="email" placeholder="Ejemplo: usuario@email.com" />

        <label>Contraseña</label>
        <input type="password" placeholder="Escribí tu contraseña" />

        <button id="goHome">Ingresar</button>
      </div>
    </div>
  `,

  home: `
    <div class="home">
      <h2>Home</h2>
    </div>
  `
};

function loadScreen(name) {
  app.style.opacity = 0;

  setTimeout(() => {
    app.innerHTML = screens[name];
    app.style.opacity = 1;

    if (name === "login") {
      document
        .getElementById("goHome")
        ?.addEventListener("click", () => loadScreen("home"));
    }
  }, 300);
}

/* FLOW */
loadScreen("splash");
setTimeout(() => loadScreen("login"), 3000);
