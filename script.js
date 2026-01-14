document.addEventListener("DOMContentLoaded", () => {
  const lista = document.getElementById("lista");
  if (!lista) return; // <-- ISSO resolve o erro
const API_URL = "https://script.google.com/macros/s/AKfycbxZl6xy40lCe9h62Elh9XHSU-nsiyO4pTJxeNjCz88Y492BEyxqSkKeaiTxRb5ugGSe/exec";

let escolhidos = [];

fetch(API_URL)
  .then(res => res.json())
  .then(data => {
    const lista = document.getElementById("lista");

    data.forEach(item => {
      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <img src="${item.imagem}">
        <h3>${item.nome}</h3>
        <p class="link">
          <a href="${item.link}" target="_blank">
            Caso queira uma sugestão de onde comprar o presente só entrar no link ❤️
          </a>
        </p>
        ${
          item.escolhidopor
          ? `<p><strong>Escolhido por:</strong> ${item.escolhidopor}</p>`
          : `<input placeholder="Seu nome" onchange="selecionar('${item.nome}', this.value)">`
        }
      `;

      lista.appendChild(card);
    });
  });

function selecionar(nome, pessoa) {
  escolhidos.push({ nome, escolhidopor: pessoa });
}

function confirmar() {
  Promise.all(escolhidos.map(item =>
    fetch(API_URL, {
      method: "POST",
      body: JSON.stringify(item)
    })
  )).then(() => {
    window.location.href = "obrigado.html";
  });
}
