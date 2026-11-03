const produtos = [
  { nome: "Narciso Rodriguez For Her EDT", categoria: "Designer", descricao: "Eau de Toilette", descricaoLonga: "Narciso Rodriguez For Her é um clássico floral amadeirado. Ele combina a sensualidade do almíscar com notas de flor de laranjeira, jasmim e baunilha. É a escolha perfeita para mulheres elegantes que buscam uma fragrância marcante, sofisticada e com excelente fixação.", imagem: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=500&q=80", variacoes: [{ tamanho: "2ml", preco: 34.90 }, { tamanho: "5ml", preco: 59.90 }, { tamanho: "10ml", preco: 99.90 }, { tamanho: "15ml", preco: 139.90 }] },
  { nome: "Dolce & Gabbana Light Blue EDP", categoria: "Designer", descricao: "Eau de Parfum", descricaoLonga: "Light Blue é a essência do Mediterrâneo. Um perfume cítrico e floral com maçã verde da Sicília, limão siciliano e jasmim. Traz frescor, leveza e alegria para o dia a dia, sendo perfeito para dias quentes e ensolarados.", imagem: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=500&q=80", variacoes: [{ tamanho: "2ml", preco: 39.90 }, { tamanho: "5ml", preco: 69.90 }, { tamanho: "10ml", preco: 119.90 }, { tamanho: "15ml", preco: 169.90 }] },
  { nome: "Jean Paul Gaultier Le Male EDT", categoria: "Designer", descricao: "Eau de Toilette", descricaoLonga: "O icônico marinheiro. Le Male combina lavanda, hortelã e baunilha, resultando em um aroma marcante, sensual e inconfundível. Um clássico masculino que exala masculinidade e é ótimo para noites especiais e ocasiões românticas.", imagem: "https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=500&q=80", variacoes: [{ tamanho: "2ml", preco: 37.90 }, { tamanho: "5ml", preco: 64.90 }, { tamanho: "10ml", preco: 109.90 }, { tamanho: "15ml", preco: 154.90 }] },
  { nome: "Paco Rabanne 1 Million EDT", categoria: "Designer", descricao: "Eau de Toilette", descricaoLonga: "1 Million é feito para o homem ousado. Uma fragrância amadeirada e especiada com notas de canela, âmbar e couro. É uma assinatura poderosa, que deixa rastro e marca presença por onde passa. Ideal para festas e baladas.", imagem: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=500&q=80", variacoes: [{ tamanho: "2ml", preco: 35.90 }, { tamanho: "5ml", preco: 59.90 }, { tamanho: "10ml", preco: 99.90 }, { tamanho: "15ml", preco: 139.90 }] },
  { nome: "Moschino I Love Love EDT", categoria: "Designer", descricao: "Eau de Toilette", descricaoLonga: "I Love Love é uma explosão de alegria. Com notas de laranja, limão, groselha e musk, é uma fragrância cítrica floral jovem, romântica e divertida. A escolha perfeita para mulheres espontâneas e para o uso diário.", imagem: "https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=500&q=80", variacoes: [{ tamanho: "2ml", preco: 28.90 }, { tamanho: "5ml", preco: 49.90 }, { tamanho: "10ml", preco: 84.90 }, { tamanho: "15ml", preco: 119.90 }] },
  { nome: "Animale For Men EDT", categoria: "Designer", descricao: "Eau de Toilette", descricaoLonga: "Animale For Men é um amadeirado aromático refrescante. Com bergamota, sândalo e âmbar, é um perfume fresco, moderno e masculino. Versátil, pode ser usado no trabalho ou em momentos casuais sem incomodar.", imagem: "https://images.unsplash.com/photo-1610461888750-10bfc601b874?w=500&q=80", variacoes: [{ tamanho: "2ml", preco: 22.90 }, { tamanho: "5ml", preco: 39.90 }, { tamanho: "10ml", preco: 69.90 }, { tamanho: "15ml", preco: 99.90 }] },
  { nome: "Dolce & Gabbana Devotion EDP", categoria: "Designer", descricao: "Eau de Parfum", descricaoLonga: "Devotion é um perfume gourmand que aquece o coração. A combinação de limão cristalizado, flor de laranjeira e baunilha cria um aroma doce, aconchegante e viciante. Perfeito para quem ama fragrâncias doces e marcantes.", imagem: "https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?w=500&q=80", variacoes: [{ tamanho: "2ml", preco: 39.90 }, { tamanho: "5ml", preco: 69.90 }, { tamanho: "10ml", preco: 119.90 }, { tamanho: "15ml", preco: 169.90 }] },
  { nome: "Christian Dior Sauvage EDP", categoria: "Designer", descricao: "Eau de Parfum", descricaoLonga: "Sauvage EDP é a personificação da masculinidade selvagem e nobre. Com uma explosão de bergamota da Calábria e o acorde exclusivo de ambroxan, é um perfume potente, amadeirado e inconfundível. Um best-seller absoluto.", imagem: "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?w=500&q=80", variacoes: [{ tamanho: "2ml", preco: 45.90 }, { tamanho: "5ml", preco: 79.90 }, { tamanho: "10ml", preco: 139.90 }, { tamanho: "15ml", preco: 189.90 }] }
];

const CONFIG = { whatsapp: "5511999999999", nomeLoja: "PRISÉ Perfumes e Cosméticos" };
let carrinho = JSON.parse(localStorage.getItem('prisе_carrinho')) || [];
let categoriaAtiva = "Todos";
let produtoAtualModal = null;
let variacaoSelecionadaModal = null;

const $ = (s) => document.querySelector(s);
const fmt = (n) => "R$ " + n.toFixed(2).replace(".", ",");

function renderNav() {
  const navList = $("#nav-list"); if(!navList) return; navList.innerHTML = "";
  const menus = [
    { name: "Decants", subs: ["Decants Femininos", "Decants Masculino", "Decants Árabes"] },
    { name: "Designer", subs: ["Designer Feminino", "Designer Masculino"] },
    { name: "Árabes", subs: ["Árabes Femininos", "Árabes Masculinos"] },
    { name: "Alta Perfumaria & Nicho", subs: ["Decants"] }
  ];
  menus.forEach(menu => {
    const li = document.createElement("li"); li.className = "nav-item";
    const btn = document.createElement("button"); btn.className = "nav-link"; btn.textContent = menu.name; li.appendChild(btn);
    const dropdown = document.createElement("div"); dropdown.className = "dropdown-content";
    dropdown.innerHTML = `<a href="#produtos">Ver tudo em ${menu.name}</a>`;
    menu.subs.forEach(sub => { dropdown.innerHTML += `<a href="#produtos">${sub}</a>`; });
    li.appendChild(dropdown); navList.appendChild(li);
  });
}

function renderFiltros() {
  const cats = ["Todos", ...new Set(produtos.map(p => p.categoria))];
  const el = $("#filters"); if(!el) return; el.innerHTML = "";
  cats.forEach(cat => {
    const b = document.createElement("button");
    b.className = "filter-btn" + (cat === categoriaAtiva ? " active" : "");
    b.textContent = cat;
    b.addEventListener("click", () => { categoriaAtiva = cat; renderFiltros(); renderProdutos(); });
    el.appendChild(b);
  });
}

function renderProdutos() {
  const grid = $("#products-grid"); if(!grid) return; grid.innerHTML = "";
  let filtrados = categoriaAtiva === "Todos" ? produtos : produtos.filter(p => p.categoria === categoriaAtiva);

  filtrados.forEach((prod, index) => {
    const menorPreco = Math.min(...prod.variacoes.map(v => v.preco));
    const parcela = menorPreco / 3;
    const pix = menorPreco * 0.95;
    
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <div class="product-link" onclick="abrirProdutoModal(${index})">
        <img class="product-image" src="${prod.imagem}" alt="${prod.nome}" onerror="this.src='https://via.placeholder.com/400x400?text=Sem+Foto'">
        <div class="product-info">
          <div class="product-name">${prod.nome}</div>
          <div style="font-size:12px; color:#777; margin-bottom:5px;">A partir de:</div>
          <div class="product-price">${fmt(menorPreco)}</div>
          <div class="installments">3x de ${fmt(parcela)} sem juros</div>
          <div class="pix-price">${fmt(pix)} com Pix</div>
        </div>
      </div>
      <button class="add-btn" onclick="adicionar(${index}); this.textContent='Adicionado ✓'">Comprar</button>
    `;
    grid.appendChild(card);
  });
}

function abrirProdutoModal(index) {
  produtoAtualModal = produtos[index];
  $("#modal-img").src = produtoAtualModal.imagem;
  $("#modal-name").textContent = produtoAtualModal.nome;
  $("#modal-desc").textContent = produtoAtualModal.descricaoLonga;

  const sizeContainer = $("#modal-size-options");
  sizeContainer.innerHTML = '';
  
  produtoAtualModal.variacoes.forEach((v, i) => {
    const btn = document.createElement("button");
    btn.className = 'size-btn' + (i === 0 ? ' active' : '');
    btn.textContent = v.tamanho;
    btn.onclick = () => selecionarVariacaoModal(v, btn);
    sizeContainer.appendChild(btn);
  });

  selecionarVariacaoModal(produtoAtualModal.variacoes[0], sizeContainer.children[0]);
  $("#product-modal").classList.add("open");
}

function selecionarVariacaoModal(variacao, btnElement) {
  variacaoSelecionadaModal = variacao;
  document.querySelectorAll('#modal-size-options .size-btn').forEach(b => b.classList.remove('active'));
  if(btnElement) btnElement.classList.add('active');

  const preco = variacao.preco;
  $("#modal-price").textContent = fmt(preco);
  $("#modal-installments").textContent = "3x de " + fmt(preco/3) + " sem juros";
  $("#modal-pix").innerHTML = fmt(preco * 0.95) + " no PIX (5% OFF)";
}

function alterarQtdModal(valor) {
  const input = $("#modal-qty");
  let qtd = parseInt(input.value) + valor;
  if (qtd < 1) qtd = 1;
  input.value = qtd;
}

function adicionarModal() {
  const qtd = parseInt($("#modal-qty").value);
  const itemNome = `${produtoAtualModal.nome} - ${variacaoSelecionadaModal.tamanho}`;
  
  const index = carrinho.findIndex(i => i.nome === itemNome);
  if (index > -1) {
    carrinho[index].quantidade += qtd;
  } else {
    carrinho.push({ nome: itemNome, preco: variacaoSelecionadaModal.preco, imagem: produtoAtualModal.imagem, quantidade: qtd });
  }
  
  localStorage.setItem('prisе_carrinho', JSON.stringify(carrinho));
  $("#product-modal").classList.remove("open");
  showToast();
  renderCarrinho();
  abrirCarrinho();
}

function adicionar(index) {
  const produto = produtos[index];
  const menorOpcao = produto.variacoes[0];
  const itemNome = `${produto.nome} - ${menorOpcao.tamanho}`;
  
  const exist = carrinho.find(i => i.nome === itemNome);
  if (exist) exist.quantidade++;
  else carrinho.push({ nome: itemNome, preco: menorOpcao.preco, imagem: produto.imagem, quantidade: 1 });
  
  localStorage.setItem('prisе_carrinho', JSON.stringify(carrinho));
  showToast();
  renderCarrinho();
  abrirCarrinho();
}

function showToast() {
  const toast = $("#toast");
  toast.style.display = 'block';
  setTimeout(() => toast.style.display = 'none', 2000);
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
        <div class="cart-item-info" style="flex:1;">
          <div style="font-size:14px; font-weight:500;">${item.nome}</div>
          <div style="font-size:13px; color:var(--rose);">${fmt(item.preco)}</div>
          <div style="display:flex; gap:8px; align-items:center; margin-top:5px;">
            <button style="border:1px solid #ddd; padding:2px 8px; cursor:pointer;" data-menos>−</button>
            <span>${item.quantidade}</span>
            <button style="border:1px solid #ddd; padding:2px 8px; cursor:pointer;" data-mais>
