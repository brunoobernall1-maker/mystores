const produtos = [
  { 
    nome: "Narciso Rodriguez For Her EDT", 
    categoria: "Designer", 
    descricao: "Eau de Toilette · 50 ml", 
    descricaoLonga: "Uma fragrância floral amadeirada que combina a sensualidade do almíscar com notas de flor de laranjeira e baunilha. Ideal para mulheres elegantes e marcantes.",
    preco: 329.90, 
    imagem: "imagens/narciso-for-her.jpg" 
  },
  { 
    nome: "Dolce & Gabbana Light Blue EDP", 
    categoria: "Designer", 
    descricao: "Eau de Parfum · 100 ml", 
    descricaoLonga: "Um perfume cítrico e floral inspirado no Mediterrâneo. Notas de maçã verde, limão siciliano e jasmim trazem frescor e leveza para o seu dia a dia.",
    preco: 399.90, 
    imagem: "imagens/light-blue.jpg" 
  },
  { 
    nome: "Jean Paul Gaultier Le Male EDT", 
    categoria: "Designer", 
    descricao: "Eau de Toilette · 75 ml", 
    descricaoLonga: "Um clássico masculino com notas de lavanda, hortelã e baunilha. Aroma marcante, sensual e perfeito para noites especiais.",
    preco: 379.90, 
    imagem: "imagens/le-male.jpg" 
  },
  { 
    nome: "Paco Rabanne 1 Million EDT", 
    categoria: "Designer", 
    descricao: "Eau de Toilette · 100 ml", 
    descricaoLonga: "Fragrância amadeirada e especiada, com toques de canela, âmbar e couro. Para o homem ousado que gosta de deixar sua presença marcada.",
    preco: 349.90, 
    imagem: "imagens/1-million.jpg" 
  },
  { 
    nome: "Moschino I Love Love EDT", 
    categoria: "Designer", 
    descricao: "Eau de Toilette · 100 ml", 
    descricaoLonga: "Alegre e vibrante, com notas de laranja, groselha e musk. Uma fragrância jovem e romântica, perfeita para o dia a dia.",
    preco: 259.90, 
    imagem: "imagens/i-love-love.jpg" 
  },
  { 
    nome: "Animale For Men EDT", 
    categoria: "Designer", 
    descricao: "Eau de Toilette · 100 ml", 
    descricaoLonga: "Um perfume amadeirado aromático com notas de bergamota e sândalo. Fresco e masculino, ideal para o trabalho ou momentos casuais.",
    preco: 189.90, 
    imagem: "imagens/animale.jpg" 
  },
  { 
    nome: "Dolce & Gabbana Devotion EDP", 
    categoria: "Designer", 
    descricao: "Eau de Parfum · 50 ml", 
    descricaoLonga: "Uma fragrância gourmand com notas de limão cristalizado, flor de laranjeira e baunilha. Doce na medida certa, transmite aconchego e devoção.",
    preco: 389.90, 
    imagem: "imagens/devotion.jpg" 
  },
  { 
    nome: "Christian Dior Sauvage EDP", 
    categoria: "Designer", 
    descricao: "Eau de Parfum · 60 ml", 
    descricaoLonga: "O perfume masculino mais icônico da atualidade. Notas de bergamota da Calábria e ambroxan criam uma assinatura selvagem, nobre e inconfundível.",
    preco: 459.90, 
    imagem: "imagens/sauvage.jpg" 
  }
];

const CONFIG = {
  whatsapp: "5511999999999",
  nomeLoja: "PRISÉ Perfumes e Cosméticos"
};

let carrinho = JSON.parse(localStorage.getItem('prisе_carrinho')) || [];
let categoriaAtiva = "Todos";

const $ = (s) => document.querySelector(s);
const fmt = (n) => "R$ " + n.toFixed(2).replace(".", ",");

function renderNav() {
  const navList = $("#nav-list");
  if(!navList) return;
  navList.innerHTML = "";
  const menus = [
    { name: "Decants", subs: ["Decants Femininos", "Decants Masculino", "Decants Árabes"] },
    { name: "Designer", subs: ["Designer Feminino", "Designer Masculino"] },
    { name: "Árabes", subs: ["Árabes Feminino", "Árabes Masculino"] },
    { name: "Alta Perfumaria & Nicho", subs: ["Decants"] },
    { name: "Perfumes Lacrados", subs: ["Lacrados Femininos", "Lacrados Masculinos"] },
    { name: "Mais Produtos", subs: ["Victoria's Secret"] }
  ];
  menus.forEach(menu => {
    const li = document.createElement("li");
    li.className = "nav-item";
    const btn = document.createElement("button");
    btn.className = "nav-link";
    btn.textContent = menu.name;
    li.appendChild(btn);
    const dropdown = document.createElement("div");
    dropdown.className = "dropdown-content";
    const linkAll = document.createElement("a");
    linkAll.href = "#produtos";
    linkAll.textContent = `Ver tudo em ${menu.name}`;
    dropdown.appendChild(linkAll);
    menu.subs.forEach(sub => {
      const a = document.createElement("a");
      a.href = "#produtos";
      a.textContent = sub;
      dropdown.appendChild(a);
    });
    li.appendChild(dropdown);
    navList.appendChild(li);
  });
}

function renderFiltros() {
  const cats = ["Todos", ...new Set(produtos.map(p => p.categoria))];
  const el = $("#filters");
  if(!el) return;
  el.innerHTML = "";
  cats.forEach(cat => {
    const b = document.createElement("button");
    b.className = "filter-btn" + (cat === categoriaAtiva ? " active" : "");
    b.textContent = cat;
    b.addEventListener("click", () => { categoriaAtiva = cat; renderFiltros(); renderProdutos(); });
    el.appendChild(b);
  });
}

function renderProdutos() {
  const grid = $("#products-grid");
  if(!grid) return;
  grid.innerHTML = "";

  let filtrados = categoriaAtiva === "Todos" ? produtos : produtos.filter(p => p.categoria === categoriaAtiva);

  filtrados.forEach((prod, index) => {
    const card = document.createElement("a"); // Agora o card TODO é um link
    card.href = `produto.html?id=${index}`; // Link para a página do produto
    card.className = "product-card";
    
    // Cálculos de parcelamento e PIX
    const parcela = prod.preco / 3;
    const pix = prod.preco * 0.95;
    
    card.innerHTML = `
      <img class="product-image" src="${prod.imagem}" alt="${prod.nome}" loading="lazy" onerror="this.src='https://via.placeholder.com/400x400?text=Sem+Foto'">
      <div class="product-info">
        <div class="product-name">${prod.nome}</div>
        <div class="product-price">${fmt(prod.preco)}</div>
        <div class="installments">3x de ${fmt(parcela)} sem juros</div>
        <div class="pix-price">${fmt(pix)} com Pix</div>
        <button class="add-btn" onclick="event.preventDefault(); adicionar(${index}); this.textContent='Adicionado ✓'">Comprar</button>
      </div>
    `;
    grid.appendChild(card);
  });
}

function adicionar(index) {
  const produto = produtos[index];
  const exist = carrinho.find(i => i.nome === produto.nome);
  if (exist) exist.quantidade++;
  else carrinho.push({ ...produto, quantidade: 1 });
  
  localStorage.setItem('prisе_carrinho', JSON.stringify(carrinho)); // Salva no navegador
  renderCarrinho();
  abrirCarrinho();
}

function alterarQtd(nome, delta) {
  const item = carrinho.find(i => i.nome === nome);
  if (!item) return;
  item.quantidade += delta;
  if (item.quantidade <= 0) carrinho = carrinho.filter(i => i.nome !== nome);
  localStorage.setItem('prisе_carrinho', JSON.stringify(carrinho));
  renderCarrinho();
}

function remover(nome) {
  carrinho = carrinho.filter(i => i.nome !== nome);
  localStorage.setItem('prisе_carrinho', JSON.stringify(carrinho));
  renderCarrinho();
}

function total() { return carrinho.reduce((s, i) => s + i.preco * i.quantidade, 0); }

function renderCarrinho() {
  const badge = $("#cart-badge");
  if(badge) badge.textContent = carrinho.reduce((s, i) => s + i.quantidade, 0);

  const box = $("#cart-items");
  const btnW = $("#finalizar-whatsapp");
  if(!box || !btnW) return;

  if (carrinho.length === 0) {
    box.innerHTML = '<div style="text-align:center; padding: 20px;">O carrinho de compras está vazio.</div>';
    btnW.disabled = true;
  } else {
    box.innerHTML = "";
    carrinho.forEach(item => {
      const el = document.createElement("div");
      el.className = "cart-item";
      el.innerHTML = `
        <img src="${item.imagem}" onerror="this.src='https://via.placeholder.com/100x120?text=Foto'">
        <div class="cart-item-info">
          <div class="cart-item-name">${item.nome}</div>
          <div class="cart-item-price">${fmt(item.preco)}</div>
          <div class="cart-controls">
            <button class="qty-btn" data-menos>−</button>
            <span>${item.quantidade}</span>
            <button class="qty-btn" data-mais>+</button>
            <button style="margin-left:auto; background:none; border:none; color:red; cursor:pointer;" data-rm><i class="fas fa-trash"></i></button>
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

function abrirCarrinho() {
  $("#cart-sidebar").classList.add("open");
  $("#cart-overlay").classList.add("open");
}

function finalizarWhats() {
  if (carrinho.length === 0) return;
  const linhas = carrinho.map(i => `• ${i.quantidade}x ${i.nome} — ${fmt(i.preco * i.quantidade)}`);
  const msg = `Olá, *${CONFIG.nomeLoja}*! ✨\n\nGostaria de fazer o seguinte pedido:\n\n${linhas.join("\n")}\n\n*Total: ${fmt(total())}*\n\nAguardo as instruções para pagamento e entrega.`;
  window.open(`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`, "_blank");
}

document.addEventListener("DOMContentLoaded", () => {
  const btnOpenCart = $("#open-cart");
  const btnCloseCart = $("#close-cart");
  const overlay = $("#cart-overlay");
  const btnWhats = $("#finalizar-whatsapp");

  if(btnOpenCart) btnOpenCart.onclick = abrirCarrinho;
  if(btnCloseCart) btnCloseCart.onclick = () => {
    $("#cart-sidebar").classList.remove("open");
    if(overlay) overlay.classList.remove("open");
  };
  if(overlay) overlay.onclick = () => {
    $("#cart-sidebar").classList.remove("open");
    overlay.classList.remove("open");
  };
  if(btnWhats) btnWhats.onclick = finalizarWhats;

  renderNav();
  renderFiltros();
  renderProdutos();
  renderCarrinho();
});
