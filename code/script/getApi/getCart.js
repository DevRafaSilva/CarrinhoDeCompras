import deleteProdutoCart from './deleteProdutoCart.js';

export default function getCart() {
  const dataProdutosCart = document.querySelector('[data-produtos-cart]');

  const dataTotal = document.querySelector('[data-total]');
  axios
    .get('http://localhost:4000/produtoCart')
    .then((response) => response)
    .then((produto) => {
      console.log(produto);
      produto.data.forEach((produtoItem) => {
        const criarCardProdutos = document.createElement('div');
        criarCardProdutos.classList.add('div-cart-item');
        criarCardProdutos.innerHTML = `
        
        <p class="nome-cart">${produtoItem.nome}</p>
        <div class="flex">
          <p>${produtoItem.quantidade}x</p>
          <p>@ R$ ${produtoItem.preco}</p>
          <p>R$${produtoItem.preco * produtoItem.quantidade}</p>
          <img data-remove class="remove" src="../../images/icon-remove-item.svg" />
        </div>
        `;
        dataProdutosCart.appendChild(criarCardProdutos);
        const iconeRemove = criarCardProdutos.querySelectorAll('[data-remove]');
        iconeRemove.forEach((itemClick) => {
          itemClick.addEventListener('click', () => {
            deleteProdutoCart(produtoItem);
            axios
              .put(`http://localhost:3000/produto/${produtoItem.id}`, {
                img: produtoItem.img,
                categoria: produtoItem.categoria,
                nome: produtoItem.nome,
                preco: produtoItem.preco,
                quantidade: 1,
              })
              .then((response) => response)
              .then((dados) => {
                console.log(dados);
              });
          });
        });
      });
      const dataTotalDiv = document.querySelector('[data-total-div]');
      const dataImagemIlustrativa = document.querySelector(
        '[data-imagem-ilustrativa]',
      );
      if (produto.data.length == 0) dataTotalDiv.style.display = 'none';
      else {
        dataImagemIlustrativa.style.display = 'none';
      }
      if (produto.data.length <= 1) {
        let total = produto.data[0];
        if (total !== undefined) {
          dataTotal.innerHTML = 'R$ ' + total.quantidade * total.preco;
        }
      } else {
        let total = produto.data.reduce((quantidade, preco) => {
          return (
            (quantidade.quantidade + preco.quantidade) * preco.preco +
            preco.quantidade
          );
        });
        dataTotal.innerHTML = 'R$ ' + total;
      }
    });
}
