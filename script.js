function acionarBotao()
{
   var textoNome;
   var textoSenha;


   textoNome = document.getElementById('txtUsuario').value;

   textoSenha = document.getElementById('txtSenha').value;


   if(textoNome =="")
    {
    alert("Preencha o campo nome");
   }
   else if(textoSenha =="")
    {
    alert("Preencha o campo senha");
   }
   else {
    if(textoNome == "usuarioCorreto" && textoSenha == "senhaCorreta")
       {
       window.location.href = 'paginaUsuario.html';
       } 
       else
       {
        alert("Usuário e/ou senha incorretos. Tente novamente");
        return;
       }    
   }
   
}