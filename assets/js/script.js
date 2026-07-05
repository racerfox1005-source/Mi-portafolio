// Navegación entre secciones
function toggleSeccion(id) {
    const hero = document.getElementById('hero');
    if(hero) hero.classList.add('hidden');
    
    const vistas = document.querySelectorAll('.view');
    vistas.forEach(v => v.classList.add('hidden'));

    const seccionTarget = document.getElementById(id + '-section');
    if (seccionTarget) {
        seccionTarget.classList.remove('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// Volver al Hero
function volverInicio() {
    const vistas = document.querySelectorAll('.view');
    vistas.forEach(v => v.classList.add('hidden'));

    const hero = document.getElementById('hero');
    if(hero) hero.classList.remove('hidden');
    
    const videos = document.querySelectorAll('.card-comision video');
    videos.forEach(video => {
        video.pause();
        video.currentTime = 0;
    });
}

// FUNCIÓN DEFINITIVA TIKTOK
function abrirTikTok() {
    const url = "https://www.tiktok.com/@dav_serrano1005";
    
    // Abrir en pestaña nueva: los móviles suelen preguntar si abrir en la App
    const win = window.open(url, '_blank');
    
    // Si el navegador bloquea el pop-up, redirigimos en la misma pestaña
    if (!win || win.closed || typeof win.closed == 'undefined') {
        window.location.href = url;
    }
}
