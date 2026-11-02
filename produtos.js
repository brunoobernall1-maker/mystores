// ============================================
// 🛍️ EDITE AQUI SEUS PRODUTOS
// ============================================
// Campos:
//   nome      → nome exibido no card
//   categoria → define os filtros automaticamente
//   descricao → descrição curta (tipo de perfume)
//   preco     → apenas números (ex: 289.90)
//   imagem    → link ou "imagens/foto.jpg"
// ============================================

const produtos = [
  {
    nome: "Queen of Arabia",
    categoria: "Decants",
    descricao: "Lataffa · Feminino · 2ml",
    preco: 34.90,
    imagem: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&q=80"
  },
  {
    nome: "Delina",
    categoria: "Decants",
    descricao: "Parfums de Marly · Feminino · 5ml",
    preco: 110.90,
    imagem: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=600&q=80"
  },
  {
    nome: "Atheeri",
    categoria: "Decants",
    descricao: "Lataffa · Feminino · 2ml",
    preco: 34.90,
    imagem: "https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=600&q=80"
  },
  {
    nome: "Miss Dior Blooming",
    categoria: "Designer",
    descricao: "Dior · Feminino · 2ml",
    preco: 46.90,
    imagem: "https://images.unsplash.com/photo-1610461888750-10bfc601b874?w=600&q=80"
  },
  {
    nome: "La Bomba",
    categoria: "Designer",
    descricao: "Carolina Herrera · Feminino · 2ml",
    preco: 50.90,
    imagem: "https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=600&q=80"
  },
  {
    nome: "Oud Royal",
    categoria: "Árabes",
    descricao: "Oriental · Masculino · 5ml",
    preco: 89.90,
    imagem: "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?w=600&q=80"
  },
  {
    nome: "Ameerat Al Arab",
    categoria: "Árabes",
    descricao: "Asdaaf · Feminino · 2ml",
    preco: 25.90,
    imagem: "https://images.unsplash.com/photo-1557170334-a9632e77c6e4?w=600&q=80"
  },
  {
    nome: "Erba Pura",
    categoria: "Alta Perfumaria",
    descricao: "Xerjoff · Unissex · 5ml",
    preco: 90.90,
    imagem: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600&q=80"
  },
  {
    nome: "Delilah Blanc",
    categoria: "Alta Perfumaria",
    descricao: "Maison Alhambra · Feminino · 2ml",
    preco: 25.90,
    imagem: "https://images.unsplash.com/photo-1602874801006-e26c4c5b5e8a?w=600&q=80"
  },
  {
    nome: "Kit Presente Luxo",
    categoria: "Kits",
    descricao: "Perfume + Hidratante + Bolsa",
    preco: 399.90,
    imagem: "https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?w=600&q=80"
  }
];

// ============================================
// ⚙️ CONFIGURAÇÕES
// ============================================
const CONFIG = {
  // ⚠️ COLOQUE SEU NÚMERO AQUI (só números, com 55+DDD)
  whatsapp: "5511999999999",
  nomeLoja: "Essência Elegante"
};

// ============================================
// 🧠 LÓGICA (não precisa mexer)
// ============================================
let carrinho = [];
let categoriaAtiva = "Todos";
let buscaAtiva = "";

const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);

const fmt = (n) => "R$ " + n.toFixed(2).replace(".", ",");

// ===== NAV (desktop + mobile) =====
function renderNav() {
  const cats = ["Todos", ...new Set(produtos.map(p => p.categoria))];
  const navList = $("#nav-list");
  const mobileList = $("#mobile-menu-list");
  navList.innerHTML = "";
  mobileList.innerHTML = "";

  cats.forEach(cat => {
    // Desktop
    const li = document.createElement("li");
    li.className = "nav-item" + (cat === categoriaAtiva ? " active" : "");
    const btn = document.createElement("button");
    btn.className = "nav-link";
    btn.textContent = cat === "Todos" ? "Início" : cat;
    btn.addEventListener("click", () => {
      categoriaAtiva = cat;
      renderNav();
      renderFiltros();
      renderProdutos();
      document.getElementById("produtos").scrollIntoView({ behavior: "smooth" });
    });
    li.appendChild(btn);
    navList.appendChild(li);

    // Mobile
    const mBtn = document.createElement("button");
    mBtn.textContent = cat === "Todos" ? "Início" : cat;
    mBtn.addEventListener("click", () => {
      categoriaAtiva = cat;
      renderNav();
      renderFiltros();
      renderProdutos();
      fecharMenuMobile();
      document.getElementById("produtos").scrollIntoView({ behavior: "smooth" });
    });
    mobileList.appendChild(mBtn);
  });
}

// ===== FILTROS =====
function renderFiltros() {
  const cats = ["Todos", ...new Set(produtos.map(p => p.categoria))];
  const el = $("#filters");
  el.innerHTML = "";
  cats.forEach(cat => {
    const b = document.createElement("button");
    b.className = "filter-btn" + (cat === categoriaAtiva ? " active" : "");
    b.textContent = cat;
    b.addEventListener("click", () => {
      categoriaAtiva = cat;
      renderNav();
      renderFiltros();
      renderProdutos();
    });
    el.appendChild(b);
  });
}

// ===== PRODUTOS =====
function renderProdutos() {
  const grid = $("#products-grid");
  grid.innerHTML = "";

  let filtrados = produtos;
  if (categoriaAtiva !== "Todos") {
    filtrados = filtrados.filter(p => p.categoria === categoriaAtiva);
  }
  if (buscaAtiva.trim()) {
    const q = buscaAtiva.toLowerCase().trim();
    filtrados = filtrados.filter(p =>
      p.nome.toLowerCase().includes(q) ||
      p.descricao.toLowerCase().includes(q) ||
      p.categoria.toLowerCase().includes(q)
    );
  }

  if (filtrados.length === 0) {
    grid.innerHTML = `<p style="grid-column:1/-1;text-align:center;color:#888;padding:50px;">Nenhum produto encontrado.</p>`;
    return;
  }

  filtrados.forEach(prod => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img class="product-image" src="${prod.imagem}" alt="${prod.nome}" loading="lazy">
      <div class="product-info">
        <div class="product-cat">${prod.categoria}</div>
        <div class="product-name">${prod.nome}</div>
        <div class="product-desc">${prod.descricao}</div>
        <div class="product-price">${fmt(prod.preco)}</div>
        <button class="add-btn">Adicionar</button>
      </div>
    `;
    grid.appendChild(card);

    const b = card.querySelector(".add-btn");
    b.addEventListener("click", () => {
      adicionar(prod);
      b.textContent = "Adicionado ✓";
      b.style.background = "var(--rose)";
      b.style.color = "#fff";
      b.style.borderColor = "var(--rose)";
      setTimeout(() => {
        b.textContent = "Adicionar";
        b.style.background = "transparent";
        b.style.color = "var(--brown)";
        b.style.borderColor = "var(--brown)";
      }, 900);
    });
  });
}

// ===== CARRINHO =====
function adicionar(produto) {
  const exist = carrinho.find(i => i.nome === produto.nome);
  if (exist) exist.quantidade++;
  else carrinho.push({ ...produto, quantidade: 1 });
  renderCarrinho();
  abrirCarrinho();
}

function alterarQtd(nome, delta) {
  const item = carrinho.find(i => i.nome === nome);
  if (!item) return;
  item.quantidade += delta;
  if (item.quantidade <= 0) carrinho = carrinho.filter(i => i.nome !== nome);
  renderCarrinho();
}

function remover(nome) {
  carrinho = carrinho.filter(i => i.nome !== nome);
  renderCarrinho();
}

function total() {
  return carrinho.reduce((s, i) => s + i.preco * i.quantidade, 0);
}

function renderCarrinho() {
  const qtdTotal = carrinho.reduce((s, i) => s + i.quantidade, 0);
  $("#cart-badge").textContent = qtdTotal;

  const box = $("#cart-items");
  const btnW = $("#finalizar-whatsapp");

  if (carrinho.length === 0) {
    box.innerHTML = '<div class="cart-empty">Seu carrinho está vazio.<br>Adicione produtos para começar ✨</div>';
    btnW.disabled = true;
  } else {
    box.innerHTML = "";
    carrinho.forEach(item => {
      const el = document.createElement("div");
      el.className = "cart-item";
      el.innerHTML = `
        <img src="${item.imagem}" alt="${item.nome}">
        <div class="cart-item-info">
          <div class="cart-item-name">${item.nome}</div>
          <div class="cart-item-price">${fmt(item.preco)}</div>
          <div class="cart-controls">
            <button class="qty-btn" data-menos>−</button>
            <span class="qty-val">${item.quantidade}</span>
            <button class="qty-btn" data-mais>+</button>
            <button class="remove-btn" data-rm><i class="fas fa-trash"></i></button>
          </div>
        </div>
      `;
      box.appendChild(el);
      el.querySelector("[data-menos]").onclick = () => alterarQtd(item.nome, -1);
      el.querySelector("[data-mais]").onclick = () => alterarQtd(item.nome, 1);
      el.querySelector("[data-rm]").onclick = () => remover(item.nome);
    });
    btnW.disabled = false;
  }

  $("#cart-total").textContent = fmt(total());
}

// ===== ABRIR / FECHAR =====
function abrirCarrinho() {
  $("#cart-sidebar").classList.add("open");
  $("#cart-overlay").classList.add("open");
}
function fecharCarrinho() {
  $("#cart-sidebar").classList.remove("open");
  $("#cart-overlay").classList.remove("open");
}
function abrirMenuMobile() {
  $("#mobile-menu").classList.add("open");
}
function fecharMenuMobile() {
  $("#mobile-menu").classList.remove("open");
}

// ===== WHATSAPP =====
function finalizarWhats() {
  if (carrinho.length === 0) return;
  const linhas = carrinho.map(i => `• ${i.quantidade}x ${i.nome} — ${fmt(i.preco * i.quantidade)}`);
  const msg =
    `Olá, *${CONFIG.nomeLoja}*! 👋\n\n` +
    `Gostaria de fazer o seguinte pedido:\n\n` +
    linhas.join("\n") +
    `\n\n*Total: ${fmt(total())}*\n\n` +
    `Aguardo instruções para pagamento e entrega.`;
  window.open(`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`, "_blank");
}

// ===== EVENTOS =====
$("#open-cart").onclick = abrirCarrinho;
$("#close-cart").onclick = fecharCarrinho;
$("#cart-overlay").onclick = fecharCarrinho;
$("#finalizar-whatsapp").onclick = finalizarWhats;
$("#menu-toggle").onclick = abrirMenuMobile;
$("#menu-close").onclick = fecharMenuMobile;

$("#search-input").addEventListener("input", (e) => {
  buscaAtiva = e.target.value;
  renderProdutos();
});

// ===== INIT =====
renderNav();
renderFiltros();
renderProdutos();
renderCarrinho();
