document.addEventListener("DOMContentLoaded", function() {
    const usuarioLogado = localStorage.getItem("currentUser");
    if (!usuarioLogado && window.location.pathname.includes("dashboard.html")) {
        alert("Acesso restrito. Faça login!");
        window.location.href = "login1.html";
    }
});
