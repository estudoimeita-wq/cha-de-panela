document.addEventListener("DOMContentLoaded", function () {
  console.log("JS carregou corretamente");

  const lista = document.getElementById("lista");
  if (!lista) return;

  lista.innerHTML = "<p>Teste funcionando ✅</p>";
});
