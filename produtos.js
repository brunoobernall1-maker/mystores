// ============================================
// 🛍️ PRODUTOS - PRISÉ PERFUMES E COSMÉTICOS
// ============================================
// IMPORTANTE: Salve as fotos dos produtos na pasta "imagens/"
// com os nomes exatos indicados abaixo (ex: light-blue.jpg).

const produtos = [
  // ===== PERFUMES FEMININOS =====
  {
    nome: "Dolce & Gabbana Light Blue",
    categoria: "Femininos",
    descricao: "Eau de Parfum · 100 ml",
    preco: 299.90,
    imagem: "imagens/light-blue.jpg" // 👈 Coloque a foto correspondente aqui
  },
  {
    nome: "Carolina Herrera 212 VIP Rosé",
    categoria: "Femininos",
    descricao: "Eau de Parfum · 50 ml",
    preco: 349.90,
    imagem: "imagens/212-vip-rose.jpg"
  },
  {
    nome: "Dolce & Gabbana Devotion",
    categoria: "Femininos",
    descricao: "Eau de Parfum · 50 ml",
    preco: 389.90,
    imagem: "imagens/devotion.jpg"
  },
  {
    nome: "Narciso Rodriguez For Her",
    categoria: "Femininos",
    descricao: "Eau de Toilette · 50 ml",
    preco: 329.90,
    imagem: "imagens/for-her.jpg"
  },
  {
    nome: "Moschino I Love Love",
    categoria: "Femininos",
    descricao: "Eau de Toilette · 100 ml",
    preco: 259.90,
    imagem: "imagens/i-love-love.jpg"
  },

  // ===== PERFUMES MASCULINOS =====
  {
    nome: "Dior Sauvage",
    categoria: "Masculinos",
    descricao: "Eau de Parfum · 60 ml",
    preco: 459.90,
    imagem: "imagens/sauvage.jpg"
  },
  {
    nome: "Jean Paul Gaultier Le Male",
    categoria: "Masculinos",
    descricao: "Eau de Toilette · 75 ml",
    preco: 379.90,
    imagem: "imagens/le-male.jpg"
  },
  {
    nome: "Paco Rabanne 1 Million",
    categoria: "Masculinos",
    descricao: "Eau de Toilette · 100 ml",
    preco: 349.90,
    imagem: "imagens/1-million.jpg"
  },
  {
    nome: "Animale For Men",
    categoria: "Masculinos",
    descricao: "Eau de Toilette · 100 ml",
    preco: 189.90,
    imagem: "imagens/animale.jpg"
  },
  {
    nome: "Calvin Klein CK One",
    categoria: "Masculinos",
    descricao: "Eau de Toilette · 100 ml",
    preco: 249.90,
    imagem: "imagens/ck-one.jpg"
  },

  // ===== BODY SPLASHES =====
  {
    nome: "Victoria's Secret Velvet Petals",
    categoria: "Body Splash",
    descricao: "Body Splash · 250 ml",
    preco: 129.90,
    imagem: "imagens/velvet-petals.jpg"
  },
  {
    nome: "Victoria's Secret Bare Vanilla",
    categoria: "Body Splash",
    descricao: "Body Splash · 250 ml",
    preco: 129.90,
    imagem: "imagens/bare-vanilla.jpg"
  },
  {
    nome: "Victoria's Secret Midnight Bloom",
    categoria: "Body Splash",
    descricao: "Body Splash · 250 ml",
    preco: 129.90,
    imagem: "imagens/midnight-bloom.jpg"
  },

  // ===== LOÇÃO CORPORAL =====
  {
    nome: "Mugler Angel",
    categoria: "Loção Corporal",
    descricao: "Loção Corporal · 200 ml",
    preco: 219.90,
    imagem: "imagens/mugler-angel.jpg"
  },
  {
    nome: "Paco Rabanne Lady Million",
    categoria: "Loção Corporal",
    descricao: "Loção Corporal · 200 ml",
    preco: 189.90,
    imagem: "imagens/lady-million.jpg"
  },

  // ===== GEL CORPORAL =====
  {
    nome: "Hot Flowers Blow Girl",
    categoria: "Gel Corporal",
    descricao: "Gel Corporal · 320 ml",
    preco: 89.90,
    imagem: "imagens/blow-girl.jpg"
  }
];

// ============================================
// ⚙️ CONFIGURAÇÕES GERAIS
// ============================================
const CONFIG = {
  // ⚠️ COLOQUE SEU NÚMERO AQUI (com 55 + DDD)
  whatsapp: "5547984430089",
  nomeLoja: "PRISÉ Perfumes e Cosméticos"
};

// ============================================
// 🧠 LÓGICA (NÃO PRECISA MEXER DAQUI PARA BAIXO)
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
  if(!navList || !mobileList) return;
  
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
      if(typeof fecharMenuMobile === 'function') fecharMenuMobile();
      document.getElementById("produtos").scrollIntoView({ behavior: "smooth" });
    });
    mobileList.appendChild(mBtn);
  });
}

// ===== FILTROS =====
function renderFiltros() {
  const cats = ["Todos", ...new Set(produtos.map(p => p.categoria))];
  const el = $("#filters");
  if(!el) return;
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
  if(!grid) return;
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
      <img class="product-image" src="${prod.imagem}" alt="${prod.nome}" loading="lazy" onerror="this.src='https://via.placeholder.com/400x400?text=Sem+Foto'">
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
  if(typeof abrirCarrinho === 'function') abrirCarrinho();
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
  const badge = $("#cart-badge");
  if(badge) badge.textContent = qtdTotal;

  const box = $("#cart-items");
  const btnW = $("#finalizar-whatsapp");
  if(!box || !btnW) return;

  if (carrinho.length === 0) {
    box.innerHTML = '<div class="cart-empty">Seu carrinho está vazio.<br>Adicione produtos para começar ✨</div>';
    btnW.disabled = true;
  } else {
    box.innerHTML = "";
    carrinho.forEach(item => {
      const el = document.createElement("div");
      el.className = "cart-item";
      el.innerHTML = `
        <img src="${item.imagem}" alt="${item.nome}" onerror="this.src='https://via.placeholder.com/100x120?text=Foto'">
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

  const totalEl = $("#cart-total");
  if(totalEl) totalEl.textContent = fmt(total());
}

// ===== WHATSAPP =====
function finalizarWhats() {
  if (carrinho.length === 0) return;
  const linhas = carrinho.map(i => `• ${i.quantidade}x ${i.nome} — ${fmt(i.preco * i.quantidade)}`);
  
  // AQUI ESTÁ A MENSAGEM COM O NOME DA LOJA
  const msg =
    `Olá, *${CONFIG.nomeLoja}*! ✨\n\n` +
    `Gostaria de fazer o seguinte pedido:\n\n` +
    linhas.join("\n") +
    `\n\n*Total: ${fmt(total())}*\n\n` +
    `Aguardo as instruções para pagamento e entrega.`;
    
  window.open(`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`, "_blank");
}

// ===== EVENTOS =====
document.addEventListener("DOMContentLoaded", () => {
  const btnOpenCart = $("#open-cart");
  const btnCloseCart = $("#close-cart");
  const overlay = $("#cart-overlay");
  const btnWhats = $("#finalizar-whatsapp");
  const searchInput = $("#search-input");
  const btnMenuToggle = $("#menu-toggle");
  const btnMenuClose = $("#menu-close");

  if(btnOpenCart) btnOpenCart.onclick = () => {
    $("#cart-sidebar").classList.add("open");
    if(overlay) overlay.classList.add("open");
  };
  
  if(btnCloseCart) btnCloseCart.onclick = () => {
    $("#cart-sidebar").classList.remove("open");
    if(overlay) overlay.classList.remove("open");
  };
  
  if(overlay) overlay.onclick = () => {
    $("#cart-sidebar").classList.remove("open");
    overlay.classList.remove("open");
  };
  
  if(btnWhats) btnWhats.onclick = finalizarWhats;

  if(btnMenuToggle) btnMenuToggle.onclick = () => {
    const menu = $("#mobile-menu");
    if(menu) menu.classList.add("open");
  };
  
  if(btnMenuClose) btnMenuClose.onclick = () => {
    const menu = $("#mobile-menu");
    if(menu) menu.classList.remove("open");
  };

  if(searchInput) {
    searchInput.addEventListener("input", (e) => {
      buscaAtiva = e.target.value;
      renderProdutos();
    });
  }

  // Inicializa a página
  renderNav();
  renderFiltros();
  renderProdutos();
  renderCarrinho();
});
