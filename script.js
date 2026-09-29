const grade = document.getElementById("grade");
const campoBusca = document.getElementById("campoBusca");
const contador = document.getElementById("contador");
const vazio = document.getElementById("vazio");
const termoVazio = document.getElementById("termoVazio");

const paises = {
  "United States": { nome: "Estados Unidos", bandeira: "🇺🇸" },
  "United Kingdom": { nome: "Reino Unido", bandeira: "🇬🇧" },
  "Canada": { nome: "Canadá", bandeira: "🇨🇦" },
  "Belgium": { nome: "Bélgica", bandeira: "🇧🇪" },
  "Chile": { nome: "Chile", bandeira: "🇨🇱" },
  "Ireland": { nome: "Irlanda", bandeira: "🇮🇪" },
  "Israel": { nome: "Israel", bandeira: "🇮🇱" },
  "Korea, Republic of": { nome: "Coreia do Sul", bandeira: "🇰🇷" },
  "New Zealand": { nome: "Nova Zelândia", bandeira: "🇳🇿" },
  "Romania": { nome: "Romênia", bandeira: "🇷🇴" },
  "Spain": { nome: "Espanha", bandeira: "🇪🇸" },
};

// Remove acentos e padroniza em minúsculas para uma busca mais tolerante
function normalizar(texto) {
  return texto.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();
}

function formatarData(iso) {
  if (!iso) return "Não informada";
  const [ano, mes, dia] = iso.split("-").map(Number);
  return new Date(ano, mes - 1, dia).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function calcularIdade(iso) {
  if (!iso) return null;
  const [ano, mes, dia] = iso.split("-").map(Number);
  const hoje = new Date();
  let idade = hoje.getFullYear() - ano;
  if (hoje.getMonth() + 1 < mes || (hoje.getMonth() + 1 === mes && hoje.getDate() < dia)) idade--;
  return idade;
}

function iniciais(nome) {
  return nome.split(" ").filter(Boolean).slice(0, 2).map((p) => p[0]).join("").toUpperCase();
}

function escapar(texto) {
  const div = document.createElement("div");
  div.textContent = texto;
  return div.innerHTML;
}

// Destaca o trecho do nome que corresponde à busca
function destacar(nome, termo) {
  if (!termo) return escapar(nome);
  const inicio = normalizar(nome).indexOf(termo);
  if (inicio === -1) return escapar(nome);
  const fim = inicio + termo.length;
  return escapar(nome.slice(0, inicio)) + "<mark>" + escapar(nome.slice(inicio, fim)) + "</mark>" + escapar(nome.slice(fim));
}

function criarCard(ator, termo, indice) {
  const pais = paises[ator.pais] || { nome: ator.pais || "Não informado", bandeira: "🌐" };
  const idade = calcularIdade(ator.nascimento);

  const card = document.createElement("article");
  card.className = "card";
  card.style.setProperty("--atraso", `${Math.min(indice, 16) * 35}ms`);

  card.innerHTML = `
    <div class="card-foto" data-iniciais="${iniciais(ator.nome)}">
      ${ator.foto ? `<img src="${ator.foto}" alt="Foto de ${escapar(ator.nome)}" loading="lazy">` : ""}
      ${idade !== null ? `<span class="card-idade">${idade} anos</span>` : ""}
    </div>
    <div class="card-corpo">
      <h3 class="card-nome">${destacar(ator.nome, termo)}</h3>
      <dl class="card-dados">
        <div>
          <dt>País</dt>
          <dd><span class="bandeira" aria-hidden="true">${pais.bandeira}</span>${escapar(pais.nome)}</dd>
        </div>
        <div>
          <dt>Nascimento</dt>
          <dd>${formatarData(ator.nascimento)}</dd>
        </div>
      </dl>
    </div>
  `;

  const img = card.querySelector("img");
  if (img) {
    img.addEventListener("load", () => img.classList.add("carregada"));
    img.addEventListener("error", () => img.remove());
  }

  return card;
}

function renderizar(lista, termo = "") {
  grade.innerHTML = "";
  lista.forEach((ator, i) => grade.appendChild(criarCard(ator, termo, i)));

  const total = atores.length;
  contador.innerHTML = termo
    ? `<strong>${lista.length}</strong> de ${total} atores e atrizes`
    : `<strong>${total}</strong> atores e atrizes`;

  vazio.hidden = lista.length > 0;
  if (!lista.length) termoVazio.textContent = `“${campoBusca.value.trim()}”`;
}

function filtrarAtores() {
  const termo = normalizar(campoBusca.value);
  const filtrados = atores.filter((ator) => normalizar(ator.nome).includes(termo));
  renderizar(filtrados, termo);
}

function limparBusca() {
  campoBusca.value = "";
  filtrarAtores();
  campoBusca.focus();
}

// Atalhos: "/" foca a busca, "Esc" limpa
document.addEventListener("keydown", (e) => {
  if (e.key === "/" && document.activeElement !== campoBusca) {
    e.preventDefault();
    campoBusca.focus();
  } else if (e.key === "Escape" && document.activeElement === campoBusca) {
    limparBusca();
  }
});

renderizar(atores);
