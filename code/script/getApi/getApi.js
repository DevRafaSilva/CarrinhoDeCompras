import postCart from './postCart.js';

export default function getApi() {
  const dataProdutosDiv = document.querySelector('[data-produtos]');

  axios
    .get('http://localhost:3000/produto')
    .then((response) => response)
    .then((dados) => {
      dados.data.forEach((item) => {
        let criarBotaoAdd = document.createElement('button');

        criarBotaoAdd.classList.add('botao-add');
        criarBotaoAdd.innerHTML = `ADICIONAR`;
        const criarDiv = document.createElement('div');
        criarDiv.innerHTML = `
        <div class="card-imagem">
          <img src="${item.img}" alt="Produto" />
          ${
            item.quantidade <= 0
              ? `
            <div class="btn">
              <img src="../../images/icon-add-to-cart.svg" />
              ${criarBotaoAdd.innerHTML}
            </div>
            `
              : `
              <div class="btn-quantidade">
                <img data-diminuir src="../../images/icon-decrement-quantity.svg" />
                  ${item.quantidade}
                <img data-aumentar src="../../images/icon-increment-quantity.svg" />
              </div>
              `
          }

        `;
        const btnContainer = criarDiv.querySelector('.btn');
        const dataDiminuir = criarDiv.querySelectorAll('[data-diminuir]');
        const dataAumentar = criarDiv.querySelectorAll('[data-aumentar]');
        postCart(dataAumentar, dataDiminuir, item);
        if (btnContainer !== null) {
          btnContainer.addEventListener('click', () => {
            console.log('olá');
            axios
              .put(`http://localhost:3000/produto/${item.id}`, {
                img: item.img,
                categoria: item.categoria,
                nome: item.nome,
                preco: item.preco,
                quantidade: 1,
              })
              .then((response) => response)
              .then((dados) => {
                console.log(dados);
              });
            axios
              .post(`http://localhost:4000/produtoCart`, {
                id: item.id,
                img: item.img,
                categoria: item.categoria,
                nome: item.nome,
                preco: item.preco,
                quantidade: 1,
              })
              .then((response) => response)
              .then((dados) => {
                console.log(dados);
              });
          });
        }
        dataProdutosDiv.appendChild(criarDiv);
      });
    });
}
