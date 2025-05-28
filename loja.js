
const listaProdutos = [
    {
        id: 0,
        nome: "Bandagem 100% algodão",
        descricaoCurta: "Proteção para seus punhos.",
        descricaoLonga: "A bandagem de algodão garante firmeza e segurança durante os treinos de boxe, muay thai e outras artes marciais. Essencial para evitar lesões.",
        imagem: "imagens/bandagem.png",
        preco: "R$ 164,90"
    },
    {
        id: 1,
        nome: "Bola speedball",
        descricaoCurta: "Potencialize sua explosão e reflexos.",
        descricaoLonga: "Speedball de couro legítimo de vaca. Com fechamento seguro e costura dupla reforçada, proporcionando longa vida útil.",
        imagem: "imagens/speedball.png",
        preco: "R$ 519,90"
    },
    {
        id: 2,
        nome: "Corda de couro",
        descricaoCurta: "Melhore sua resistência e seu footwork.",
        descricaoLonga: "Corda ajustável feita com couro legítimo de vaca, garantindo elasticidade e resistência. Cabo antiderrapante feito em mogno, mantendo segurança e estilo.",
        imagem: "imagens/corda.png",
        preco: "R$ 249,90"
    },
    {
        id: 3,
        nome: "Gi preto 100% algodão",
        descricaoCurta: "Proteção, conforto e estilo.",
        descricaoLonga: "Gi de alta qualidade aprovado pela CBJJ. Feito de 100% algodão, com Kanji Kaizen bordado no peito.",
        imagem: "imagens/kimono.png",
        preco: "R$ 1799,90"
    },
    {
        id: 4,
        nome: "Luva de couro boxe",
        descricaoCurta: "Proteção e potência para seus treinos.",
        descricaoLonga: "Luvas profissionais de couro legítimo de vaca, com acolchoamento reforçado, ideais para treinos e competições. Conforto, segurança e durabilidade para qualquer nível.",
        imagem: "imagens/luvaboxe.png",
        preco: "R$ 449,90"
    },
    {
        id: 5,
        nome: "Luva de couro MMA",
        descricaoCurta: "Proteção e potência para seus treinos.",
        descricaoLonga: "Luvas profissionais de couro legítimo de vaca, com acolchoamento reforçado, ideais para treinos e competições. Conforto, segurança e durabilidade para qualquer nível.",
        imagem: "imagens/luvamma.png",
        preco: "R$ 449,90"
    },
    {
        id: 6,
        nome: "Pad de couro",
        descricaoCurta: "Proteção com estilo para seus treinos.",
        descricaoLonga: "Pads profissionais de couro legítimo de vaca, com acolchoamento e costura reforçada. Junte segurança e durabilidade aos seus treinos e alcance outro nível.",
        imagem: "imagens/padcouro.png",
        preco: "R$ 399,90"
    },
    {
        id: 7,
        nome: "Saco de pancadas",
        descricaoCurta: "Força e elegância em cada golpe.",
        descricaoLonga: "Saco de pancadas de couro legítimo de vaca de alta qualidade, acabamento artesanal, costuras duplas reforçadas e enchimento denso para máxima absorção de impacto. Ideal para quem busca performance com sofisticação.",
        imagem: "imagens/sacopancadas.png",
        preco: "R$ 1490,90"
    },
];

if (!localStorage.getItem("produtos")) {
    localStorage.setItem("produtos", JSON.stringify(listaProdutos));
}

const produtos = JSON.parse(localStorage.getItem("produtos"));
const container = document.getElementById("produtos-container");

produtos.forEach((produto, index) => {
    const card = document.createElement("div");
    card.classList.add("produto-card");

  card.innerHTML = `
    <img src="${produto.imagem}" alt="${produto.nome}" />
    <h3>${produto.nome}</h3>
    <p>${produto.descricaoCurta}</p>
    <p class="preco">${produto.preco}</p>
    <a href="produto.html?id=${produto.id}" class="btn-comprar">Ver detalhes</a>
`;

    container.appendChild(card);
});