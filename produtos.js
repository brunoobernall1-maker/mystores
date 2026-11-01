// ============================================
// 🛍️ EDITE AQUI SEUS PRODUTOS
// ============================================
// Para trocar imagem: 
//   - Use "imagens/nome-da-foto.jpg" (se colocar a foto na pasta imagens)
//   - OU use um link direto: "https://..."
//
// Para trocar preço: só alterar o número (sem "R$")
// Para adicionar produto: copie um bloco { ... } inteiro e cole antes do ]
// ============================================

const produtos = [
  {
    nome: "Noir Intense",
    descricao: "Amadeirado · Masculino",
    preco: 289.90,
    imagem: "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=600&auto=format&fit=crop"
  },
  {
    nome: "Rose Éternelle",
    descricao: "Floral · Feminino",
    preco: 259.90,
    imagem: "https://images.unsplash.com/photo-1615634260167-c8cdede054de?q=80&w=600&auto=format&fit=crop"
  },
  {
    nome: "Citrus Burst",
    descricao: "Cítrico · Unissex",
    preco: 199.90,
    imagem: "https://images.unsplash.com/photo-1587017539504-67cfbddac569?q=80&w=600&auto=format&fit=crop"
  },
  {
    nome: "Oud Royal",
    descricao: "Oriental · Masculino",
    preco: 349.90,
    imagem: "https://images.unsplash.com/photo-1610461888750-10bfc601b874?q=80&w=600&auto=format&fit=crop"
  }
  // 👆 Para adicionar mais, coloque uma VÍRGULA após o } acima
  // e cole outro bloco:
  // {
  //   nome: "Novo Perfume",
  //   descricao: "Descrição curta",
  //   preco: 149.90,
  //   imagem: "imagens/novo.jpg"
  // },
];

// ============================================
// ⚙️ NÃO PRECISA MEXER DAQUI PRA BAIXO
// ============================================
const grid = document.getElementById('products-grid');
const cartCount = document.getElementById('cart-count');
let cart = 0;

// Formata o preço como "R$ 289,90"
function formatarPreco(valor) {
  return 'R$ ' + valor.toFixed(2).replace('.', ',');
}

// Cria os cards na página
produtos.forEach(produto => {
  const card = document.createElement('div');
  card.className = 'product-card';
  card.innerHTML = `
    <img class="product-image" src="${produto.imagem}" alt="${produto.nome}" loading="lazy">
    <div class="product-info">
      <div class="product-name">${produto.nome}</div>
      <div class="product-desc">${produto.descricao}</div>
      <div class="product-price">${formatarPreco(produto.preco)}</div>
      <button class="add-to-cart">Adicionar</button>
    </div>
  `;
  grid.appendChild(card);

  // Efeito ao clicar em "Adicionar"
  const btn = card.querySelector('.add-to-cart');
  btn.addEventListener('click', () => {
    cart++;
    cartCount.textContent = cart;
    btn.textContent = 'Adicionado ✓';
    btn.style.backgroundColor = '#b8860b';
    btn.style.color = '#fff';
    setTimeout(() => {
      btn.textContent = 'Adicionar';
      btn.style.backgroundColor = 'transparent';
      btn.style.color = '#b8860b';
    }, 1000);
  });
});
