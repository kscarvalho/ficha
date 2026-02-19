const containerGeral = document.querySelector('.container-geral');
const botaoCadastro = document.querySelector('.cadastro');

const containerBusca = document.querySelector('.container-busca');
const botaoConsulta = document.querySelector('.consulta');

function formatarData(dataISO) {
  if (!dataISO) return '';
  return new Date(dataISO).toLocaleDateString('pt-BR'); // Formata para dd/mm/aaaa
}

// ADICIONAR E REMOVER AREA CONSULTAS E FICHA DE CADASTRO
botaoConsulta.addEventListener('click', function () {
  `${containerBusca.classList.toggle('active')}` &&
    `${containerGeral.classList.toggle('none')}`;
});

// ATIVAR AREA DE TIPO DEFICIENCIA
const tipoDeficiencia = document.querySelector('.container-tipo-deficiencia');
const deficienciaSim = document.getElementById('deficiencia-sim');

function ativarTipoDeficiencia() {
  if (deficienciaSim.checked) {
    tipoDeficiencia.style.display = 'flex';
  }
}

deficienciaSim.addEventListener('change', ativarTipoDeficiencia);

function cadastrar(event) {
  event.preventDefault();
  // Captura o valor digitado no input com id
  const nome = document.getElementById('nome').value;
  const funcao = document.getElementById('funcao').value;
  const cpf = document.getElementById('cpf').value;
  const matricula = document.getElementById('matricula').value;
  const telefone = document.getElementById('telefone').value;
  const sexo = document.getElementById('sexo').value;
  const dataAtendimento = document.getElementById('atendimento').value;
  const tipoDeficiencia = document.getElementById('tipo-deficiencia').value;

  const tratamentoMedico = document.getElementById('tratamentoMedico').value;
  const medicamentoContinuo = document.getElementById(
    'medicamentoContinuo',
  ).value;
  const algumaDoenca = document.getElementById('algumaDoenca').value;
  const doencaCoracao = document.getElementById('doencaCoracao').value;
  const faltaAr = document.getElementById('faltaAr').value;
  const pernasInchadas = document.getElementById('pernasInchadas').value;
  const alergico = document.getElementById('alergico').value;
  const diabetico = document.getElementById('diabetico').value;
  const transfusaoSangue = document.getElementById('transfusaoSangue').value;
  const cirugia = document.getElementById('cirurgia').value;
  const fratura = document.getElementById('fratura').value;
  const atividadeFisica = document.getElementById('atividadeFisica').value;
  const fuma = document.getElementById('fuma').value;
  const bebida = document.getElementById('bebida').value;
  const drogas = document.getElementById('drogas').value;
  const transtornoMental = document.getElementById('transtornoMental').value;
  const anotacao = document.getElementById('anotacao').value;
  const conclusao = document.getElementById('conclusao').value;

  const deficiencia = document.querySelector(
    'input[name="deficiencia"]:checked',
  )?.value;

  const acidenteTrabalho = document.querySelector(
    'input[name="acidenteTrabalho"]:checked',
  )?.value;

  const doencaOcupacional = document.querySelector(
    'input[name="doencaOcupacional"]:checked',
  )?.value;

  const afastamentoInss = document.querySelector(
    'input[name="afastamentoInss"]:checked',
  )?.value;

  const admissional = document.querySelector(
    'input[name="admissional"]:checked',
  )?.value;

  const periodico = document.querySelector(
    'input[name="periodico"]:checked',
  )?.value;

  const retornoTrabalho = document.querySelector(
    'input[name="retornoTrabalho"]:checked',
  )?.value;

  const mudancaFuncao = document.querySelector(
    'input[name="mudancaFuncao"]:checked',
  )?.value;

  if (!deficiencia) {
    alert('Selecione Sim ou Não para Deficiência');
    return;
  }

  // Envia uma requisição HTTP para o backend
  fetch('http://localhost:3000/usuarios', {
    // Define o método da requisição como POST (enviar dados)
    method: 'POST',

    // Define os cabeçalhos da requisição
    headers: {
      // Informa que os dados enviados são no formato JSON
      'Content-Type': 'application/json',
    },

    // Converte o objeto JavaScript em JSON para enviar ao backend
    body: JSON.stringify({
      nome,
      funcao,
      cpf,
      matricula,
      telefone,
      sexo,
      dataAtendimento,
      deficiencia: deficiencia,
      tipoDeficiencia,
      acidenteTrabalho: acidenteTrabalho,
      doencaOcupacional: doencaOcupacional,
      afastamentoInss: afastamentoInss,
      admissional: admissional,
      periodico: periodico,
      retornoTrabalho: retornoTrabalho,
      mudancaFuncao: mudancaFuncao,
      tratamentoMedico: tratamentoMedico,
      medicamentoContinuo: medicamentoContinuo,
      algumaDoenca: algumaDoenca,
      doencaCoracao: doencaCoracao,
      faltaAr: faltaAr,
      pernasInchadas: pernasInchadas,
      alergico: alergico,
      diabetico: diabetico,
      transfusaoSangue: transfusaoSangue,
      cirugia: cirugia,
      fratura: fratura,
      atividadeFisica: atividadeFisica,
      fuma: fuma,
      bebida: bebida,
      drogas: drogas,
      transtornoMental: transtornoMental,
      anotacao: anotacao,
      conclusao: conclusao,
    }),
  })
    // Converte a resposta do servidor para JSON
    .then((res) => res.json())

    // Recebe os dados retornados pelo backend
    .then((data) => {
      // Exibe a mensagem retornada pelo servidor na tela
      document.getElementById('msg').innerText = data.mensagem;
    })

    // Caso ocorra algum erro na requisição
    .catch(() => {
      // Mostra uma mensagem de erro para o usuário
      document.getElementById('msg').innerText = 'Erro ao cadastrar';
    });
}

// BUSCAR OS DADOS DO ARQUIVO JSON
const buscarUsuario = document.getElementById('buscar-usuario');

function buscarUsuarios() {
  const buscarCpf = document.getElementById('buscar-cpf').value;
  if (!buscarCpf) {
    alert('Por favor, insira um CPF para buscar.');
    return;
  }

  document.getElementById('alerta').innerText = ''; //LIMPA O CATCH ANTES DO FATCH

  fetch(`http://localhost:3000/usuarios/${buscarCpf}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Usuário não encontrado');
      }
      return response.json();
    })
    .then((usuarios) => {
      const resultado = document.getElementById('resultado');

      usuarios.forEach((usuario, index) => {
        resultado.innerHTML += `
      <div style="border:1px solid #000; padding:10px; margin:10px 0; font-family: Arial, helvetica, sans-serif;">

        <h3 class="titulo-registro" style="margin-bottom: 10px;">Registro ${index + 1}</h3>

        <p class="linhas" ><strong>Nome:</strong> ${usuario.nome}</p>
        <p class="linhas" ><strong>Exame Admissional:</strong> ${usuario.admissional}</p>
        <p class="linhas" ><strong>Exame Periodico:</strong> ${usuario.periodico}</p>
        <p class="linhas" ><strong>Exame Retorno ao Trabalho:</strong> ${usuario.retornoTrabalho}</p>
        <p class="linhas" ><strong>Exame Mudança de Função:</strong> ${usuario.mudancaFuncao}</p>
        <p class="linhas" ><strong>Função:</strong> ${usuario.funcao}</p>
        <p class="linhas" ><strong>CPF:</strong> ${usuario.cpf}</p>
        <p class="linhas" ><strong>Matrícula:</strong> ${usuario.matricula}</p>
        <p class="linhas" ><strong>Telefone:</strong> ${usuario.telefone}</p>
        <p class="linhas" ><strong>Sexo:</strong> ${usuario.sexo}</p>
        <p class="linhas" ><strong>Deficiente:</strong> ${usuario.deficiencia}</p>
        <p class="linhas" ><strong>Tipo de Deficiência:</strong> ${usuario.tipoDeficiencia}</p>
        <p class="linhas" ><strong>Acidente de Trabalho:</strong> ${usuario.acidenteTrabalho}</p>
        <p class="linhas" ><strong>Doença Ocupacional:</strong> ${usuario.doencaOcupacional}</p>
        <p class="linhas" ><strong>Afastamento Pelo INSS:</strong> ${usuario.afastamentoInss}</p>

        <p class="linhas" ><strong>No momento está em tratamento médico:</strong> ${usuario.tratamentoMedico}</p>
        <p class="linhas" ><strong>Faz uso de alguma medicação continua:</strong> ${usuario.medicamentoContinuo}</p>
        <p class="linhas" ><strong>Teve ou tem alguma doença:</strong> ${usuario.algumaDoenca}</p>
        <p class="linhas" ><strong>Sofre alguma doença do coração:</strong> ${usuario.doencaCoracao}</p>
        <p class="linhas" ><strong>Sente falta de ar com frequència:</strong> ${usuario.faltaAr}</p>
        <p class="linhas" ><strong>Costuma te os pés ou pernas inchadas:</strong> ${usuario.pernasInchadas}</p>
        <p class="linhas" ><strong>Você é alérgico:</strong> ${usuario.alergico}</p>
        <p class="linhas" ><strong>Você é diabético:</strong> ${usuario.diabetico}</p>
        <p class="linhas" ><strong>Alguma vez precisou de transfusão de Sangue:</strong> ${usuario.transfusaoSangue}</p>
        <p class="linhas" ><strong>Você já foi submetido a algum procedimento cirúrgico:</strong> ${usuario.cirugia}</p>
        <p class="linhas" ><strong>Já teve fratura:</strong> ${usuario.fratura}</p>
          <p class="linhas" ><strong>Pratica atividade fisica:</strong> ${usuario.atividadeFisica}</p>
            <p class="linhas" ><strong>Você fuma:</strong> ${usuario.fuma}</p>
              <p class="linhas" ><strong>Consome bebida alcóolica:</strong> ${usuario.bebida}</p>
                <p class="linhas" ><strong>Você já comsumiu ou faz uso de drogas:</strong> ${usuario.drogas}</p>
                  <p class="linhas" ><strong>Tem ou teve transtorno mental:</strong> ${usuario.transtornoMental}</p>
                  <p class="linhas" ><strong>Anotações:</strong> ${usuario.anotacao}</p>
                  <p class="linhas" ><strong>Conclusão:</strong> ${usuario.conclusao}</p>



        <p class="linhas" ><strong>Data do Atendimento:</strong> ${formatarData(usuario.dataAtendimento)}</p>
      </div>
      `;
      });
    })
    .catch(() => {
      alert('Usuário não cadastrado ou não encontrado!');
      // document.getElementById('alerta').innerText =
      //   'Usuário não cadastrado ou não encontrado!';
    });
}

buscarUsuario.addEventListener('click', buscarUsuarios);

function limparInputs() {
  document.getElementById('buscar-cpf').value = '';
}
buscarUsuario.addEventListener('click', limparInputs);

const divLista = document.getElementById('div-lista');
const limparLista = document.getElementById('limpar-lista');

function limparDados() {
  alert('Tem certeza que deseja limpar os dados?');
  resultado.innerHTML = '';
}

limparLista.addEventListener('click', limparDados);
