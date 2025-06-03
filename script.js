function verificarLogin() {
  const usuarioInput = document.getElementById("txtUsuario").value.trim();
  const senhaInput = document.getElementById("txtSenha").value.trim();
  const mensagemErro = document.getElementById("mensagemErro");

  mensagemErro.textContent = "";

  if (usuarioInput === "") {
    alert("Preencha o campo de usuário!");
    return;
  }

  if (senhaInput === "") {
    alert("Preencha o campo de senha!");
    return;
  }

  const usuario = usuarioInput.toLowerCase();
  const senha = senhaInput;

  if (usuario === "admin" && senha === "admin") {
    alert("Login de administrador realizado com sucesso!");
    window.location.href = "paginaAdm.html";
    return;
  }

  if (usuario === "admin") {
    mensagemErro.textContent = "Este usuário é reservado.";
    mensagemErro.style.color = "red";
    return;
  }

  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  const usuarioEncontrado = usuarios.find(u => u.email.toLowerCase() === usuario && u.senha === senha);

  if (usuarioEncontrado) {
    localStorage.setItem("usuarioLogado", usuarioEncontrado.email); 
    alert("Login realizado com sucesso!");
    window.location.href = "paginaUser.html";
  } else {
    mensagemErro.textContent = "Usuário ou senha incorretos.";
    mensagemErro.style.color = "red";
  }
}








/* Página registro */
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
  if (email.toLowerCase() === "admin") {
    alert("O email 'admin' é reservado e não pode ser utilizado.");
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

  const dadosUsuario = {
    nome,
    sobrenome,
    email,
    dataNascimento,
    endereco,
    bairro,
    numero,
    senha
  };

  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  usuarios.push(dadosUsuario);
  localStorage.setItem("usuarios", JSON.stringify(usuarios));

  alert("Cadastro realizado com sucesso!");
  window.location.href = "login.html";
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










/* Página aulas */
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








/* Página eventos */
document.addEventListener('DOMContentLoaded', function () {
  const calendarEl = document.getElementById('calendar');


  function carregarEventos() {
    const eventosSalvos = localStorage.getItem("eventos");
    return eventosSalvos ? JSON.parse(eventosSalvos) : [];
  }


  function salvarEventos(eventos) {
    const eventosSimplificados = eventos.map(evento => ({
      title: evento.title,
      start: evento.startStr,
      end: evento.endStr,
      allDay: evento.allDay
    }));
    localStorage.setItem("eventos", JSON.stringify(eventosSimplificados));
  }

  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridWeek',
    locale: 'pt-br',
    selectable: true,
    editable: true,
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,dayGridWeek,dayGridDay'
    },
    events: carregarEventos(),

    dateClick: function (info) {
      const title = prompt("Adicionar aula nesta data:");
      if (title) {
        const novoEvento = {
          title: title,
          start: info.dateStr,
          allDay: true
        };
        calendar.addEvent(novoEvento);
        salvarEventos(calendar.getEvents());
      }
    },

    eventChange: function () {
      salvarEventos(calendar.getEvents());
    },

    eventRemove: function () {
      salvarEventos(calendar.getEvents());
    }
  });

  calendar.render();
});



const icsUrl = 'https://raw.githubusercontent.com/clarencechaan/ufc-cal/ics/UFC.ics';
const maxEventos = 5; // Quantidade máxima de eventos exibidos

function converterParaHorarioLocal(icsDate) {
  const dataFormatada = icsDate.replace(/T/, '').replace(/Z/, '');
  const ano = parseInt(dataFormatada.substring(0, 4));
  const mes = parseInt(dataFormatada.substring(4, 6)) - 1;
  const dia = parseInt(dataFormatada.substring(6, 8));
  const hora = parseInt(dataFormatada.substring(9, 11));
  const minuto = parseInt(dataFormatada.substring(11, 13));
  const segundo = parseInt(dataFormatada.substring(13, 15));

  const data = new Date(Date.UTC(ano, mes, dia, hora, minuto, segundo));
  return data.toLocaleString('pt-BR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

async function carregarEventos() {
  try {
    const resposta = await fetch(icsUrl);
    const texto = await resposta.text();
    let eventos = parseICS(texto);

    const agora = new Date();
    eventos = eventos.filter(evento => new Date(evento.dataHoraReal) > agora);

    eventos.sort((a, b) => new Date(a.dataHoraReal) - new Date(b.dataHoraReal));

    eventos = eventos.slice(0, maxEventos);

    const tabela = document.getElementById('eventos').getElementsByTagName('tbody')[0];

    eventos.forEach(evento => {
      const linha = tabela.insertRow();
      linha.innerHTML = `
        <td>${converterParaHorarioLocal(evento.dataHora)}</td>
        <td class="event-title">${evento.titulo}</td>
        <td>${evento.descricao}</td>
      `;
    });
  } catch (erro) {
    console.error('Erro ao carregar eventos:', erro);
  }
}


function parseICS(texto) {
  const eventos = [];
  const linhas = texto.split(/\r?\n/);
  let eventoAtual = {};
  let capturarDescricao = false;
  let descricaoTemp = '';

  linhas.forEach((linha, i) => {
    if (linha.startsWith('BEGIN:VEVENT')) {
      eventoAtual = {};
      capturarDescricao = false;
      descricaoTemp = '';
    }
    else if (linha.startsWith('DTSTART')) {
      const dataRaw = linha.split(':')[1].trim();
      eventoAtual.dataHora = dataRaw;
      eventoAtual.dataHoraReal = new Date(
        Date.UTC(
          parseInt(dataRaw.substring(0, 4)),
          parseInt(dataRaw.substring(4, 6)) - 1,
          parseInt(dataRaw.substring(6, 8)),
          parseInt(dataRaw.substring(9, 11)),
          parseInt(dataRaw.substring(11, 13)),
          parseInt(dataRaw.substring(13, 15))
        )
      );
    }
    else if (linha.startsWith('SUMMARY')) {
      eventoAtual.titulo = linha.split(':')[1];
    }
    else if (linha.startsWith('DESCRIPTION')) {
      capturarDescricao = true;
      descricaoTemp = linha.split(':')[1];
    }
    else if (capturarDescricao && linha.startsWith(' ')) {
      descricaoTemp += linha.trim();
    }
    else if (capturarDescricao && !linha.startsWith(' ')) {
      eventoAtual.descricao = descricaoTemp.replace(/\\n/g, '<br>');
      capturarDescricao = false;
    }
    if (linha.startsWith('END:VEVENT')) {
      if (capturarDescricao) {
        eventoAtual.descricao = descricaoTemp.replace(/\\n/g, '<br>');
        capturarDescricao = false;
      }
      eventos.push(eventoAtual);
    }
  });

  return eventos;
}

carregarEventos();




