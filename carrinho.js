document.addEventListener("DOMContentLoaded", () => {
  const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  const container = document.getElementById("carrinho-itens");
  const totalContainer = document.getElementById("total");

  if (carrinho.length === 0) {
    container.innerHTML = "<p>Seu carrinho está vazio.</p>";
    return;
  }

  let total = 0;

  carrinho.forEach(produto => {
    const precoNum = parseFloat(produto.preco.replace("R$", "").replace(",", "."));
    const subtotal = precoNum * produto.quantidade;
    total += subtotal;

    const item = document.createElement("div");
    item.className = "item-carrinho";
    item.innerHTML = `
      <img src="${produto.imagem}" alt="${produto.nome}" width="80" />
      <div>
        <h3>${produto.nome}</h3>
        <p>Preço: ${produto.preco}</p>
        <p>Quantidade: ${produto.quantidade}</p>
        <p>Subtotal: R$ ${subtotal.toFixed(2)}</p>
        <button onclick="removerItem(${produto.id})">Remover</button>
      </div>
    `;
    container.appendChild(item);
  });

  totalContainer.innerHTML = `<h3>Total: R$ ${total.toFixed(2)}</h3>`;
});

function removerItem(id) {
  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  carrinho = carrinho.filter(produto => produto.id !== id);
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  location.reload();
}

function finalizarCompra() {
  alert("Compra finalizada! Obrigado pela preferência.");
  localStorage.removeItem("carrinho");
  location.reload();
}