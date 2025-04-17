function verificarLogin(){
    let usuario = document.getElementById("txtUsuario").value.trim();
    let senha = document.getElementById("txtSenha").value.trim();
    let mensagemErro = document.getElementById("mensagemErro");

    if(usuario =="")
        {
        alert("Preencha o campo nome!");
       }
       else if(senha =="")
        {
        alert("Preencha o campo senha!");
       }
       else {
         if(usuario=="admin" && senha=="admin"){
            alert("Login de administrador realizado com sucesso");
            window.location.href ="paginaAdm.html";
        }else if(usuario=="usuario" && senha=="correta"){
             alert("Login realizado com sucesso!");
             window.location.href ="paginaUser.html";
        }else{
             alert("Usuário ou senha inválidos!");
            mensagemErro.textContent ="Usuário ou senha incorretos.";
            mensagemErro.style.color="red";
        }
    }   
}

function buscarEnderecoPorCEP() {

    const cep = document.getElementById("cep").value;
    if (cep.length !== 8) {
        alert("CEP inválido. Deve conter 8 números.");
        return;
    }

    const url = `https://viacep.com.br/ws/${cep}/json/`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.erro) {
                alert("CEP não encontrado.");
                document.getElementById("endereco").value = "";
            } else {
                const enderecoCompleto = `${data.logradouro}`;
                document.getElementById("endereco").value = enderecoCompleto;
            }
        })
        .catch(error => {
            console.error("Erro ao buscar o CEP:", error);
            alert("Erro ao buscar o CEP.");
        });
}

function validarFormulario() {

   const nome = document.getElementById("txtNome").value.trim();
   const sobrenome = document.getElementById("txtSobrenome").value.trim();
   const email = document.getElementById("txtEmail").value.trim();
   const dataNascimento = document.getElementById("dataNascimento").value;
   const endereco = document.getElementById("txtEndereco").value;

   if (nome === "") {
       alert("Por favor, preencha o nome.");
       return;
}
   if (sobrenome === "") {
        alert("Por favor, preencha o sobrenome.");
        return;
}
    if (email === "") {
        alert("Por favor, preencha o email.");
         return;
}
   if (!validarIdade(dataNascimento)) {
       alert("Você deve ser maior de idade para se cadastrar.");
       return;
}
   if (endereco === "") {
       alert("Preencha um CEP válido para obter o endereço.");
       return;
   }
   
     alert("Cadastro realizado com sucesso!");
     window.location.href="login.html";
}

function validarIdade(dataNascimento) {

   const hoje = new Date();
   const nascimento = new Date(dataNascimento);
   let idade = hoje.getFullYear() - nascimento.getFullYear();
   const mes = hoje.getMonth() - nascimento.getMonth();

   if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
       idade--;
   }
   return idade >= 18;

}
