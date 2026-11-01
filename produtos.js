// ============================================
// 🛍️ EDITE AQUI SEUS PRODUTOS
// ============================================
// "categoria" define o filtro. Use valores iguais para agrupar.
// Ex: "Perfumes", "Acessórios", "Kits"
//
// Para trocar imagem:
//   - "imagens/nome-da-foto.jpg" (se colocar a foto na pasta imagens)
//   - OU link direto: "https://..."
//
// Para adicionar: copie um bloco { ... } inteiro e cole antes do ]
// ============================================

const produtos = [
  {
    nome: "Noir Intense",
    categoria: "Perfumes",
    descricao: "Amadeirado · Masculino",
    preco: 289.90,
    imagem: "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=600&auto=format&fit=crop"
  },
  {
    nome: "Rose Éternelle",
    categoria: "Perfumes",
    descricao: "Floral · Feminino",
    preco: 259.90,
    imagem: "https://images.unsplash.com/photo-1615634260167-c8cdede054de?q=80&w=600&auto=format&fit=crop"
  },
  {
    nome: "Citrus Burst",
    categoria: "Perfumes",
    descricao: "Cítrico · Unissex",
    preco: 199.90,
    imagem: "https://images.unsplash.com/photo-1587017539504-67cfbddac569?q=80&w=600&auto=format&fit=crop"
  },
  {
    nome: "Oud Royal",
    categoria: "Perfumes",
    descricao: "Oriental · Masculino",
    preco: 349.90,
    imagem: "https://images.unsplash.com/photo-1610461888750-10bfc601b874?q=80&w=600&auto=format&fit=crop"
  },
  {
    nome: "Kit Presente Luxo",
    categoria: "Kits",
    descricao: "Perfume + Hidratante",
    preco: 399.90,
    imagem: "https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?q=80&w=600&auto=format&fit=crop"
  },
  {
    nome: "Estojo Veludo",
    categoria: "Acessórios",
    descricao: "Estojo para 3 perfumes",
    preco: 89.90,
    imagem: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=600&auto=format&fit=crop"
  },
  {
    nome: "Vela Aromática",
    categoria: "Acessórios",
    descricao: "Lavanda & Baunilha",
    preco: 69.90,
    imagem: "https://images.unsplash.com/photo-1602874801006-e26c4c5b5e8a?q=80&w=600&auto=format&fit=crop"
  }
];

// ============================================
// ⚙️ CONFIGURAÇÕES GERAIS
// ============================================
const CONFIG = {
  // 👇 COLOQUE SEU NÚMERO AQUI (com código do país e DDD, só números)
  // Exemplo Brasil: 5511999999999 (55 + DDD + número)
  whatsapp: "5511999999999",
  // Nome que aparece na mensagem
  nomeLoja: "Essência Elegante"
};

// ============================================
// 🧠 LÓGICA (não precisa mexer)
// ============================================
let carrinho = [];        // [{ nome, preco, imagem, quantidade }]
let categoriaAtiva = "Todos";

const grid = document.getElementById('products-grid');
const filtersEl = document.getElementById('filters');
const cartCountEl = document.getElementById('cart-count');
const cartItemsEl = document.getElementById('cart-items');
const cartTotalEl = document.getElementById('cart-total');
const cartSidebar = document.getElementById('cart-sidebar');
const cartOverlay = document.getElementById('cart-overlay');
const btnWhats = document.getElementById('finalizar-whatsapp');

// Formata preço
function formatarPreco(valor) {
  return 'R$ ' + valor.toFixed(2).replace('.', ',');
}

// -------- FILTROS --------
function renderFiltros() {
  const categorias = ["Todos", ...new Set(produtos.map(p => p.categoria))];
  filtersEl.innerHTML = "";
  categorias.forEach(cat => {
    const btn = document.createElement('button');
    btn.className = 'filter-btn' + (cat === categoriaAtiva ? ' active' : '');
    btn.textContent = cat;
    btn.addEventListener('click', () => {
      categoriaAtiva = cat;
      renderFiltros();
      renderProdutos();
    });
    filtersEl.appendChild(btn);
  });
}

// -------- PRODUTOS --------
function renderProdutos() {
  grid.innerHTML = "";
  const filtrados = categoriaAtiva === "Todos"
    ? produtos
    : produtos.filter(p => p.categoria === categoriaAtiva);

  if (filtrados.length === 0) {
    grid.innerHTML = '<p style="grid-column:1/-1;text-align:center;color:#888;padding:40px;">Nenhum produto nesta categoria.</p>';
    return;
  }

  filtrados.forEach(produto => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img class="product-image" src="${produto.imagem}" alt="${produto.nome}" loading="lazy">
      <div class="product-info">
        <div class="product-category">${produto.categoria}</div>
        <div class="product-name">${produto.nome}</div>
        <div class="product-desc">${produto.descricao}</div>
        <div class="product-price">${formatarPreco(produto.preco)}</div>
        <button class="add-to-cart">Adicionar</button>
      </div>
    `;
    grid.appendChild(card);

    const btn = card.querySelector('.add-to-cart');
    btn.addEventListener('click', () => {
      adicionarAoCarrinho(produto);
      btn.textContent = 'Adicionado ✓';
      btn.style.backgroundColor = '#b8860b';
      btn.style.color = '#fff';
      setTimeout(() => {
        btn.textContent = 'Adicionar';
        btn.style.backgroundColor = 'transparent';
        btn.style.color = '#b8860b';
      }, 900);
    });
  });
}

// -------- CARRINHO --------
function adicionarAoCarrinho(produto) {
  const existente = carrinho.find(item => item.nome === produto.nome);
  if (existente) {
    existente.quantidade++;
  } else {
    carrinho.push({
      nome: produto.nome,
      preco: produto.preco,
      imagem: produto.imagem,
      quantidade: 1
    });
  }
  renderCarrinho();
  abrirCarrinho();
}

function removerDoCarrinho(nome) {
  carrinho = carrinho.filter(item => item.nome !== nome);
  renderCarrinho();
}

function alterarQuantidade(nome, delta) {
  const item = carrinho.find(i => i.nome === nome);
  if (!item) return;
  item.quantidade += delta;
  if (item.quantidade <= 0) {
    removerDoCarrinho(nome);
  } else {
    renderCarrinho();
  }
}

function calcularTotal() {
  return carrinho.reduce((soma, item) => soma + item.preco * item.quantidade, 0);
}

function renderCarrinho() {
  // Contador no header
  const totalItens = carrinho.reduce((soma, item) => soma + item.quantidade, 0);
  cartCountEl.textContent = totalItens;

  // Lista
  if (carrinho.length === 0) {
    cartItemsEl.innerHTML = '<div class="cart-empty">Seu carrinho está vazio.<br>Adicione produtos para começar 😊</div>';
    btnWhats.disabled = true;
  } else {
    cartItemsEl.innerHTML = "";
    carrinho.forEach(item => {
      const div = document.createElement('div');
      div.className = 'cart-item';
      div.innerHTML = `
        <img src="${item.imagem}" alt="${item.nome}">
        <div class="cart-item-info">
          <div class="cart-item-name">${item.nome}</div>
          <div class="cart-item-price">${formatarPreco(item.preco)}</div>
          <div class="cart-item-controls">
            <button class="qty-btn" data-action="minus">−</button>
            <span class="qty-value">${item.quantidade}</span>
            <button class="qty-btn" data-action="plus">+</button>
            <button class="remove-btn" data-action="remove"><i class="fas fa-trash"></i></button>
          </div>
        </div>
      `;
      cartItemsEl.appendChild(div);

      div.querySelector('[data-action="minus"]').addEventListener('click', () => alterarQuantidade(item.nome, -1));
      div.querySelector('[data-action="plus"]').addEventListener('click', () => alterarQuantidade(item.nome, 1));
      div.querySelector('[data-action="remove"]').addEventListener('click', () => removerDoCarrinho(item.nome));
    });
    btnWhats.disabled = false;
  }

  // Total
  cartTotalEl.textContent = formatarPreco(calcularTotal());
}

// -------- ABRIR/FECHAR CARRINHO --------
function abrirCarrinho() {
  cartSidebar.classList.add('open');
  cartOverlay.classList.add('open');
}
function fecharCarrinho() {
  cartSidebar.classList.remove('open');
  cartOverlay.classList.remove('open');
}

document.getElementById('open-cart').addEventListener('click', abrirCarrinho);
document.getElementById('close-cart').addEventListener('click', fecharCarrinho);
cartOverlay.addEventListener('click', fecharCarrinho);

// -------- FINALIZAR NO WHATSAPP --------
btnWhats.addEventListener('click', () => {
  if (carrinho.length === 0) return;

  const linhas = carrinho.map(item =>
    `• ${item.quantidade}x ${item.nome} — ${formatarPreco(item.preco * item.quantidade)}`
  );

  const mensagem =
    `Olá, *${CONFIG.nomeLoja}*! 👋\n\n` +
    `Gostaria de fazer o seguinte pedido:\n\n` +
    linhas.join('\n') +
    `\n\n*Total: ${formatarPreco(calcularTotal())}*\n\n` +
    `Aguardo instruções para pagamento e entrega. O
