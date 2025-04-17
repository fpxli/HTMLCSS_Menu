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
    let cep = document.getElementById("cep").value;
    cep = cep.replace(/\D/g, ""); // remove caracteres não numéricos

    if (cep.length !== 8) {
        alert("CEP inválido. Deve conter 8 números.");
        document.getElementById("txtEndereco").value = "";
        document.getElementById("txtBairro").value = "";
        return;
    }

    const url = `https://viacep.com.br/ws/${cep}/json/`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.erro) {
                alert("CEP não encontrado.");
                document.getElementById("txtEndereco").value = "";
                document.getElementById("txtBairro").value = "";
            } else {
                document.getElementById("txtEndereco").value = data.logradouro || "";
                document.getElementById("txtBairro").value = data.bairro || "";
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
   const bairro = document.getElementById('txtBairro').value;
   const numero = document.getElementById('txtNumero').value;
   const senha = document.getElementById("txtSenha").value;

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
    if (bairro === "") {
    alert("Por favor, verifique o campo CEP.");
    return;
}
    if (numero === "") {
    alert("Por favor, preencha o número.");
    return;
}
   if (senha === "") {
    alert("Por favor, preencha a senha.");
    return;
}
     alert("Cadastro realizado com sucesso!");
     window.location.href="login.html";
     return false;
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

document.addEventListener("DOMContentLoaded", function () {
    const cidade = "São Paulo";

    fetch(`https://goweather.herokuapp.com/weather/${encodeURIComponent(cidade)}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById("temperatura").textContent = data.temperature || "Não disponível";
            document.getElementById("vento").textContent = data.wind || "Não disponível";
            document.getElementById("descricaoclima").textContent = data.description || "Não disponível";
        })
        .catch(error => {
            console.error("Erro ao buscar o clima:", error);
            document.getElementById("clima-container").innerHTML = "<p>Erro ao carregar o clima.</p>";
        });
});