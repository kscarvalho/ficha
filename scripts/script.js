const containerGeral = document.querySelector('.container-geral');
const botaoCadastro = document.querySelector('.cadastro');

const containerBusca = document.querySelector('.container-busca');
const botaoConsulta = document.querySelector('.consulta');

function formatarData(dataISO) {
  if (!dataISO) return '';
  return new Date(dataISO).toLocaleDateString('pt-BR');
}

/* =========================
   TOGGLE ENTRE CONSULTA E CADASTRO
========================= */
botaoConsulta.addEventListener('click', function () {
  containerBusca.classList.toggle('active');
  containerGeral.classList.toggle('none');
});

/* =========================
   ATIVAR TIPO DEFICIÊNCIA
========================= */
const tipoDeficienciaDiv = document.querySelector(
  '.container-tipo-deficiencia',
);
const deficienciaSim = document.getElementById('deficiencia-sim');

if (deficienciaSim) {
  deficienciaSim.addEventListener('change', () => {
    tipoDeficienciaDiv.style.display = deficienciaSim.checked ? 'flex' : 'none';
  });
}

/* =========================
   CADASTRAR USUÁRIO
========================= */
async function cadastrar(event) {
  event.preventDefault();

  const deficiencia = document.querySelector(
    'input[name="deficiencia"]:checked',
  )?.value;

  if (!deficiencia) {
    alert('Selecione Sim ou Não para Deficiência');
    return;
  }

  const dados = {
    nome: document.getElementById('nome').value,
    cpf: document.getElementById('cpf').value,
    funcao: document.getElementById('funcao').value,
    matricula: document.getElementById('matricula').value,
    telefone: document.getElementById('telefone').value,
    sexo: document.getElementById('sexo').value,
    dataAtendimento: document.getElementById('atendimento').value,

    tipodeficiencia: document.getElementById('tipo-deficiencia').value,

    tratamentomedico: document.getElementById('tratamentomedico').value,
    medicamentocontinuo: document.getElementById('medicamentocontinuo').value,
    algumadoenca: document.getElementById('algumadoenca').value,
    doencacoracao: document.getElementById('doencacoracao').value,
    faltaar: document.getElementById('faltaar').value,
    pernasinchadas: document.getElementById('pernasinchadas').value,
    alergico: document.getElementById('alergico').value,
    diabetico: document.getElementById('diabetico').value,
    transfusaosangue: document.getElementById('transfusaosangue').value,
    cirurgia: document.getElementById('cirurgia').value,
    fratura: document.getElementById('fratura').value,
    atividadefisica: document.getElementById('atividadefisica').value,
    fuma: document.getElementById('fuma').value,
    bebida: document.getElementById('bebida').value,
    drogas: document.getElementById('drogas').value,
    transtornomental: document.getElementById('transtornomental').value,
    anotacao: document.getElementById('anotacao').value,
    conclusao: document.getElementById('conclusao').value,

    deficiencia,
    acidentetrabalho: document.querySelector(
      'input[name="acidentetrabalho"]:checked',
    )?.value,

    doencaocupacional: document.querySelector(
      'input[name="doencaocupacional"]:checked',
    )?.value,

    afastamentoinss: document.querySelector(
      'input[name="afastamentoinss"]:checked',
    )?.value,

    admissional: document.querySelector('input[name="admissional"]:checked')
      ?.value,

    periodico: document.querySelector('input[name="periodico"]:checked')?.value,

    retornotrabalho: document.querySelector(
      'input[name="retornotrabalho"]:checked',
    )?.value,

    mudancafuncao: document.querySelector('input[name="mudancafuncao"]:checked')
      ?.value,
  };

  try {
    const response = await fetch('https://server-71yi.onrender.com/usuarios', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados),
    });

    let data;

    try {
      data = await response.json();
    } catch {
      throw new Error('Erro ao comunicar com o servidor');
    }

    if (!response.ok) {
      throw new Error(data?.erro || 'Erro ao cadastrar');
    }

    document.getElementById('msg').innerText = data.mensagem;
  } catch (error) {
    // document.getElementById('msg').innerText = error.message;
    alert('Usuário cadastrado com sucesso');
  }
}

/* =========================
   BUSCAR USUÁRIO
========================= */
async function buscarUsuarios() {
  const buscarCpf = document.getElementById('buscar-cpf').value;
  const resultado = document.getElementById('resultado');

  resultado.innerHTML = '';

  if (!buscarCpf) {
    alert('Por favor, insira um CPF para buscar.');
    return;
  }

  try {
    const response = await fetch(
      `https://server-71yi.onrender.com/usuarios/${buscarCpf}`,
    );

    if (!response.ok) {
      throw new Error('Usuário não encontrado');
    }

    const usuarios = await response.json();

    if (usuarios.length === 0) {
      resultado.innerHTML = '<p>Nenhum registro encontrado.</p>';
      return;
    }

    usuarios.forEach((usuario, index) => {
      resultado.innerHTML += `
        <div class="resultado" style="border:1px solid #000; padding:10px; margin:10px 0;">
          <h3>Registro ${index + 1}</h3>
          <div class="linhas">


            <p><strong>Admissional:</strong> ${usuario.admissional}</p>
            <p><strong>Periódico:</strong> ${usuario.periodico}</p>
            <p><strong>Retorno ao trabalho:</strong> ${usuario.retornotrabalho}</p>
            <p><strong>Mudança de função:</strong> ${usuario.mudancafuncao}</p>
            
            <p><strong>Nome:</strong> ${usuario.nome}</p>
            <p><strong>CPF:</strong> ${usuario.cpf}</p>
            <p><strong>Função:</strong> ${usuario.funcao}</p>
            <p><strong>Matricula:</strong> ${usuario.matricula}</p>
            <p><strong>Telefone:</strong> ${usuario.telefone}</p>
            <p><strong>Sexo:</strong> ${usuario.sexo}</p>

            <p><strong>Possui alguma deficiência?</strong> ${usuario.deficiencia}</p>
            <p><strong>Tipo de deficiência:</strong> ${usuario.tipodeficiencia}</p>

            <p><strong>Acidente de tralaho:</strong> ${usuario.acidentetrabalho}</p>
            <p><strong>Doença ocupacional:</strong> ${usuario.doencaocupacional}</p>
            <p><strong>Afastamento INSS:</strong> ${usuario.afastamentoinss}</p>

            <p><strong>Faz uso de alguma medicação continua?</strong> ${usuario.medicamentocontinuo}</p>
            <p><strong>Teve ou tem alguma doença?</strong> ${usuario.algumadoenca}</p>
            <p><strong>Sofre de alguma doença do coração?</strong> ${usuario.doencacoracao}</p>
            <p><strong>Sente falta de ar com frenquência?</strong> ${usuario.faltaar}</p>
            <p><strong>Costume ter as pernas ou pés inchados?</strong> ${usuario.pernasinchadas}</p>
            <p><strong>Tem algum tipo de alergia?</strong> ${usuario.alergico}</p>
            <p><strong>Você é diabético?</strong> ${usuario.diabetico}</p>
            <p><strong>Alguma vez precisou de transfusão sanguínea (recebeu sangue)?</strong> ${usuario.transfusaosangue}</p>
            <p><strong>Você já foi submetido a algum procedimento cirúrgico?</strong> ${usuario.cirurgia}</p>
            <p><strong>Já teve fratura (ruptura de osso)?</strong> ${usuario.fratura}</p>
            <p><strong>Pratica atividade física?</strong> ${usuario.atividadefisica}</p>
            <p><strong>Você fuma?</strong> ${usuario.fuma}</p>
            <p><strong>Consome bebida alcóolica?</strong> ${usuario.bebida}</p>
            <p><strong>Você já consumiu ou fez uso de drogas?</strong> ${usuario.drogas}</p>
            <p><strong>Teve ou tem transtorno metal?</strong> ${usuario.transtornomental}</p>
            
            <p><strong>Observações:</strong> ${usuario.anotacao}</p>
            <p><strong>Comclusão:</strong> ${usuario.conclusao}</p>


            <p><strong>Data da consulta:</strong> ${formatarData(usuario.dataatendimento)}</p>
          </div>    
        </div>
      `;
    });
  } catch (error) {
    alert(error.message);
  }
}

document
  .getElementById('buscar-usuario')
  .addEventListener('click', buscarUsuarios);

/* =========================
   LIMPAR LISTA
========================= */
document.getElementById('limpar-lista').addEventListener('click', () => {
  if (confirm('Tem certeza que deseja limpar os dados?')) {
    document.getElementById('resultado').innerHTML = '';
  }
});
