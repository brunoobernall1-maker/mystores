// ============================================================
//  ESSÊNCIA ELEGANTE — produtos.js
//  Edite os produtos abaixo conforme sua necessidade.
// ============================================================

const produtos = [
  {
    id: 1,
    nome: "Eau de Parfum Noir",
    categoria: "Perfume",
    preco: 289.90,
    descricao: "Notas amadeiradas e âmbar",
    imagem: "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=600&auto=format&fit=crop",
    badge: "Novo"
  },
  {
    id: 2,
    nome: "Brisa Floral",
    categoria: "Perfume",
    preco: 199.90,
    descricao: "Fragrância leve e romântica",
    imagem: "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=600&auto=format&fit=crop",
    badge: ""
  },
  {
    id: 3,
    nome: "Âmbar Dourado",
    categoria: "Perfume",
    preco: 349.90,
    descricao: "Intenso, sofisticado e marcante",
    imagem: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=600&auto=format&fit=crop",
    badge: "Best-seller"
  },
  {
    id: 4,
    nome: "Colar Ponto de Luz",
    categoria: "Acessório",
    preco: 129.90,
    descricao: "Banho de ouro 18k",
    imagem: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=600&auto=format&fit=crop",
    badge: ""
  },
  {
    id: 5,
    nome: "Pulseira Riviera",
    categoria: "Acessório",
    preco: 89.90,
    descricao: "Aço inoxidável dourado",
    imagem: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=600&auto=format&fit=crop",
    badge: ""
  },
  {
    id: 6,
    nome: "Kit Presente Deluxe",
    categoria: "Kit",
    preco: 459.90,
    descricao: "Perfume + nécessaire + cartão",
    imagem: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=600&auto=format&fit=crop",
    badge: "Exclusivo"
  },
  {
    id: 7,
    nome: "Bruma Corporal",
    categoria: "Corpo",
    preco: 79.90,
    descricao: "Hidratação com fragrância suave",
    imagem: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=600&auto=format&fit=crop",
    badge: ""
  },
  {
    id: 8,
    nome: "Vela Aromática",
    categoria: "Casa",
    preco: 69.90,
    descricao: "Cera vegetal e pavio de algodão",
    imagem: "https://images.unsplash.com/photo-1603006905003-be475563bc59?q=80&w=600&auto=format&fit=crop",
    badge: ""
  }
];

// ============================================================
//  ESTADO DO CARRINHO
// ============================================================
let carrinho = JSON.parse(localStorage.getItem('carrinhoEssencia')) || [];

// ============================================================
//  ELEMENTOS DO DOM
// ============================================================
const grid = document.getElementById('products-grid');
const filtersContainer = document.getElementById('filters');
const cartCount = document.getElementById('cart-count');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const cartSidebar = document.getElementById('cart-sidebar');
const cartOverlay = document.getElementById('cart-overlay');
const openCartBtn = document.getElementById('open-cart');
const closeCartBtn = document.getElementById('close-cart');
const finalizarBtn = document.getElementById('finalizar-whatsapp');

// ============================================================
//  RENDERIZAÇÃO DOS PRODUTOS
// ============================================================
function renderizarProdutos(filtro = 'Todos') {
  if (!grid) return;
  const lista = filtro === 'Todos'
    ? produtos
    : produtos.filter(p => p.categoria === filtro);

  grid.innerHTML = lista.map(p => `
    <div class="product-card">
      <div class="product-image-wrapper">
        <img src="${p.imagem}" alt="${p.nome}" class="product-image" loading="lazy">
        ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ''}
      </div>
      <div class="product-info">
        <div class="product-category">${p.categoria}</div>
        <h3 class="product-name">${p.nome}</h3>
        <p class="product-desc">${p.descricao}</p>
        <div class="product-price">R$ ${p.preco.toFixed(2).replace('.', ',')}</div>
        <button class="add-to-cart" data-id="${p.id}">Adicionar ao Carrinho</button>
      </div>
    </div>
  `).join('');

  // Eventos dos botões "Adicionar"
  document.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.dataset.id);
      adicionarAoCarrinho(id);
    });
  });
}

// ============================================================
//  FILTROS
// ============================================================
function renderizarFiltros() {
  if (!filtersContainer) return;
  const categorias = ['Todos', ...new Set(produtos.map(p => p.categoria))];
  filtersContainer.innerHTML = categorias.map(cat => `
    <button class="filter-btn ${cat === 'Todos' ? 'active' : ''}" data-cat="${cat}">${cat}</button>
  `).join('');

  filtersContainer.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      filtersContainer.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderizarProdutos(btn.dataset.cat);
    });
  });
}

// ============================================================
//  CARRINHO — LÓGICA
// ============================================================
function salvarCarrinho() {
  localStorage.setItem('carrinhoEssencia', JSON.stringify(carrinho));
  atualizarCarrinho();
}

function adicionarAoCarrinho(id) {
  const produto = produtos.find(p => p.id === id);
  if (!produto) return;

  const itemExistente = carrinho.find(item => item.id === id);
  if (itemExistente) {
    itemExistente.quantidade += 1;
  } else {
    carrinho.push({
      id: produto.id,
      nome: produto.nome,
      preco: produto.preco,
      imagem: produto.imagem,
      quantidade: 1
    });
  }
  salvarCarrinho();
  abrirCarrinho();
}

function removerDoCarrinho(id) {
  carrinho = carrinho.filter(item => item.id !== id);
  salvarCarrinho();
}

function alterarQuantidade(id, delta) {
  const item = carrinho.find(i => i.id === id);
  if (!item) return;
  item.quantidade += delta;
  if (item.quantidade <= 0) {
    removerDoCarrinho(id);
  } else {
    salvarCarrinho();
  }
}

function calcularTotal() {
  return carrinho.reduce((acc, item) => acc + item.preco * item.quantidade, 0);
}

// ============================================================
//  ATUALIZAÇÃO VISUAL DO CARRINHO
// ============================================================
function atualizarCarrinho() {
  // Contador
  const totalItens = carrinho.reduce((acc, item) => acc + item.quantidade, 0);
  if (cartCount) cartCount.textContent = totalItens;

  // Lista
  if (!cartItems) return;
  if (carrinho.length === 0) {
    cartItems.innerHTML = `<div class="cart-empty">Seu carrinho está vazio.<br>Adicione produtos para começar ✨</div>`;
    if (finalizarBtn) finalizarBtn.disabled = true;
    if (cartTotal) cartTotal.textContent = 'R$ 0,00';
    return;
  }

  cartItems.innerHTML = carrinho.map(item => `
    <div class="cart-item">
      <img src="${item.imagem}" alt="${item.nome}">
      <div class="cart-item-info">
        <div class="cart-item-name">${item.nome}</div>
        <div class="cart-item-price">R$ ${item.preco.toFixed(2).replace('.', ',')}</div>
        <div class="cart-item-controls">
          <button class="qty-btn" data-action="decrement" data-id="${item.id}">−</button>
          <span class="qty-value">${item.quantidade}</span>
          <button class="qty-btn" data-action="increment" data-id="${item.id}">+</button>
          <button class="remove-btn" data-id="${item.id}" title="Remover">&times;</button>
        </div>
      </div>
    </div>
  `).join('');

  // Eventos dos controles
  cartItems.querySelectorAll('.qty-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.dataset.id);
      const delta = btn.dataset.action === 'increment' ? 1 : -1;
      alterarQuantidade(id, delta);
    });
  });
  cartItems.querySelectorAll('.remove-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      removerDoCarrinho(parseInt(btn.dataset.id));
    });
  });

  // Total
  const total = calcularTotal();
  if (cartTotal) cartTotal.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
  if (finalizarBtn) finalizarBtn.disabled = carrinho.length === 0;
}

// ============================================================
//  ABRIR / FECHAR CARRINHO
// ============================================================
function abrirCarrinho() {
  if (cartSidebar) cartSidebar.classList.add('open');
  if (cartOverlay) cartOverlay.classList.add('open');
}

function fecharCarrinho() {
  if (cartSidebar) cartSidebar.classList.remove('open');
  if (cartOverlay) cartOverlay.classList.remove('open');
}

if (openCartBtn) openCartBtn.addEventListener('click', abrirCarrinho);
if (closeCartBtn) closeCartBtn.addEventListener('click', fecharCarrinho);
if (cartOverlay) cartOverlay.addEventListener('click', fecharCarrinho);

// ============================================================
//  FINALIZAR NO WHATSAPP
// ============================================================
if (finalizarBtn) {
  finalizarBtn.addEventListener('click', () => {
    if (carrinho.length === 0) return;

    const numeroWhatsApp = '5511999999999'; // <-- troque pelo seu número
    let mensagem = 'Olá! Gostaria de finalizar meu pedido:\n\n';
    carrinho.forEach(item => {
      mensagem += `• ${item.nome} — ${item.quantidade}x — R$ ${(item.preco * item.quantidade).toFixed(2).replace('.', ',')}\n`;
    });
    mensagem += `\nTotal: R$ ${calcularTotal().toFixed(2).replace('.', ',')}`;
    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;
    window.open(url, '_blank');
  });
}

// ============================================================
//  INICIALIZAÇÃO
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  renderizarProdutos();
  renderizarFiltros();
  atualizarCarrinho();
});
