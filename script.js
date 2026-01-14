document.addEventListener("DOMContentLoaded", function () {

  const lista = document.getElementById("lista");
  if (!lista) {
    return;
  }

  const API_URL = "https://script.google.com/macros/s/AKfycbxZl6xy40lCe9h62Elh9XHSU-nsiyO4pTJxeNjCz88Y492BEyxqSkKeaiTxRb5ugGSe/exec";

  fetch(API_URL)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {

      lista.innerHTML = "";

      data.forEach(function (item) {
        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML =
          '<img src="' + item.imagem + '">' +
          '<h3>' + item.nome + '</h3>' +
          '<p class="link">' +
            '<a href="' + item.link + '" target="_blank">' +
              'Caso queira uma sugestão de onde comprar o presente só entrar no link ❤️' +
            '</a>' +
          '</p>' +
          (item.escolhidopor
            ? '<p><strong>Escolhido por:</strong> ' + item.escolhidopor + '</p>'
            : '<input type="text" placeholder="Seu nome" data-nome="' + item.nome + '">');

        lista.appendChild(card);
      });

    })
    .catch(function (error) {
      console.error("Erro ao carregar presentes:", error);
    });

  window.confirmar = function () {
    const inputs = document.querySelectorAll("input[data-nome]");
    const requests = [];

    inputs.forEach(function (input) {
      if (input.value.trim() !== "") {
        requests.push(
          fetch(API_URL, {
            method: "POST",
            body: JSON.stringify({
              nome: input.dataset.nome,
              escolhidopor: input.value.trim()
            })
          })
        );
      }
    });

    Promise.all(requests).then(function () {
      window.location.href = "obrigado.html";
    });
  };

});
