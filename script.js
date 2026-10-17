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
const produtos = [
  {
    id: "A001",
    nome: "Anel de Coração",
    categoria: "Anéis",
    preco: 30.00,
    descricao: "Anel em aço inox com banho dourado e detalhe de coração. Delicado, resistente e cheio de charme.",
    descricaoCurta: "Anel com coração dourado em aço inox",
    imagem: "imagens/Anel-coracao.png",
    tamanhos: ["13", "16", "28", "30",]
  },

  
  {
    id: "A002",
    nome: "Anel de Coração Unico",
    categoria: "Anéis",
    preco: 30.00,
    descricao: "Anel delicado em aço inoxidável com banho dourado, destaque para o detalhe de um coração sólido.",
    descricaoCurta: "Anel com coração único, dourado em aço inox",
    imagem: "imagens/aneldecoracaounico.jpg",
    tamanhos: ["13","22", "25",]
  },
  {
    id: "A003",
    nome: "Anel Solitário Coração",
    categoria: "Anéis",
    preco: 35.00,
    descricao: "Delicado e romântico, este lindo anel dourado possui uma pedra brilhante em formato de coração, trazendo charme e elegância para qualquer ocasião. Perfeito para presentear alguém especial!",
    descricaoCurta: "Anel com coração único, dourado em aço inox com um detalhe de uma pedra",
    imagem: "imagens/anel-solitario-com-pedra.png",
    tamanhos: ["13", "25",]
  },
   {
    id: "A004",
    nome: "Anel Aparador Dourado com Pedras",
    categoria: "Anéis",
    preco: 35.00,
    descricao: "Delicado, elegante e cheio de charme! Este lindo anel dourado possui uma fileira de pedrinhas brilhantes que proporcionam um toque de sofisticação e romantismo. Perfeito para usar sozinho ou combinar com outras alianças, valorizando qualquer look e ocasião. ",
    descricaoCurta: "Anel com coração único, dourado em aço inox com um detalhe de uma pedra",
    imagem: "imagens/anel-aparador.png",
    tamanhos: ["12", "14","20",]
  },
  {
    id: "A005",
    nome: "Anel Sinete Dourado",
    categoria: "Anéis",
    preco: 30.00,
    descricao: "Moderno, elegante e cheio de personalidade! Este lindo anel sinete dourado possui um design liso com acabamento sofisticado, perfeito para quem busca uma joia minimalista e marcante. Ideal para usar sozinho ou combinar com outros acessórios, trazendo charme e estilo para qualquer look.",
    descricaoCurta: "Anel sinete dourado em estilo minimalista, feito em aço Inox com design liso e elegante, perfeito para complementar qualquer look.",
    imagem: "imagens/anel-sinete.png",
    tamanhos: ["13", "16",]
  },
  {
    id: "A006",
    nome: "Anel Vasado Dourado com Pedras",
    categoria: "Anéis",
    preco: 35.00,
    descricao: "Delicada e elegante, esta linda aliança dourada possui detalhes vazados e uma fileira de pedrinhas brilhantes, trazendo charme e sofisticação na medida certa. Perfeita para complementar seu visual com um toque romântico e delicado.",
    descricaoCurta: "Aliança dourada com detalhes vazados e pedrinhas brilhantes, delicada e cheia de charme para qualquer ocasião.",
    imagem: "imagens/anel-vasado-com-pedras.png",
    tamanhos: ["13",]
  }
];

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
function criarCartao(produto) {
  const item = document.createElement("article");
  item.className = "produto-lista";

  item.innerHTML = `
    <div class="produto-lista-imagem">
      <img src="${produto.imagem}" alt="${produto.nome}" loading="lazy">
    </div>

    <div class="produto-lista-info">
      <span class="categoria">${produto.categoria}</span>
      <h3>${produto.nome}</h3>
      <p class="descricao">${produto.descricaoCurta || produto.descricao || ""}</p>
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

function mostrarProdutos(categoria = "Todas") {
  const grade = document.getElementById("produtos");
  if (!grade) return;

  grade.replaceChildren();

  const lista = categoria === "Todas"
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
      <img src="${item.imagem}" alt="${item.nome}">
      <div class="carrinho-item-info">
        <h4>${item.nome}</h4>
        <p>${item.quantidade}x ${formatarPreco(item.preco)}</p>
        <button class="carrinho-item-remover" data-id="${item.id}">Remover</button>
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
  document.querySelectorAll(".logo").forEach(el => {
    el.textContent = CONFIG.marca;
  });

  const ano = document.getElementById("ano");
  if (ano) ano.textContent = new Date().getFullYear();

  // Produtos (só se existir a div)
  if (document.getElementById("produtos")) {
    mostrarProdutos();
  }

  // FAQ (só se existir)
  if (document.getElementById("faq")) {
    renderizarFAQ();
  }

  atualizarCarrinho();
}

iniciar();