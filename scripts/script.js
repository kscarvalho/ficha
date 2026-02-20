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
    funcao: document.getElementById('funcao').value,
    cpf: document.getElementById('cpf').value,
    matricula: document.getElementById('matricula').value,
    telefone: document.getElementById('telefone').value,
    sexo: document.getElementById('sexo').value,
    dataAtendimento: document.getElementById('atendimento').value,
    tipoDeficiencia: document.getElementById('tipo-deficiencia').value,
    tratamentoMedico: document.getElementById('tratamentoMedico').value,
    medicamentoContinuo: document.getElementById('medicamentoContinuo').value,
    algumaDoenca: document.getElementById('algumaDoenca').value,
    doencaCoracao: document.getElementById('doencaCoracao').value,
    faltaAr: document.getElementById('faltaAr').value,
    pernasInchadas: document.getElementById('pernasInchadas').value,
    alergico: document.getElementById('alergico').value,
    diabetico: document.getElementById('diabetico').value,
    transfusaoSangue: document.getElementById('transfusaoSangue').value,
    cirugia: document.getElementById('cirurgia').value,
    fratura: document.getElementById('fratura').value,
    atividadeFisica: document.getElementById('atividadeFisica').value,
    fuma: document.getElementById('fuma').value,
    bebida: document.getElementById('bebida').value,
    drogas: document.getElementById('drogas').value,
    transtornoMental: document.getElementById('transtornoMental').value,
    anotacao: document.getElementById('anotacao').value,
    conclusao: document.getElementById('conclusao').value,
    deficiencia,
    acidenteTrabalho: document.querySelector(
      'input[name="acidenteTrabalho"]:checked',
    )?.value,
    doencaOcupacional: document.querySelector(
      'input[name="doencaOcupacional"]:checked',
    )?.value,
    afastamentoInss: document.querySelector(
      'input[name="afastamentoInss"]:checked',
    )?.value,
    admissional: document.querySelector('input[name="admissional"]:checked')
      ?.value,
    periodico: document.querySelector('input[name="periodico"]:checked')?.value,
    retornoTrabalho: document.querySelector(
      'input[name="retornoTrabalho"]:checked',
    )?.value,
    mudancaFuncao: document.querySelector('input[name="mudancaFuncao"]:checked')
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
    document.getElementById('msg').innerText = error.message;
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
        <div style="border:1px solid #000; padding:10px; margin:10px 0;">
          <h3>Registro ${index + 1}</h3>
          <p><strong>Nome:</strong> ${usuario.nome}</p>
          <p><strong>CPF:</strong> ${usuario.cpf}</p>
          <p><strong>Função:</strong> ${usuario.funcao}</p>
          <p><strong>Data do Atendimento:</strong> ${formatarData(
            usuario.dataAtendimento,
          )}</p>
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
