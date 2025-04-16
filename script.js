function verificarLogin(){
   let usuario = document.getElementById("txtUsuario").value.trim();
   let senha = document.getElementById("txtSenha").value.trim();
   let mensagemErro = document.getElementById("mensagemErro");

   if(usuario =="")
      {
      alert("Preencha o campo nome!");
     }
     else if(senha=="")
      {
      alert("Preencha o campo senha!");
     }
    else {
       if(usuario=="admin" && senha=="admin"){
         alert("Login administrador realizado com sucesso");
         window.location.href ="paginaAdm.html";
      } else if(usuario=="usuario" && senha=="usuario"){
         alert("Login realizado com sucesso");
         window.location.href ="paginaUsuario.html";
      }else{
          alert("Usuário ou senha inválidos!");
          mensagemErro.textContent ="Usuário ou senha incorretos.";
          mensagemErro.style.color="red";
      }
   }
   }

function cadastrar(){
   let usuario = document.getElementById("txtUsuario").value.trim();
   let senha = document.getElementById("txtSenha").value.trim();
   let dataNascimento = document.getElementById("txtdtNascimento").value;
   let tipoConta = document.getElementById("selTipoConta").value;

   if(usuario == "" || senha == "" || dataNascimento == "" || tipoConta == ""){
       alert("Todos os campos devem ser preenchidos!");
       return;
   }
   else{
       validarIdade(dataNascimento);
   }
}

function validarIdade(dataNascimento){
   let dataAtual = new Date();
   let dataNasc = new Date(dataNascimento);
   let idade = dataAtual.getFullYear() - dataNasc.getFullYear();

   if(idade < 18){
       alert('Você não pode estar aqui!');
       return;
   }
   else {
       alert('Cadastro realizado com sucesso!');
       alert('Seja bem-vindo');
       window.location.href="login.html"
       
   }
}