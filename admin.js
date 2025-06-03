const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
const produtos = JSON.parse(localStorage.getItem("produtos")) || [];

const usuarioLista = document.getElementById("usuario-lista");
const produtoLista = document.getElementById("produto-lista");

function criarBannerUsuario(usuario, index) {
  const div = document.createElement('div');
  div.className = 'banner-usuario';
  div.innerHTML = `
    <span>${usuario.nome}</span>
    <button class="btn-excluir" onclick="excluirUsuario(${index})">Excluir</button>
  `;
  return div;
}

function criarBannerProduto(produto, index) {
  const div = document.createElement('div');
  div.className = 'banner-produto';
  div.innerHTML = `
    <span>${produto.nome}</span>
    <button class="btn-excluir" onclick="excluirProduto(${index})">Excluir</button>
  `;
  return div;
}

function excluirUsuario(index) {
  if (confirm("Tem certeza que deseja excluir este usuário?")) {
    usuarios.splice(index, 1);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    atualizarUsuarios();
  }
}

function excluirProduto(index) {
  if (confirm("Tem certeza que deseja excluir este produto?")) {
    produtos.splice(index, 1);
    localStorage.setItem("produtos", JSON.stringify(produtos));
    atualizarProdutos();
  }
}

function atualizarUsuarios() {
  usuarioLista.innerHTML = '';
  if (usuarios.length === 0) {
    usuarioLista.innerHTML = '<p>Nenhum usuário cadastrado.</p>';
    return;
  }
  usuarios.forEach((usuario, index) => {
    usuarioLista.appendChild(criarBannerUsuario(usuario, index));
  });
}

function atualizarProdutos() {
  produtoLista.innerHTML = '';
  if (produtos.length === 0) {
    produtoLista.innerHTML = '<p>Nenhum produto cadastrado.</p>';
    return;
  }
  produtos.forEach((produto, index) => {
    produtoLista.appendChild(criarBannerProduto(produto, index));
  });
}

atualizarUsuarios();
atualizarProdutos();