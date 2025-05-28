document.addEventListener("DOMContentLoaded", () => {
  const produtos = JSON.parse(localStorage.getItem("produtos"));
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("id"));

  const container = document.getElementById("produto-detalhe");

  if (!isNaN(id)) {
    const produto = produtos.find(p => p.id === id);
    if (produto) {
      container.innerHTML = `
        <div class="produto-detalhe-card">
          <img src="${produto.imagem}" alt="${produto.nome}" />
          <div class="produto-info">
            <h1>${produto.nome}</h1>
            <p class="preco">${produto.preco}</p>
            <p class="descricao">${produto.descricaoLonga}</p>

            <div class="quantidade-container">
              <label for="quantidade">Quantidade:</label>
              <input type="number" id="quantidade" name="quantidade" value="1" min="1" />
            </div>

            <button class="btn-comprar">Adicionar ao carrinho</button>
            <div class="msg-sucesso" style="display:none;"></div>

            <a href="loja.html" class="btn-voltar">← Voltar para a loja</a>
          </div>
        </div>
      `;

      const btnComprar = container.querySelector(".btn-comprar");
      const inputQtd = container.querySelector("#quantidade");
      const msgSucesso = container.querySelector(".msg-sucesso");

      btnComprar.addEventListener("click", () => {
        const quantidade = parseInt(inputQtd.value);
        if (quantidade < 1 || isNaN(quantidade)) {
          alert("Informe uma quantidade válida (1 ou mais).");
          return;
        }

        // Aqui vai o código que adiciona o produto ao carrinho no localStorage
        let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

        const itemExistente = carrinho.find(item => item.id === produto.id);
        if (itemExistente) {
          itemExistente.quantidade += quantidade;
        } else {
          carrinho.push({
            id: produto.id,
            nome: produto.nome,
            preco: produto.preco,
            imagem: produto.imagem,
            quantidade: quantidade
          });
        }

        localStorage.setItem("carrinho", JSON.stringify(carrinho));

        // Mostrar mensagem de sucesso
        msgSucesso.style.display = "block";
        msgSucesso.textContent = `Adicionado ${quantidade} unidade(s) do produto ao carrinho!`;
      });

    } else {
      container.innerHTML = `<p>Produto não encontrado.</p><a href="loja.html">Voltar para a loja</a>`;
    }
  } else {
    container.innerHTML = `<p>Produto não encontrado.</p><a href="loja.html">Voltar para a loja</a>`;
  }
});