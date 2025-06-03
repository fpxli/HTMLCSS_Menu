document.addEventListener("DOMContentLoaded", () => {
  const emailLogado = localStorage.getItem("usuarioLogado");
  if (!emailLogado) {
    alert("Você precisa estar logado para acessar esta página.");
    window.location.href = "login.html";
    return;
  }

  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  const usuario = usuarios.find(u => u.email === emailLogado);

  if (!usuario) {
    alert("Usuário não encontrado.");
    localStorage.removeItem("usuarioLogado");
    window.location.href = "login.html";
    return;
  }

  document.getElementById("nome").value = usuario.nome;
  document.getElementById("endereco").value = usuario.endereco;
  document.getElementById("senha").value = usuario.senha;

  const form = document.getElementById("formEditarUsuario");
  const msgSucesso = document.getElementById("msgSucesso");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    usuario.nome = document.getElementById("nome").value.trim();
    usuario.endereco = document.getElementById("endereco").value.trim();
    usuario.senha = document.getElementById("senha").value;

    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    msgSucesso.textContent = "Dados atualizados com sucesso!";
  });
});
