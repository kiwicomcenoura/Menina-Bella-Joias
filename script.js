/* =========================
   CONFIGURAÇÃO DA LOJA
   ========================= */
const CONFIG = {
  marca: "Menina Bella Jóias",
  whatsapp: "5563984737476",   // ← coloque seu número aqui (só números)
  instagram: "menina.bella.joias"        // ← coloque seu @ aqui (sem @)
};

/* =========================
   PRODUTOS
   ========================= */
let produtos = [];

/* =========================
   PERGUNTAS FREQUENTES
   ========================= */
const perguntas = [
  {
    pergunta: "A joia de aço inox descasca?",
    resposta: "A peça que tiver detalhes dourados poderá perder essa cor depois de um longo tempo de uso, mas não escurecerá e nem descascará."
  },
  {
    pergunta: "A joia de aço inox fica preta?",
    resposta: "Não, porque esse tipo de aço é inoxidável, portanto não oxida. Isso significa que ele não fica preto."
  },
  {
    pergunta: "Posso entrar no mar com minhas joias de aço inox?",
    resposta: "Sim, porque o aço inox não sofre alteração em contato com a água salgada. É um material que resiste à salinidade e por isso sua joia não irá enferrujar nem escurecer em contato com o mar."
  },
  {
    pergunta: "Por que minha corrente de aço inox enferrujou?",
    resposta: "Provavelmente sua peça não era de aço inox verdadeiro."
  },
  {
    pergunta: "Por que meu brinco de aço inox me deu alergia?",
    resposta: "Você precisa verificar se realmente comprou um brinco de aço inox e se ele é do tipo antialérgico."
  },
  {
    pergunta: "Qual a diferença entre aço inox e aço cirúrgico?",
    resposta: "O aço cirúrgico é um tipo específico de aço inoxidável com composição ainda mais pura, muito usado em piercings e peças de contato prolongado com a pele. Ambos são resistentes à oxidação, mas o cirúrgico costuma ter maior biocompatibilidade."
  },
  {
    pergunta: "As pedras de cristal colocadas nas joias caem com facilidade?",
    resposta: "Toda peça com pedras deve ser tratada com mais cuidados. Evite impactos fortes e use com atenção para prolongar a vida útil da peça."
  }
];

/* =========================
   ESTADO DO CARRINHO
   ========================= */
let carrinho = [];

/* =========================
   UTILITÁRIOS
   ========================= */
const formatarPreco = valor =>
  valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

function linkWhatsApp(mensagem) {
  const numero = CONFIG.whatsapp.replace(/\D/g, "");
  return `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
}

/* =========================
   RENDERIZAÇÃO DOS PRODUTOS
   ========================= */
function validarProdutos(dados) {
  if (!Array.isArray(dados)) throw new Error("O catálogo deve ser uma lista de produtos.");
  const ids = new Set();
  dados.forEach((produto, indice) => {
    const campos = ["id", "nome", "categoria", "imagem"];
    if (!produto || campos.some(campo => typeof produto[campo] !== "string" || !produto[campo].trim()) ||
        typeof produto.preco !== "number" || !Number.isFinite(produto.preco) || produto.preco < 0 ||
        ["descricao", "descricaoCurta"].some(campo => produto[campo] !== undefined && typeof produto[campo] !== "string") ||
        (produto.tamanhos !== undefined && (!Array.isArray(produto.tamanhos) ||
          produto.tamanhos.some(tamanho => typeof tamanho !== "string" || !tamanho.trim())))) {
      throw new Error(`Produto ${indice + 1}: confira os campos do cadastro.`);
    }
    if (ids.has(produto.id)) throw new Error(`ID duplicado: ${produto.id}`);
    ids.add(produto.id);
  });
  return dados;
}

function renderizarFiltros() {
  const container = document.getElementById("filtros");
  if (!container) return;
  container.replaceChildren();
  const categorias = [...new Set(produtos.map(produto => produto.categoria))];
  [null, ...categorias].forEach(categoria => {
    const botao = document.createElement("button");
    botao.type = "button";
    botao.className = categoria === null ? "filtro ativo" : "filtro";
    botao.dataset.categoria = categoria === null ? "" : categoria;
    botao.textContent = categoria === null ? "Todas" : categoria;
    container.appendChild(botao);
  });
}

function mostrarStatusCatalogo(mensagem, erro = false) {
  const grade = document.getElementById("produtos");
  const texto = document.createElement("p");
  texto.className = "catalogo-status";
  texto.setAttribute("role", erro ? "alert" : "status");
  texto.textContent = mensagem;
  grade.replaceChildren(texto);
}

async function carregarProdutos() {
  const grade = document.getElementById("produtos");
  if (!grade) return;
  grade.setAttribute("aria-busy", "true");
  mostrarStatusCatalogo("Carregando joias...");
  try {
    const resposta = await fetch("produtos.json", { cache: "no-cache" });
    if (!resposta.ok) throw new Error(`Não foi possível carregar o catálogo (HTTP ${resposta.status}).`);
    produtos = validarProdutos(await resposta.json());
    renderizarFiltros();
    mostrarProdutos();
  } catch (erro) {
    console.error("Erro ao carregar produtos.json:", erro);
    mostrarStatusCatalogo("Não foi possível carregar as joias. Tente novamente. Se estiver abrindo o arquivo diretamente, use o Live Server do VS Code.", true);
    const botao = document.createElement("button");
    botao.type = "button";
    botao.className = "botao";
    botao.textContent = "Tentar novamente";
    botao.addEventListener("click", carregarProdutos);
    grade.appendChild(botao);
  } finally {
    grade.setAttribute("aria-busy", "false");
  }
}

function escaparHTML(valor) {
  return String(valor).replace(/[&<>"']/g, caractere => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[caractere]);
}

function criarCartao(produto) {
  const item = document.createElement("article");
  item.className = "produto-lista";

  item.innerHTML = `
    <div class="produto-lista-imagem">
      <img src="${escaparHTML(produto.imagem)}" alt="${escaparHTML(produto.nome)}" loading="lazy">
    </div>

    <div class="produto-lista-info">
      <span class="categoria">${escaparHTML(produto.categoria)}</span>
      <h3>${escaparHTML(produto.nome)}</h3>
      <p class="descricao">${escaparHTML(produto.descricaoCurta || produto.descricao || "")}</p>
    </div>

    <div class="produto-lista-acao">
      <span class="preco">${formatarPreco(produto.preco)}</span>
      <button class="botao botao-adicionar">Adicionar ao carrinho</button>
    </div>
  `;

  item.querySelector(".produto-lista-imagem").addEventListener("click", () => abrirModal(produto));
  item.querySelector("h3").addEventListener("click", () => abrirModal(produto));

  item.querySelector(".botao-adicionar").addEventListener("click", (e) => {
  e.stopPropagation();
  // Se tiver tamanhos, abre o modal. Se não tiver, adiciona direto.
  if (produto.tamanhos && produto.tamanhos.length > 0) {
    abrirModal(produto);
  } else {
    adicionarAoCarrinho(produto);
  }
});

  return item;
}

function mostrarProdutos(categoria = "") {
  const grade = document.getElementById("produtos");
  if (!grade) return;

  grade.replaceChildren();

  const lista = categoria === ""
    ? produtos
    : produtos.filter(p => p.categoria === categoria);

  if (lista.length === 0) {
    grade.innerHTML = `<p style="text-align:center;color:#999;padding:50px 0">Nenhuma joia cadastrada ainda.</p>`;
    return;
  }

  lista.forEach(p => grade.appendChild(criarCartao(p)));
}

/* =========================
   FILTROS
   ========================= */
const filtros = document.getElementById("filtros");
if (filtros) {
  filtros.addEventListener("click", e => {
    const botao = e.target.closest("button[data-categoria]");
    if (!botao) return;

    filtros.querySelectorAll(".filtro").forEach(b => b.classList.toggle("ativo", b === botao));
    mostrarProdutos(botao.dataset.categoria);
  });
}


/* =========================
   MODAL DO PRODUTO
   ========================= */
const modal = document.getElementById("modalProduto");
let produtoAtual = null;
let tamanhoSelecionado = null;

function abrirModal(produto) {
  if (!modal) return;

  produtoAtual = produto;
  tamanhoSelecionado = null;

  document.getElementById("modalImg").src = produto.imagem;
  document.getElementById("modalImg").alt = produto.nome;
  document.getElementById("modalCategoria").textContent = produto.categoria;
  document.getElementById("modalNome").textContent = produto.nome;
  document.getElementById("modalDescricao").textContent = produto.descricao || "Sem descrição.";
  document.getElementById("modalPreco").textContent = formatarPreco(produto.preco);

  const areaTamanhos = document.getElementById("modalTamanhos");
  const listaTamanhos = document.getElementById("listaTamanhos");
  const btnAdicionar = document.getElementById("modalAdicionar");

  listaTamanhos.innerHTML = "";

  if (produto.tamanhos && produto.tamanhos.length > 0) {
    areaTamanhos.hidden = false;
    btnAdicionar.disabled = true;
    btnAdicionar.textContent = "Selecione o tamanho";

    produto.tamanhos.forEach(tam => {
      const botao = document.createElement("button");
      botao.className = "tamanho-btn";
      botao.textContent = tam;

      botao.addEventListener("click", () => {
        listaTamanhos.querySelectorAll(".tamanho-btn").forEach(b => b.classList.remove("selecionado"));
        botao.classList.add("selecionado");
        tamanhoSelecionado = tam;

        btnAdicionar.disabled = false;
        btnAdicionar.textContent = "Adicionar ao carrinho";
      });

      listaTamanhos.appendChild(botao);
    });
  } else {
    areaTamanhos.hidden = true;
    btnAdicionar.disabled = false;
    btnAdicionar.textContent = "Adicionar ao carrinho";
  }

  modal.hidden = false;
  document.body.style.overflow = "hidden";
}

function fecharModal() {
  if (!modal) return;
  modal.hidden = true;
  document.body.style.overflow = "";
  produtoAtual = null;
  tamanhoSelecionado = null;
}

const btnFecharModal = document.getElementById("fecharModal");
const fundoModal = document.getElementById("fecharModalFundo");
const btnModalAdicionar = document.getElementById("modalAdicionar");

if (btnFecharModal) btnFecharModal.addEventListener("click", fecharModal);
if (fundoModal) fundoModal.addEventListener("click", fecharModal);

if (btnModalAdicionar) {
  btnModalAdicionar.addEventListener("click", () => {
    if (!produtoAtual) return;

    if (produtoAtual.tamanhos && produtoAtual.tamanhos.length > 0 && !tamanhoSelecionado) {
      return;
    }

    adicionarAoCarrinho(produtoAtual, tamanhoSelecionado);
    fecharModal();
  });
}

/* =========================
   CARRINHO
   ========================= */
const painel = document.getElementById("carrinhoPainel");
const fundo = document.getElementById("carrinhoFundo");
const contador = document.getElementById("carrinhoContador");
const listaItens = document.getElementById("carrinhoItens");
const totalEl = document.getElementById("carrinhoTotal");
const btnPedido = document.getElementById("fazerPedido");

function abrirCarrinho() {
  if (painel) painel.classList.add("aberto");
  if (fundo) fundo.classList.add("aberto");
  document.body.style.overflow = "hidden";
}

function fecharCarrinho() {
  if (painel) painel.classList.remove("aberto");
  if (fundo) fundo.classList.remove("aberto");
  document.body.style.overflow = "";
}

const btnAbrirCarrinho = document.getElementById("abrirCarrinho");
const btnFecharCarrinho = document.getElementById("fecharCarrinho");

if (btnAbrirCarrinho) btnAbrirCarrinho.addEventListener("click", abrirCarrinho);
if (btnFecharCarrinho) btnFecharCarrinho.addEventListener("click", fecharCarrinho);
if (fundo) fundo.addEventListener("click", fecharCarrinho);

function adicionarAoCarrinho(produto, tamanho = null) {
  const idItem = tamanho ? `${produto.id}-${tamanho}` : produto.id;

  const existente = carrinho.find(item => item.id === idItem);

  if (existente) {
    existente.quantidade += 1;
  } else {
    carrinho.push({
      id: idItem,
      nome: tamanho ? `${produto.nome} (Tam. ${tamanho})` : produto.nome,
      preco: produto.preco,
      imagem: produto.imagem,
      quantidade: 1,
      tamanho: tamanho
    });
  }

  atualizarCarrinho();
  abrirCarrinho();
}

function removerDoCarrinho(id) {
  carrinho = carrinho.filter(item => item.id !== id);
  atualizarCarrinho();
}

function atualizarCarrinho() {
  if (!contador || !listaItens || !totalEl || !btnPedido) return;

  const totalItens = carrinho.reduce((acc, item) => acc + item.quantidade, 0);
  contador.textContent = totalItens;

  if (carrinho.length === 0) {
    listaItens.innerHTML = `<p class="carrinho-vazio">Seu carrinho está vazio</p>`;
    totalEl.textContent = formatarPreco(0);
    btnPedido.disabled = true;
    return;
  }

  listaItens.innerHTML = "";
  let total = 0;

  carrinho.forEach(item => {
    const subtotal = item.preco * item.quantidade;
    total += subtotal;

    const div = document.createElement("div");
    div.className = "carrinho-item";
    div.innerHTML = `
      <img src="${escaparHTML(item.imagem)}" alt="${escaparHTML(item.nome)}">
      <div class="carrinho-item-info">
        <h4>${escaparHTML(item.nome)}</h4>
        <p>${item.quantidade}x ${formatarPreco(item.preco)}</p>
        <button class="carrinho-item-remover" data-id="${escaparHTML(item.id)}">Remover</button>
      </div>
    `;
    listaItens.appendChild(div);
  });

  listaItens.querySelectorAll(".carrinho-item-remover").forEach(btn => {
    btn.addEventListener("click", () => removerDoCarrinho(btn.dataset.id));
  });

  totalEl.textContent = formatarPreco(total);
  btnPedido.disabled = false;
}

if (btnPedido) {
  btnPedido.addEventListener("click", () => {
    if (carrinho.length === 0) return;

    let mensagem = `Olá! Gostaria de fazer o seguinte pedido:\n\n`;

    carrinho.forEach(item => {
      const subtotal = item.preco * item.quantidade;
      mensagem += `• ${item.quantidade}x ${item.nome} (${item.id}) — ${formatarPreco(subtotal)}\n`;
    });

    const total = carrinho.reduce((acc, item) => acc + item.preco * item.quantidade, 0);
    mensagem += `\n*Total: ${formatarPreco(total)}*\n\n`;
    mensagem += `Podemos combinar os detalhes?`;

    window.open(linkWhatsApp(mensagem), "_blank");
  });
}

/* =========================
   FAQ
   ========================= */
function renderizarFAQ() {
  const container = document.getElementById("faq");
  if (!container) return;

  container.innerHTML = "";

  perguntas.forEach((item) => {
    const div = document.createElement("div");
    div.className = "faq-item";
    div.innerHTML = `
      <button class="faq-pergunta">${item.pergunta}</button>
      <div class="faq-resposta"><p>${item.resposta}</p></div>
    `;

    div.querySelector(".faq-pergunta").addEventListener("click", () => {
      div.classList.toggle("aberto");
    });

    container.appendChild(div);
  });
}

/* =========================
   INICIALIZAÇÃO
   ========================= */
function iniciar() {
  const linkInstagram = `https://www.instagram.com/${CONFIG.instagram.replace(/^@/, "")}/`;

  const instaTopo = document.getElementById("instagramTopo");
  const instaGeral = document.getElementById("instagramGeral");
  const whatsGeral = document.getElementById("whatsappGeral");

  if (instaTopo) instaTopo.href = linkInstagram;
  if (instaGeral) instaGeral.href = linkInstagram;

  if (whatsGeral) {
    whatsGeral.href = linkWhatsApp(
      `Olá! Conheci a ${CONFIG.marca} pelo site e gostaria de conhecer as joias.`
    );
  }

  // Atualiza nome da marca
  document.querySelectorAll(".logo, .marca").forEach(el => {
    el.textContent = CONFIG.marca;
  });

  const ano = document.getElementById("ano");
  if (ano) ano.textContent = new Date().getFullYear();

  // Produtos (só se existir a div)
  if (document.getElementById("produtos")) {
    carregarProdutos();
  }

  // FAQ (só se existir)
  if (document.getElementById("faq")) {
    renderizarFAQ();
  }

  atualizarCarrinho();
}

iniciar();
